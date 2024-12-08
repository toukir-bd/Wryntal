"use client";
import {
  AutoComplete,
  Checkbox,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Slider,
  Switch,
} from "antd";
import styles from "./NewListing.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const tagsOptions: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  tagsOptions.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

export default function NewListing() {
  const [address, setAddress] = useState<any>();

  useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

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

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Create New Listing</h1>
          <p className={styles.subtitle}>
            Put your product in front of millions of people
          </p>
        </div>
        <Form
          name="new_listing"
          labelCol={{ span: 30 }}
          onFinish={(e) => console.log(e)}
          layout="vertical"
          className={styles.form}
        >
          <div className={styles.content}>
            <div className={styles.images}>
              <Image
                className={styles.images__item}
                src="https://picsum.photos/200"
                alt="Product Image"
                width={150}
                height={150}
              />
              <Image
                className={styles.images__item}
                src="https://picsum.photos/200"
                alt="Product Image"
                width={150}
                height={150}
              />
              <Image
                className={styles.images__item}
                src="https://picsum.photos/200"
                alt="Product Image"
                width={150}
                height={150}
              />
              <Image
                className={styles.images__item}
                src="https://picsum.photos/200"
                alt="Product Image"
                width={150}
                height={150}
              />
            </div>
            <div className={styles.content__group}>
              <h3>Product Information</h3>
              <div className={styles.groups}>
                <div className={styles.groups__item}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please input the title!" },
                    ]}
                  >
                    <Input
                      placeholder="Canon EOS 6D Mark II Body"
                      size="large"
                    />
                  </Form.Item>
                  <div className={styles.form__group}>
                    <Form.Item label="Category" name="category" required>
                      <Select
                        size="large"
                        placeholder="Select a category"
                        options={[
                          { label: "Electronics", value: "electronics" },
                          { label: "Clothing", value: "clothing" },
                          { label: "Furniture", value: "furniture" },
                        ]}
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Sub Category"
                      name="sub_category"
                      required
                    >
                      <Select
                        size="large"
                        placeholder="Select a sub category"
                        options={[
                          { label: "Electronics", value: "electronics" },
                          { label: "Clothing", value: "clothing" },
                          { label: "Furniture", value: "furniture" },
                        ]}
                        suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input the description!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Canon EOS 6D Mark II Body"
                      size="large"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                  <Form.Item label="Tags" name="tags" required>
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Add Tags"
                      options={tagsOptions}
                      suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Highlights"
                    name="hightlights"
                    required
                    style={{ marginBottom: 0 }}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Add Highlights"
                      options={tagsOptions}
                      suffixIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    />
                  </Form.Item>
                </div>
                <div className={styles.groups__item}>
                  <div className={styles.form__group}>
                    <Form.Item label="Item Value" name="item_value" required>
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="$3,300"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label="Rent / Day" name="rent_day" required>
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="$50"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity" required>
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="4"
                        size="large"
                      />
                    </Form.Item>
                  </div>
                  <Form.Item label="Location" name="location" required>
                    <AutoComplete
                      style={{ width: "100%" }}
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
                  </Form.Item>
                  <div className={styles.form__group}>
                    <Form.Item
                      label="Offer Delivery?"
                      name="delivery"
                      required
                      style={{ width: 175 }}
                    >
                      <span className={styles.switch}>
                        <span className={styles.switch__text}>No</span>
                        <Switch />
                        <span className={styles.switch__text}>Yes</span>
                      </span>
                    </Form.Item>
                    <Form.Item
                      label="Delivery Cost / 5KM"
                      name="delivery_cost"
                      required
                    >
                      <Slider value={25} />
                    </Form.Item>
                  </div>
                  <div className={styles.map}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyDH6mxHNVYmWx6IX00NaZJgU4fKHvF9D-0",
                      }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    ></GoogleMapReact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </main>
  );
}
