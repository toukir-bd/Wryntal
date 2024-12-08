"use client";

import "../../app/tailwind.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const VerifyAccountFloat = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const pathName = usePathname();

  if (
    !isLoading &&
    user &&
    user?.isEmailVerified &&
    user.verification === "PENDING" &&
    pathName !== "/verify-identity"
  )
    return (
      <div className='fixed top-[150px] left-0 bg-[#0095FF] p-[16px] rounded-[16px] text-white cursor-pointer flex flex-col gap-[4px] w-[220px] z-[1000] border-1 border-white shadow-xl' onClick={() => router.push("/verify-identity")}>
        <h3 className='flex items-center gap-[8px] font-[600]'>
          <span>Verify Indentity</span>
          <FontAwesomeIcon icon={faCheckCircle} />
        </h3>
        <p className='text-[14px]'>To Access All Features →</p>
      </div>
    );

  return null;
};

export default VerifyAccountFloat;