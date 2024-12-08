
import "../../app/tailwind.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "antd";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface SponsoredListingProps {
  title: string;
  subtitle: string;
  price: string;
  rating: string;
  category: string;
  city: string;
  images: string[];
}

const SponsoredListing = ({
  title,
  subtitle,
  price,
  rating,
  category,
  city,
  images,
}: SponsoredListingProps) => {
  return (
    <div className='text-white p-[26px] rounded-[21px] relative flex gap-[8px] bg-gradient-to-r from-slate-900 to-slate-800'>
      <span className='absolute text-[16px] text-[#FE705B] font-[600] bg-white rounded-[5px] -top-[15px] right-[50px] flex items-center justify-center h-[32px] shadow-xl px-[12px]'>
        <FontAwesomeIcon icon={faStar} className="me-1"/>
        {rating}
      </span>
      <span className='absolute -top-[25px] left-0 text-[14px] text-gray-500 font-[600]'>Sponsored</span>
      <div className='grid grid-cols-2 gap-6'>
        <div className="relative w-full">
          <span className='text-[34px] font-[200] text-white'>{title}</span>
          <p className='text-[18px] font-[500] text-slate-400'>{subtitle}</p>
          <div className='flex items-center justify-start gap-4'>
            <span className='text-[32px] font-[200] text-[#0095FF] mb-3'>
              ${price.split(".")[0]}
              <span className='text-[16px] font-[500] text-slate-400'>.{price.split(".")[1]}</span>
            </span>
            •<span className="text-[16px] font-[500] text-[#FE705C]">{category}</span>•
            <span className='text-[16px] font-[500] text-slate-200'>
              {city}
              <span className='text-[16px] font-[500] text-slate-500'>(15km)</span>
            </span>
          </div>
          <Button className="w-full" size="large" type="primary" style={{ boxShadow: "none", marginTop: "auto" }}>
            Rent Now
          </Button>
        </div>
        <div className='relative w-full flex flex-col gap-6'>
          <span className='block w-full h-[132px] overflow-hidden rounded-[10px] border border-slate-700'>
            <Image src={images[0]} alt="thumbnail" preview={false} />
          </span>
          <div className='flex items-center gap-3'>
            <span className='w-[96px] h-[52px] overflow-hidden rounded-[7px] border border-slate-700'>
              <Image src={images[1]} alt="preview1" preview={false} />
            </span>
            <span className='w-[96px] h-[52px] overflow-hidden rounded-[7px] border border-slate-700'>
              <Image src={images[2]} alt="preview2" preview={false} />
            </span>
            <span className='w-[96px] h-[52px] overflow-hidden rounded-[7px] border border-slate-700'>
              <Image src={images[3]} alt="preview3" preview={false} />
            </span>
            <span className='w-[96px] h-[52px] overflow-hidden rounded-[7px] border border-slate-700'>
              <Image src={images[4]} alt="preview4" preview={false} />
            </span>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default SponsoredListing;
