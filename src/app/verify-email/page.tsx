"use client";
import Image from "next/image";
import Splash from "@/assets/email_verification.svg";
import VerificationInput from "react-verification-input";
import { Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "react-toastify";

type VerifyEmailInput = {
  token: string;
};

export default function VerifyEmail() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleVerifyEmail = async ({ token }: VerifyEmailInput) => {
    if (email) {
      setIsLoading(true);

      const { error } = await supabase.auth.verifyOtp({
        email: email,
        type: "email",
        token,
      });

      setIsLoading(false);
      if (error) {
        toast.error("Invalid verification code.");
      } else {
        toast.success("Email address verified!");
        router.push("/verify-identity");
      }
    } else {
      toast.error("Email address not found.");
    }
  };

  return (
    <main className="py-16 w-full bg-slate-100">
      <div className="max-w-3xl mx-auto w-full relative px-3">
        <div className="bg-white rounded-[15px] p-10 shadow-md flex flex-col items-center">
          <div className="text-center">
            <Image src={Splash} alt="splash" width={150} />
          </div>
          <div className="max-w-full relative py-7 text-center">
            <h2 className="text-[20px] font-[600] text-slate-700 mb-2">
              Please verify your email
            </h2>
            <p className="text-[14px] font-[500] text-slate-500">
              We&apos;ve sent a verification code to your email address. Please
              check <br></br>your inbox and enter the code below.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <VerificationInput
              validChars="0123456789"
              length={6}
              classNames={{
                character:
                  "w-8 h-10 rounded-md border-2 border-slate-200 text-xl flex items-center justify-center",
                characterInactive: "bg-gray-100",
                characterSelected: "border-blue-500 shadow-outline",
              }}
              onComplete={(code: string) => {
                handleVerifyEmail({ token: code });
              }}
            />
            {isLoading && <Spin />}
          </div>
          <p className="text-[13px] font-[500] text-slate-600 text-center py-4">
            If you haven&apos;t received the code, please check your spam or
            junk folder. If you still having trouble, please contact us at{" "}
            <a href="mailto:support@wryntal.com" className="text-[#0094ff]">
              support@wryntal.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
