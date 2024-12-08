"use client";
import Splash from "../../../assets/auth.jpg";
import Image from "next/image";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";
import GoogleLogo from "../../../assets/google.svg";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: string;
};

export default function SignUp() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({
    firstName,
    lastName,
    email,
    password,
    terms,
  }: SignUpInput) => {
    if (!terms) {
      return toast.error(
        "Please agree to the terms of service and privacy policy."
      );
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          email: email,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      toast.error("An error occurred, please try again later.");
    } else {
      router.push(`/verify-email?email=${email}`);
    }
  };

  const continueWithGoogle = async () => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/callback`,
      },
    });

    if (result.data.url) {
      router.push(result.data.url);
    } else {
      toast.error("An error occurred, please try again later.");
    }
  };

  return (
    <main className="w-full py-12 bg-[#F4F6F8]">
      <div className="max-w-[1080px] w-full mx-auto md:px-[32px] px-[15px]">
        <div className="bg-white border-4 border-white overflow-hidden grid md:grid-cols-2 grid-cols-1 rounded-[30px] shadow-[0_0_12px_0_rgba(0,0,0,0.1)]">
          <div className="w-full object-cover object-center max-h-[700px] md:block hidden">
            <Image src={Splash} alt="splash" className="h-full" />
          </div>
          <div className="flex items-center justify-center md:py-4 px-4 py-8">
            <div className="max-w-[400px] mx-auto w-full">
              <h1 className="text-[26px] font-[300] text-center text-slate-900">
                Let&apos;s Get Started!
              </h1>
              <h3 className="text-center md:text-[1rem] text-[15px] font-[400] text-slate-500 mb-4">
                Follow the steps below to create your account.
              </h3>
              <Form
                name="basic"
                labelCol={{ span: 30 }}
                initialValues={{ terms: false }}
                onFinish={onFinish}
                layout="vertical"
              >
                <div className="grid grid-cols-2 gap-2">
                  <Form.Item<SignUpInput>
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name.",
                      },
                      {
                        max: 40,
                        message: "First name must be less than 40 characters.",
                      },
                      {
                        min: 3,
                        message: "First name must be at least 3 characters.",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="John" maxLength={40} />
                  </Form.Item>
                  <Form.Item<SignUpInput>
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name.",
                      },
                      {
                        max: 40,
                        message: "Last name must be less than 40 characters.",
                      },
                      {
                        min: 3,
                        message: "Last name must be at least 3 characters.",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Doe" maxLength={40} />
                  </Form.Item>
                </div>
                <Form.Item<SignUpInput>
                  label="Email Address"
                  name="email"
                  className="mb-4"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a valid email address.",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address.",
                    },
                    {
                      max: 254,
                      message:
                        "Email address must be less than 254 characters.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="john.doe@example.com"
                    maxLength={254}
                  />
                </Form.Item>
                <Form.Item<SignUpInput>
                  label="Password"
                  name="password"
                  validateFirst={true}
                  className="mb-1"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password.",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters.",
                    },
                    {
                      max: 32,
                      message: "Password must be less than 32 characters.",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/,
                      message:
                        "Password must contain at least one uppercase, one lowercase, one number and one special character.",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="••••••••••••"
                    maxLength={32}
                  />
                </Form.Item>
                <Form.Item<SignUpInput>
                  name="terms"
                  valuePropName="checked"
                  className="mb-3 md:mt-0 mt-3"
                >
                  <Checkbox>
                    <span className="text-[13px] text-slate-600 font-[600] hover:text-slate-500">
                      I agree to the <Link href="/terms">Terms of Service</Link>{" "}
                      & <Link href="/privacy">Privacy Policy</Link>.
                    </span>
                  </Checkbox>
                </Form.Item>
                <Form.Item className="mb-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="text-[18px] font-[600] w-full rounded-[9px] mb-0"
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
              <Divider> Or </Divider>
              <Button
                size="large"
                className="border-2 border-slate-200 bg-transparent w-full flex items-center justify-center space-x-1 hover:bg-slate-100"
                onClick={continueWithGoogle}
                disabled={isLoading}
                loading={isLoading}
              >
                <Image
                  src={GoogleLogo}
                  alt="google"
                  height={15}
                  style={{ marginBottom: 1 }}
                />
                Continue with Google
              </Button>
              <div className="flex items-center justify-center mt-6">
                <span className="md:text-[16px] text-[14px] font-[500] text-slate-500 me-2">
                  Already have an account?
                </span>
                <Link
                  className="text-[#FF705C] md:text-[16px] text-[14px] font-[500]"
                  href="/auth/signin"
                >
                  Sign In -&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
