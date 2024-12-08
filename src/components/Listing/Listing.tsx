"use client";
import "../../app/tailwind.scss";
import { Avatar, Carousel, Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface ListingProps {
  title: string;
  images: string[];
  price: string;
  rating: string;
  category: string;
  location: string;
  distance: number;
  userName: string;
  userImage: string;
  badge?: string;
  sponsored?: boolean;
}

const Listing = ({
  title,
  images,
  price,
  rating,
  category,
  location,
  distance,
  userName,
  userImage,
  badge,
  sponsored,
}: ListingProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  return (
    <div className='basis-[31.5%] w-0 bg-white rounded-[8px] overflow-hidden p-[8px] flex flex-col gap-[16px] cursor-pointer relative listub' onClick={() => router.push("/listing/34")}>
      {badge && (
        <span className='badlist absolute z-[100] top-[25px] left-[-55px] w-[180px] h-[20px] bg-[#0094ff] flex items-center justify-center text-white font-[500] text-[10px] uppercase gap-[5px]'>
          <FontAwesomeIcon icon={faStar} />
          {badge}
        </span>
      )}
      {sponsored && <span className='absolute bottom-[12px] right-[8px] text-slate-400 text-[12px] splist'>Sponsored</span>}
      <span className={`$' w-[30px] h-[30px] flex items-center justify-center rounded-[50%] bg-white text-slate-400 shadow-2xl absolute top-[20px] right-[20px] cursor-pointer text-[13px] z-10' ${
          isFavorite ? 'text-[#ff715b]' : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
      >
        <FontAwesomeIcon icon={isFavorite ? faHeartFilled : faHeart} />
      </span>
      <Carousel>
        {images.map((image, i) => (
          <div className='h-[150px] w-full rounded-[4px] overflow-hidden' key={i}>
            <Image src={image} alt="splash" preview={false} />
          </div>
        ))}
      </Carousel>
      <span className='font-[500]'>
        {title.length > 60 ? title.slice(0, 60) + "..." : title}
      </span>
      <div className='flex items-center justify-between'>
        <span className='font-[600] text-[20px] flex items-center gap-[4px]'>
          ${price}
          <span className='font-[400] text-[14px] text-slate-400'>/ day</span>
        </span>
        <span className='flex items-center gap-[4px] text-[#ffc52e] text-[12px]'>
          <FontAwesomeIcon icon={faStar} />({rating})
        </span>
      </div>
      <div className='flex items-start flex-col gap-[16px]'>
        <span className='flex flex-col gap-[4px]'>
          <span className='text-[12px] font-[400] text-gray-700'>Category</span>
          <span className='text-[14px] font-[500]'>{category}</span>
        </span>
        <span className='flex flex-col gap-[4px]'>
          <span className='text-[12px] font-[400] text-gray-700'>Location</span>
          <span className='text-[14px] font-[500]'>
            {location}{" "}
            <span className='text-[12px] font-[400] text-gray-700'>
              ({distance}km)
            </span>
          </span>
        </span>
      </div>
      <div className='flex items-center gap-[8px] font-[500] text-[14px] mt-[8px]'>
        <Avatar src={userImage} />
        <span>{userName}</span>
      </div>
    </div>
  );
};

export default Listing;
