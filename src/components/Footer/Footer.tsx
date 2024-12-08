

import '../../app/tailwind.scss'
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.png";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";

const Footer = () => {
  return (
    <footer className='w-full bg-white border-t border-slate-200'>
      <div className='max-w-[1280px] mx-auto md:px-[32px] px-[24px]'>
        <div className='w-full lg:py-[64px] py-6'>
          <div className='grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 lg:gap-0 gap-10 w-full divide-x'>
            <div className='pe-7 lg:col-span-1 sm:col-span-2 col-span-1'>
              <Image src={Logo} alt="logo" width={140} className='mb-3'/>
              <p className='text-[13px] text-slate-700 font-[500]'>
                Our mission is to provide a platform for people to rent and
                lend their items in a safe and secure way. We believe in the
                power of sharing and community
              </p>
            </div>
            <div className='ps-7 col-span-1'>
              <h3 className='text-[17px] text-slate-700 font-[600] mb-3'>Account</h3>
              <div className='flex flex-col gap-[8px] text-[13px] text-slate-500 font-[500]'>
                <Link href="/">My Profile</Link>
                <Link href="/">Settings</Link>
                <Link href="/">Inbox</Link>
                <Link href="/">My Rentals</Link>
                <Link href="/">Renter&apos;s Space</Link>
              </div>
            </div>
            <div className='ps-7 col-span-1'>
              <h3 className='text-[17px] text-slate-700 font-[600] mb-3'>Support</h3>
              <div className='flex flex-col gap-[8px] text-[13px] text-slate-500 font-[500]'>
                <Link href="/">Help Center</Link>
                <Link href="/">Contact Support</Link>
                <Link href="/">File Insurance Claim</Link>
              </div>
            </div>
            <div className='ps-7 col-span-1'>
              <h3 className='text-[17px] text-slate-700 font-[600] mb-3'>Quick Links</h3>
              <div className='flex flex-col gap-[8px] text-[13px] text-slate-500 font-[500]'>
                <Link href="/">New Listings</Link>
                <Link href="/">Marketplace</Link>
                <Link href="/">Ad Manager</Link>
                <Link href="/">Recent Blogs</Link>
              </div>
            </div>
            <div className='ps-7 col-span-1'>
              <h3 className='text-[17px] text-slate-700 font-[600] mb-3'>Top Categories</h3>
              <div className='flex flex-col gap-[8px] text-[13px] text-slate-500 font-[500]'>
                <Link href="/">Videography</Link>
                <Link href="/">Cars & Bikes</Link>
                <Link href="/">Clothings</Link>
                <Link href="/">Photography</Link>
                <Link href="/">Some Else</Link>
              </div>
            </div>
          </div>
          <div className='md:flex block md:space-y-0 space-y-2 justify-between text-[12px] items-center font-[600] text-slate-600 pt-5 border-t border-slate-200 mt-8'>
            <span>© {dayjs().format("YYYY")} Wryntal LLC / All Rights Reserved</span>
            <div className='flex sm:flex-row flex-col md:gap-[24px] gap-[20px]'>
              <div className='flex items-center gap-[16px] md:order-first order-last'>
                <Link href="/" className='text-[16px] w-[30px] h-[30px] bg-transparent flex items-center justify-center rounded-[50%] text-[#FE705B] border-2 border-[#0094FE]/[0.35]'>
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link href="/" className='text-[16px] w-[30px] h-[30px] bg-transparent flex items-center justify-center rounded-[50%] text-[#FE705B] border-2 border-[#0094FE]/[0.35]'>
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link href="/" className='text-[16px] w-[30px] h-[30px] bg-transparent flex items-center justify-center rounded-[50%] text-[#FE705B] border-2 border-[#0094FE]/[0.35]'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </div>
              <div className='flex gap-[12px] items-center sm:mt-0 mt-3 md:order-last order-first'>
                <Link href="/privacy-policy">Terms & Conditions</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;