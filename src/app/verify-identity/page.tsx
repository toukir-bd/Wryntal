"use client";
import { useEffect, useState } from "react";
import styles from "./VerifyIdentity.module.scss";
import {
  AutoComplete,
  Button,
  Form,
  Image,
  Input,
  Select,
  Spin,
  Steps,
} from "antd";
import useUser from "@/hooks/useUser";
import VerificationInput from "react-verification-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import API from "@/apis/api";
import {
  AddCardInput,
  AddIdDocsInput,
  AddPhoneInput,
  AddSelfieInput,
  VerifyPhoneInput,
} from "@/apis/auth";
import { toast } from "react-toastify";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
import { User } from "@/types/core";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getZipCode,
  getGeocode,
} from "use-places-autocomplete";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ImageUploading from "react-images-uploading";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

const PhoneVerification = () => {
  const [requested, setRequested] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const queryClient = useQueryClient();

  type PhoneInput = {
    phone: string;
  };

  const { mutate: handleAddPhone, isPending: handleAddPhoneLoading } =
    useMutation({
      mutationFn: async ({ phone }: PhoneInput) => {
        return await API.auth.addPhone({
          phone,
        });
      },
      onSuccess: () => {
        toast.success("We've sent you a verification code!");
        setRequested(true);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const { mutate: handleVerifyPhone, isPending: handleVerifyPhoneLoading } =
    useMutation({
      mutationFn: async ({ code }: VerifyPhoneInput) => {
        return await API.auth.verifyPhone({
          code,
        });
      },
      onSuccess: () => {
        toast.success("Phone number verified!");
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const onFinish = ({ phone }: PhoneInput) => {
    setPhoneNumber(phone);
    handleAddPhone({ phone });
  };

  return (
    <div className={styles.phone}>
      {!requested ? (
        <div className={styles.phone__main}>
          <div className={styles.phone__main_intro}>
            <h3>Phone Verification</h3>
            <p className={styles.description}>
              Please enter your phone number to receive a verification code.
            </p>
          </div>
          <Form
            name="phone"
            labelCol={{ span: 30 }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item<PhoneInput>
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter a valid phone number.",
                },
                {
                  max: 11,
                  message: "Phone number should be 11 digits, including (+1)",
                },
                {
                  min: 11,
                  message: "Phone number should be 11 digits, including (+1)",
                },
              ]}
            >
              <PhoneInput wrapperStyle={{ width: 300 }} />
            </Form.Item>
            <Button
              htmlType="submit"
              size="large"
              loading={handleAddPhoneLoading}
              disabled={handleAddPhoneLoading}
            >
              Send Verification Code
            </Button>
          </Form>
        </div>
      ) : (
        <div className={styles.phone__sent}>
          <span
            className={styles.phone__sent_back}
            onClick={() => setRequested(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Change Phone Number
          </span>
          <div className={styles.phone__sent_intro}>
            <h3>Verification Code Sent</h3>
            <p>Please enter the verification code sent to your phone number.</p>
          </div>
          <div className={styles.phone__codes}>
            <div className={styles.phone__code}>
              <VerificationInput
                validChars="0123456789"
                onComplete={(code: string) => {
                  handleVerifyPhone({ code });
                }}
                classNames={{
                  character: styles.phone__code_character,
                  characterInactive: styles.phone__code_character_inactive,
                  characterSelected: styles.phone__code_character_selected,
                }}
              />
            </div>
            {handleVerifyPhoneLoading && <Spin />}
          </div>
          <span className={styles.phone__sent_resend}>
            Didn&apos;t receive the code?{" "}
            <span
              className={styles.phone__sent_resend_link}
              onClick={() => {
                if (phoneNumber) {
                  handleAddPhone({ phone: phoneNumber });
                }
              }}
            >
              Resend
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

const AddressVerification = ({ user }: { user: User }) => {
  const [address, setAddress] = useState<any>();
  const [showForm, setShowForm] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const {
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ["us", "ca"] },
      types: ["address"],
    },
    debounce: 300,
  });

  type FieldType = {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };

  const { mutate: handleAddAddress, isLoading: handleAddAddressLoading } =
    useMutation(API.auth.addAddress as MutationFunction<AddPhoneInput>, {
      onSuccess: () => {
        toast.success("Address was added successfully!");
        queryClient.invalidateQueries("userProfile");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    if (address) {
      const parameter = {
        address: address,
      };

      getGeocode(parameter).then((results) => {
        const zipCode = getZipCode(results[0], false);
        const splitAddress = address.split(",");

        form.setFieldsValue({
          street: splitAddress[0],
          city: splitAddress[1]?.trim(),
          state: splitAddress[2]?.trim(),
          zip: zipCode?.toString()?.replace(/\s/g, ""),
          country: splitAddress[3]?.trim(),
        });

        setShowForm(true);
      });
    }
  }, [address, form]);

  const onFinish = (e: FieldType) => {
    handleAddAddress({
      street: e.street,
      city: e.city,
      province: e.state,
      postal: e.zip,
      country: e.country,
      token: user.token,
    });
  };

  return (
    <div className={styles.address}>
      <div className={styles.address__intro}>
        <h3>Enter Address</h3>
        <p className={styles.description}>
          Please enter an address to verify your identity. This address must be
          the{" "}
          <span className={styles.highlight}>same address (Postal Code)</span>{" "}
          found on your ID card and credit card.
        </p>
      </div>
      {isLoaded ? (
        <>
          <div className={styles.address__autocomplete}>
            <AutoComplete
              style={{ width: 450 }}
              allowClear
              size="large"
              options={
                (data as any[]).map((suggestion) => ({
                  value: suggestion.description,
                })) as any
              }
              onSelect={(value) => {
                setAddress(value);
                setValue(value);
              }}
              onSearch={(text) => setValue(text)}
              placeholder="Start typing your address..."
            />
            <span
              className={styles.address__autocomplete_manual}
              onClick={() => setShowForm(true)}
            >
              or Enter Manually
            </span>
          </div>
          {showForm && (
            <div className={styles.address__form}>
              <Form<FieldType>
                name="address"
                labelCol={{ span: 30 }}
                layout="vertical"
                form={form}
                onFinish={onFinish}
              >
                <div className={styles.address__form_group}>
                  <Form.Item
                    label="Street"
                    name="street"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter your street address.",
                      },
                      {
                        max: 50,
                        message:
                          "Street address should be less than 50 characters.",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="1234 Main St"
                      maxLength={50}
                    />
                  </Form.Item>
                  <Form.Item
                    label="City"
                    name="city"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter your city.",
                      },
                      {
                        max: 50,
                        message: "City should be less than 40 characters.",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Toronto" maxLength={50} />
                  </Form.Item>
                </div>
                <div className={styles.address__form_group}>
                  <Form.Item
                    label="State / Province"
                    name="state"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter your state or province.",
                      },
                      {
                        max: 40,
                        message: "State should be less than 40 characters.",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Ontario" maxLength={40} />
                  </Form.Item>
                  <Form.Item
                    label="Zip / Postal"
                    name="zip"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter your zip or postal code.",
                      },
                      {
                        max: 6,
                        message:
                          "Zip or postal code should be less than 6 characters.",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="M1EX3X" maxLength={6} />
                  </Form.Item>
                  <Form.Item
                    label="Country"
                    name="country"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter your country.",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      size="large"
                      defaultValue="Canada"
                      placeholder="Select Country"
                      options={[
                        { label: "Canada", value: "CA" },
                        { label: "United States", value: "US" },
                      ]}
                      suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    />
                  </Form.Item>
                </div>
                <Button
                  type="default"
                  size="large"
                  htmlType="submit"
                  disabled={handleAddAddressLoading}
                  loading={handleAddAddressLoading}
                >
                  Verify My Address
                </Button>
              </Form>
            </div>
          )}
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

const CardVerification = ({ user }: { user: User }) => {
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const { mutate: handleAddCard, isLoading: handleAddCardLoading } =
    useMutation(API.auth.addCard as MutationFunction<AddCardInput>, {
      onSuccess: () => {
        toast.success("Card was added successfully!");
        queryClient.invalidateQueries("userProfile");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const validateCard = async () => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card) {
      const { token, error } = await stripe.createToken(card);

      if (error) {
        return toast.error(error.message);
      }

      const { id } = token;

      if (id) {
        handleAddCard({ code: id.toString(), token: user.token });
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__intro}>
        <h3>Add New Credit Card</h3>
        <p className={styles.description}>
          We only accept <span className={styles.highlight}>Credit Cards</span>{" "}
          for verification. But you are free to use any payment method for
          transactions on our platform.
        </p>
      </div>
      <div className={styles.card__form}>
        <span className={styles.card__input}>
          <CardElement />
        </span>
        <Button
          type="default"
          size="large"
          onClick={validateCard}
          disabled={handleAddCardLoading}
          loading={handleAddCardLoading}
        >
          Verify Credit Card
        </Button>
      </div>
    </div>
  );
};

const IDCardVerification = ({ user }: { user: User }) => {
  const [frontImages, setFrontImages] = useState<any[]>([]);
  const [backImages, setBackImages] = useState<any[]>([]);

  const queryClient = useQueryClient();

  type FieldType = {
    type?: string;
    front?: string;
    back?: string;
  };

  const { mutate: handleAddIdDocs, isLoading: handleAddIdDocsLoading } =
    useMutation(API.auth.addIdDocs as MutationFunction<AddIdDocsInput>, {
      onSuccess: () => {
        toast.success("ID card was added successfully!");
        queryClient.invalidateQueries("userProfile");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const onFinish = (e: FieldType) => {
    const formData = new FormData();
    formData.append("front", frontImages[0]["file"]);
    formData.append("back", backImages[0]["file"]);
    formData.append("documentType", e.type as string);

    handleAddIdDocs({
      formData,
      token: user.token,
    });
  };

  return (
    <div className={styles.id}>
      <div className={styles.id__intro}>
        <h3>Upload A Copy Of Your ID</h3>
        <p className={styles.description}>
          Please upload a copy of your ID card to verify your identity. We
          accept <span className={styles.highlight}>Driver&apos;s License</span>{" "}
          or <span className={styles.highlight}>Passport</span>.
        </p>
      </div>
      <div className={styles.id__form}>
        <Form<FieldType>
          name="id_form"
          labelCol={{ span: 30 }}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ type: "driver_license" }}
        >
          <Form.Item
            label="ID Type"
            name="type"
            required
            rules={[
              {
                required: true,
                message: "Please select the type of ID card.",
              },
            ]}
          >
            <Select
              style={{ width: 300 }}
              size="large"
              defaultValue="driver_license"
              options={[
                { label: "Driver's License", value: "driver_license" },
                { label: "Passport", value: "passport" },
              ]}
              suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
            />
          </Form.Item>
          <div className={styles.id__form_group}>
            <Form.Item
              label="Front Of Your Card"
              name="front"
              required
              rules={[
                {
                  required: true,
                  message: "Please upload the front of your ID card.",
                },
              ]}
            >
              <ImageUploading
                multiple
                maxNumber={7777}
                dataURLKey="data_url"
                value={frontImages}
                onChange={(imageList) => {
                  setFrontImages(imageList);
                }}
              >
                {({ onImageUpdate }) => (
                  <div
                    className={styles.id__preview}
                    onClick={(e) => onImageUpdate(0)}
                  >
                    {frontImages.length > 0 ? (
                      <Image
                        src={frontImages[0]["data_url"]}
                        width={"100%"}
                        alt="front"
                        preview={false}
                      />
                    ) : (
                      <span>Click To Upload</span>
                    )}
                  </div>
                )}
              </ImageUploading>
            </Form.Item>
            <Form.Item
              label="Back Of Your Card"
              name="back"
              required
              rules={[
                {
                  required: true,
                  message: "Please upload the back of your ID card.",
                },
              ]}
            >
              <ImageUploading
                multiple
                maxNumber={7777}
                dataURLKey="data_url"
                value={backImages}
                onChange={(imageList) => {
                  setBackImages(imageList);
                }}
              >
                {({ onImageUpdate }) => (
                  <div
                    className={styles.id__preview}
                    onClick={(e) => onImageUpdate(0)}
                  >
                    {backImages.length > 0 ? (
                      <Image
                        src={backImages[0]["data_url"]}
                        width={"100%"}
                        alt="front"
                        preview={false}
                      />
                    ) : (
                      <span>Click To Upload</span>
                    )}
                  </div>
                )}
              </ImageUploading>
            </Form.Item>
          </div>
          <Button
            type="default"
            size="large"
            htmlType="submit"
            disabled={handleAddIdDocsLoading}
            loading={handleAddIdDocsLoading}
          >
            Upload ID Card
          </Button>
        </Form>
      </div>
    </div>
  );
};

const PhotoVerification = ({ user }: { user: User }) => {
  const [profilePicture, setProfilePicture] = useState<any[]>([]);

  const queryClient = useQueryClient();

  type FieldType = {
    selfie?: string;
  };

  const { mutate: handleAddSelfie, isLoading: handleAddSelfieLoading } =
    useMutation(API.auth.addSelfie as MutationFunction<AddSelfieInput>, {
      onSuccess: () => {
        toast.success("Profile picture was added successfully!");
        queryClient.invalidateQueries("userProfile");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const onFinish = (e: FieldType) => {
    const formData = new FormData();
    formData.append("selfie", profilePicture[0]["file"]);

    handleAddSelfie({
      formData,
      token: user.token,
    });
  };

  return (
    <div className={styles.photo}>
      <div className={styles.photo__intro}>
        <h3>Upload Your Profile Picture</h3>
        <p className={styles.description}>
          A clear photo of your face is required for verification. Please make
          sure your{" "}
          <span className={styles.highlight}>face is clearly visible</span>.
        </p>
      </div>
      <Form<FieldType>
        name="selfie"
        labelCol={{ span: 30 }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Profile Picture"
          name="selfie"
          required
          rules={[
            {
              required: true,
              message: "Please upload a clear photo of your face.",
            },
          ]}
        >
          <ImageUploading
            multiple
            maxNumber={7777}
            dataURLKey="data_url"
            value={profilePicture}
            onChange={(imageList) => {
              setProfilePicture(imageList);
            }}
          >
            {({ onImageUpdate }) => (
              <div className={styles.photo__container}>
                <div
                  className={styles.photo__preview}
                  onClick={(e) => onImageUpdate(0)}
                >
                  {profilePicture.length > 0 ? (
                    <Image
                      src={profilePicture[0]["data_url"]}
                      width={"100%"}
                      height={"100%"}
                      alt="front"
                      preview={false}
                    />
                  ) : (
                    <span>Click To Upload</span>
                  )}
                </div>
                <div className={styles.photo__container_user}>
                  <h2 className={styles.photo__container_user_name}>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className={styles.photo__container_user_verified}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                  </h2>
                  <p>{user.email}</p>
                </div>
              </div>
            )}
          </ImageUploading>
        </Form.Item>
        <Button
          type="default"
          size="large"
          htmlType="submit"
          disabled={handleAddSelfieLoading}
          loading={handleAddSelfieLoading}
        >
          Upload Profile Picture
        </Button>
      </Form>
    </div>
  );
};

const VerificationStatus = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <div className={styles.status}>
      {(user.verification === "SUBMITTED" ||
        user.verification === "PENDING") && (
        <div className={styles.status__core}>
          <h3>Verification Pending</h3>
          <p className={styles.description}>
            We are currently reviewing your documents. You will receive an email
            once your documents have been verified.
          </p>
        </div>
      )}
      {user.verification === "VERIFIED" && (
        <div className={styles.status__core}>
          <h3>You Are Already Verified!</h3>
          <p className={styles.description}>
            Looks like your account is already verified. You can now start using
            our service to the fullest.
          </p>
        </div>
      )}
      {user.verification === "REJECTED" && (
        <div className={styles.status__core}>
          <h3>We Couldn&apos;t Verify Your Account</h3>
          <p className={styles.description}>
            We couldn&apos;t verify your account with the documents you
            provided. Please check your email for more information.
          </p>
        </div>
      )}
      <Button onClick={() => router.push("/marketplace")} size="large">
        View Marketplace
      </Button>
    </div>
  );
};

export default function VerifyIdentity() {
  const [currentStep, setCurrentStep] = useState(0);

  const { user, isLoading: userLoading } = useUser();

  const steps = [
    {
      title: "Phone Verification",
      component: <PhoneVerification user={user} />,
    },
    {
      title: "Address Verification",
      component: <AddressVerification user={user} />,
    },
    {
      title: "Card Verification",
      component: <CardVerification user={user} />,
    },
    {
      title: "ID Verification",
      component: <IDCardVerification user={user} />,
    },
    {
      title: "Photo Verification",
      component: <PhotoVerification user={user} />,
    },
    {
      title: "Verification Status",
      component: <VerificationStatus user={user} />,
    },
  ];

  useEffect(() => {
    let step = 0;

    if (user && user.isPhoneVerified) {
      step = 1;
    }

    if (user && user.address) {
      step = 2;
    }

    if (user && user.creditCard) {
      step = 3;
    }

    if (user && user.idDoc) {
      step = 4;
    }

    if (user && user.selfie) {
      step = 5;
    }

    setCurrentStep(step);
  }, [user, currentStep]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.core}>
          <div className={styles.intro}>
            <h1>Verify Your Identity</h1>
            <p>Please follow these steps to verify your identity</p>
          </div>
          {userLoading ? (
            <div>
              <Spin />
            </div>
          ) : (
            <>
              <Steps
                style={{ width: "800px" }}
                current={currentStep}
                items={[
                  {
                    title: "Phone",
                  },
                  {
                    title: "Address",
                  },
                  {
                    title: "Card",
                  },
                  {
                    title: "ID Card",
                  },
                  {
                    title: "Photo",
                  },
                ]}
              />
              <div className={styles.content}>
                {steps[currentStep].component}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
