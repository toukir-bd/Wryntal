"use client";
import useUser from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";

const VerifyEmailCheck = ({ children }: { children: React.ReactNode }) => {
  // const { user, isLoading } = useUser();
  // const router = useRouter();
  // const pathName = usePathname();

  // if (!isLoading && user && !user.isEmailVerified) {
  //   if (pathName !== "/verify-email") {
  //     router.push("/verify-email");
  //   } else {
  //     return children;
  //   }
  // } else {
  //   return children;
  // }

  return children;
};

export default VerifyEmailCheck;
