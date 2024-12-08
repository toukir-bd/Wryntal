
import '../../../tailwind.scss'
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { faUser } from "@fortawesome/free-regular-svg-icons";
dayjs.extend(relativeTime);

interface ConversationItemProps {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadMessages: number;
  avatar: string;
  active: boolean;
  lastSentByMe: boolean;
  lastSentMessageRead: boolean;
  selected: boolean;
  setSelectedConversation: (id: number) => void;
  isTyping: boolean;
}

const ConversationItem = ({
  id,
  name,
  lastMessage,
  lastMessageDate,
  unreadMessages,
  avatar,
  active,
  lastSentByMe,
  lastSentMessageRead,
  selected,
  setSelectedConversation,
  isTyping,
}: ConversationItemProps) => {
  return (
    <div className={`$' flex items-center gap-[6px] py-[6px] px-[12px] h-[60px] relative cursor-pointer bg-transparent hover:bg-[#d3dbe5] border-b border-slate-300 ' ${selected && ' bg-white hover:bg-white border-l-[4px] border-slate-500 border-b-slate-300 '}`}
      onClick={() => setSelectedConversation(id)}>
      <span className='border border-white rounded-full relative'>
        <Avatar size={38} src={avatar} icon={
          <FontAwesomeIcon color="black" size="xs" icon={faUser}/>
        }/>
        {active && <span className='block w-[12px] h-[12px] rounded-[50%] bg-[#06CF9C] absolute bottom-0 right-[-2px] border-2 border-white'></span>}
      </span>
      
      <div className='flex gap-[2px] flex-col flex-grow'>
        <div className='flex justify-between items-center mob-scr'>
          <div className='font-[600] text-[13px] text-slate-800 flex items-center justify-center mob-name'>
            {name.length > 15 ? `${name.slice(0, 15)}...` : name}
            {unreadMessages > 0 && (
              <span className=' text-[9px] text-white font-[400] flex items-center justify-center bg-[#FD6F5D] rounded-[4px] w-auto h-[14px] ms-1 px-[4px]'>
                {unreadMessages > 99 ? "++" : unreadMessages}
              </span>
            )}
          </div>
          <span className='text-[11px] text-slate-400 font-[500]'>
            {dayjs(lastMessageDate).fromNow()}
          </span>
        </div>

        {isTyping ? (
          <span className='text-[12px] text-slate-500 font-[500]'>Typing...</span>
        ) : (
          <>
            <div className='flex justify-between items-center'>
              <span className='text-[12px] text-slate-500 font-[500]'>
                {lastMessage.length > 24
                  ? `${lastMessage.slice(0, 24)}...`
                  : lastMessage}
              </span>
              {lastSentByMe && (
                <span className='text-[12px] text-slate-600'>
                  {lastSentMessageRead ? (
                    <FontAwesomeIcon
                      icon={faCheckDouble}
                      className='text-gray-500'
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;