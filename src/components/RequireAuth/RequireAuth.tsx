
import "../../app/tailwind.scss";
import Image from "next/image";
import Splash from "../../assets/require_auth.svg";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RequireAuth = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-[8px] items-center justify-center h-[600px]'>
      <Image src={Splash} alt="splash" width={300} />
      <div className='w-[600px] text-center flex flex-col gap-[16px]'>
        <h2>You need to be signed in to view this page</h2>
        <p>
          This page is only accessible to signed in users. Please sign in to
          continue. If you don&apos;t have an account, you can{" "}
          <span className='text-[#ff715b] font-[500]'>
            <Link href="/signup">Sign Up</Link>
          </span>{" "}
          today!
        </p>
      </div>

      <Button size="large" onClick={() => router.push("/signin")}>
        Sign In To Continue
      </Button>
    </div>
  );
};

export default RequireAuth;
