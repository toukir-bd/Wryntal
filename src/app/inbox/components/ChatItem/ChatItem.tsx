import "../../../tailwind.scss";

import { Avatar, Image } from "antd";

interface ChatItemProps {
  userName: string;
  message: string;
  avatar: string;
  active: boolean;
  time: string;
  images: string[];
  isMine: boolean;
}

const ChatItem = ({
  userName,
  message,
  avatar,
  active,
  time,
  images,
  isMine,
}: ChatItemProps) => {
  return (
    <div className="flex flex-col gap-[10px] group">
      <div className="flex items-start gap-[10px]">
        <span className="relative">
          <Avatar size={38} src={avatar} />
        </span>
        <span
          className={`$' min-h-[32px] py-[10px] px-[14px] rounded-[9px] bg-[#f0f2ff] max-w-[60%] relative text-slate-800 leading-[20px] text-[13px] ' ${
            isMine && "bg-[#000]"
          }`}
        >
          {message}
        </span>
        <span className="group-hover:block text-slate-400 text-[11px] font-[600]">
          {time}
        </span>
      </div>
      {images.length > 0 && (
        <div className="flex items-center">
          <span className="w-[50px]"></span>
          {images.length > 0 && (
            <div className="w-[450px] max-w-full flex gap-[6px] flex-wrap rounded-[16px] overflow-hidden">
              {images.map((image, index) => (
                <span
                  className="basis-[30%] flex-grow overflow-hidden"
                  key={index}
                >
                  <Image
                    src={image}
                    alt="message-image"
                    className="w-full h-full object-cover object-center ob"
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
