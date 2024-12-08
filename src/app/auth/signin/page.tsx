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

export interface SignInInput {
  email: string;
  password: string;
  remember?: string;
}

export default function SignIn() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ email, password }: SignInInput) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      switch (error.message) {
        case "Invalid login credentials":
          toast.error("Invalid email or password.");
          break;
        case "Email not confirmed":
          toast.error("Please confirm your email address to continue.");
          break;
        default:
          toast.error("An error occurred, please try again later.");
          break;
      }
    } else {
      router.push("/marketplace");
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
            <Image src={Splash} alt="splash" />
          </div>
          <div className="flex items-center justify-center md:py-6 px-6 py-8">
            <div className="max-w-[400px] mx-auto w-full">
              <h1 className="text-[26px] font-[300] text-center text-slate-900">
                Welcome Back!
              </h1>
              <h3 className="text-center md:text-[1rem] text-[15px] font-[400] text-slate-500 mb-4">
                Please sign in to your account to continue.
              </h3>
              <Form
                name="basic"
                labelCol={{ span: 30 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item<SignInInput>
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
                <Form.Item<SignInInput>
                  label="Password"
                  name="password"
                  className="mb-1"
                  validateFirst={true}
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
                <div className="flex justify-between items-center mb-3">
                  <Form.Item<SignInInput>
                    name="remember"
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Checkbox className="text-[13px] font-[500] text-slate-700">
                      Remember Me
                    </Checkbox>
                  </Form.Item>
                  <span className="text-[13px] font-[500] text-slate-600 cursor-pointer hover:text-[#FF705C]">
                    Forgot Password?
                  </span>
                </div>
                <Form.Item className="mb-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="text-[18px] font-[600] w-full rounded-[9px] mb-0"
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
              <Divider>Or</Divider>
              <Button
                size="large"
                className="border-2 border-slate-200 bg-transparent w-full flex items-center justify-center space-x-1 hover:bg-slate-100"
                onClick={continueWithGoogle}
                disabled={isLoading}
                loading={isLoading}
              >
                <Image src={GoogleLogo} alt="google" height={15} />
                <p className="text-[14px] text-slate-500 font-[500]">
                  Continue with Google
                </p>
              </Button>
              <div className="flex items-center justify-center mt-6">
                <span className="md:text-[16px] text-[14px] font-[500] text-slate-500 me-2">
                  Don&apos;t have an account?
                </span>
                <Link
                  className="text-[#FF705C] md:text-[16px] text-[14px] font-[500]"
                  href="/auth/signup"
                >
                  Sign Up -&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
