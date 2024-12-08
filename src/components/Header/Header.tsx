"use client";
import "../../app/tailwind.scss";
import useUser from "@/hooks/useUser";
import Logo from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Drawer, Dropdown, MenuProps, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import {
  faBars,
  faFileInvoice,
  faGears,
  faHouse,
  faRightFromBracket,
  faSitemap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const UserActions = ({
  name,
  email,
  selfie,
  signOut,
}: {
  name: string;
  email: string;
  selfie: string | null;
  signOut: () => void;
}) => {
  const userItems: MenuProps["items"] = [
    {
      key: "user",
      label: (
        <div className="flex flex-col items-center gap-[5px]">
          <Avatar size={64} icon={<UserOutlined />} />
          <span className="text-[16px] font-[600] text-slate-700">{name}</span>
          <span className="text-[14px] text-slate-500 font-[500]">{email}</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: (
        <span className="text-[13px] text-slate-600 font-[500]">Profile</span>
      ),
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      key: "settings",
      label: (
        <span className="text-[13px] text-slate-600 font-[500]">Settings</span>
      ),
      icon: <FontAwesomeIcon icon={faGears} />,
    },
    {
      key: "transactions",
      label: (
        <span className="text-[13px] text-slate-600 font-[500]">
          Transactions
        </span>
      ),
      icon: <FontAwesomeIcon icon={faFileInvoice} />,
    },
    {
      type: "divider",
    },
    {
      key: "signOut",
      label: (
        <span className="text-[13px] text-slate-600 font-[500] flex items-center">
          Sign Out
        </span>
      ),
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: () => {
        signOut();
      },
    },
  ];
  return (
    <div className="flex items-center gap-[24px]">
      <div className="flex items-center gap-[24px]">
        <span className="block relative hover:cursor-pointer hover:text-[#ff715b] hover:scale-[1.1]">
          <span className="w-[10px] h-[10px] text-white rounded-[50%] absolute top-[-3px] right-[-3px] bg-[#ff715b]"></span>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: 17 }} />
        </span>
        <Link href="/inbox">
          <span className="block relative hover:cursor-pointer hover:text-[#ff715b] hover:scale-[1.1]">
            <span className="w-[10px] h-[10px] text-white rounded-[50%] absolute top-[-3px] right-[-3px] bg-[#ff715b]"></span>
            <FontAwesomeIcon icon={faMessage} />
          </span>
        </Link>
      </div>
      <Dropdown
        menu={{ items: userItems }}
        placement="bottomRight"
        arrow
        overlayStyle={{ minWidth: 250 }}
        trigger={["click"]}
      >
        <Avatar className="cursor-pointer" size="default" src={selfie}>
          {name[0].toUpperCase()}
        </Avatar>
      </Dropdown>
    </div>
  );
};

const UserActionsSkeleton = () => {
  return (
    <div className="flex items-center gap-[24px]">
      <div className="flex items-center gap-[24px]">
        <span className="block relative hover:cursor-pointer hover:text-[#ff715b] hover:scale-[1.1]">
          <FontAwesomeIcon icon={faBell} style={{ fontSize: 17 }} />
        </span>
        <Link href="/inbox">
          <span className="block relative hover:cursor-pointer hover:text-[#ff715b] hover:scale-[1.1]">
            <FontAwesomeIcon icon={faMessage} />
          </span>
        </Link>
      </div>
      <Skeleton.Avatar size="default" active />
    </div>
  );
};

const MobileDrawer = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}) => {
  return (
    <Drawer
      title="Wryntal Inc."
      onClose={onClose}
      open={isOpen}
      width={300}
      className="max-w-[300px] w-full"
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          <span className="flex items-center gap-[8px] font-[500] text-[12px] text-[#282d46]/[0.7]">
            <FontAwesomeIcon icon={faHouse} />
            <span className="">Core</span>
          </span>
          <div className="flex flex-col gap-[16px]">
            <Link className="text-[#282d46]" href="/marketplace">
              Marketplace
            </Link>
            <Link className="text-[#282d46]" href="/new-listing">
              New Listing
            </Link>
            <Link className="text-[#282d46]" href="/blogs">
              Blogs
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <span className="flex items-center gap-[8px] font-[500] text-[12px] text-[#282d46]/[0.7]">
            <FontAwesomeIcon icon={faUser} />
            <span className="">Account</span>
          </span>
          <div className="flex flex-col gap-[16px]">
            {user ? (
              <>
                <Link className="text-[#282d46]" href="/">
                  My Profile
                </Link>
                <Link className="text-[#282d46]" href="/">
                  Settings
                </Link>
                <Link className="text-[#282d46]" href="/">
                  My Rentals
                </Link>
                <Link className="text-[#282d46]" href="/">
                  Renter&apos;s Space
                </Link>
              </>
            ) : (
              <>
                <Link className="text-[#282d46]" href="/auth/signin">
                  Sign In
                </Link>
                <Link className="text-[#282d46]" href="/auth/signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <span className="flex items-center gap-[8px] font-[500] text-[12px] text-[#282d46]/[0.7]">
            <FontAwesomeIcon icon={faSitemap} />
            <span className="">Other</span>
          </span>
          <div className="flex flex-col gap-[16px]">
            <Link className="text-[#282d46]" href="/">
              Help Center
            </Link>
            <Link className="text-[#282d46]" href="/">
              Ad Manager
            </Link>
            <Link className="text-[#282d46]" href="/blogs">
              File Insurance Claim
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

const Header = () => {
  const supabase = createClient();
  const { user, isLoading: userLoading } = useUser();
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="sticky z-[999] top-0 h-[70px] w-full bg-white flex items-center justify-center shadow">
        <div className="flex items-center justify-between sm:px-[32px] px-[15px] w-[1280px]">
          <div className="flex items-center gap-[48px]">
            <Link href="/">
              <Image src={Logo} alt="logo" width={130} />
            </Link>
          </div>
          <div className="flex items-center gap-[48px] ms-1">
            <nav className="md:flex items-center gap-[36px] hidden">
              <Link
                className="text-[#000] hover:text-[#FE705C] text-sm font-[500]"
                href="/marketplace"
              >
                Marketplace
              </Link>
              <Link
                className="text-[#000] hover:text-[#FE705C] text-sm font-[500]"
                href="/new-listing"
              >
                New Listing
              </Link>
              <Link
                className="text-[#000] hover:text-[#FE705C] text-sm font-[500]"
                href="/blogs"
              >
                Blogs
              </Link>
            </nav>
            {!userLoading && user && (
              <UserActions
                name={`${user?.firstName} ${user?.lastName}`}
                email={user?.email as string}
                selfie={user?.selfie as string}
                signOut={async () => {
                  await supabase.auth.signOut();
                }}
              />
            )}
            {!user && !userLoading && (
              <div className="flex items-center justify-center gap-[8px]">
                <Button
                  className="md:flex items-center hidden border-2 border-[#d3edff] text-sm font-[500] text-[#0195FE] rounded-full hover:text-[#f56653]"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </Button>
                <Button
                  className="text-sm bg-[#FD6F5D] border-0 text-white font-[500] rounded-full hover:bg-[#FD6F5D]/[0.75] signup-btn"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
            {userLoading && <UserActionsSkeleton />}
            <span
              className="ms-[-24px] text-[18px] block md:hidden cursor-pointer"
              onClick={() => setShowMobileDrawer(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </span>
          </div>
        </div>
      </header>
      <MobileDrawer
        isOpen={showMobileDrawer}
        onClose={() => setShowMobileDrawer(false)}
        user={user}
      />
    </>
  );
};

export default Header;
