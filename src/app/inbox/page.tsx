"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConversationItem from "./components/ConversationItem/ConversationItem";
import {
  faArchive,
  faFlag,
  faGears,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Avatar, Divider, Input } from "antd";
import {
  faHandLizard,
  faImage,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
import ChatItem from "./components/ChatItem/ChatItem";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import API from "@/apis/api";
import { useSocket } from "@/utils/SocketProvider";
import { toast } from "react-toastify";

export default function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const { user } = useUser();
  const { socket, membersList } = useSocket();
  const [isTypingChats, setIsTypingChats] = useState([]);
  const [message, setMessage] = useState("");

  const { data: chats, isLoading: chatsLoading } = useQuery({
    queryKey: ["chats", user?.token],
    queryFn: () => {
      if (user?.token) {
        return API.chat.getMyChats({
          page: 1,
          limit: 10,
          token: user.token,
        });
      } else {
        return [];
      }
    },
  });

  const handleTyping = (
    receiverId: string,
    chatId: string,
    isTyping: string
  ) => {
    socket?.emit("typing", {
      senderId: user?.id,
      chatId,
      receiverId,
      isTyping,
    });
  };

  useEffect(() => {
    socket?.on("typing", ({ senderId, chatId, isTyping }) => {
      if (senderId !== user?.id) {
        if (isTyping) {
          setIsTypingChats((prev) => [...prev, chatId]);
        } else {
          setIsTypingChats((prev) => prev.filter((c) => c !== chatId));
        }
      }
    });

    socket?.on("message", (data) => {
      toast.success(data);
    });

    return () => {
      socket?.off("typing");
    };
  }, [socket, user?.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentChat = chats?.data?.chats.find(
        (chat) => chat.id === selectedConversation
      );

      const sendTo = currentChat?.users.find((u) => u.id !== user?.id);

      if (sendTo) {
        handleTyping(sendTo?.id, currentChat?.id, false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [message, selectedConversation, chats?.data?.chats, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="w-full py-12 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto w-full relative px-8">
        <div className="w-full h-[650px] bg-white rounded-[12px] overflow-hidden flex border border-slate-300">
          <div className="flex flex-col lg:w-[32%] w-[35%] bg-slate-200">
            <div className="flex items-center justify-between px-[20px] border-b-2 border-slate-300 min-h-[56px] h-[56px]">
              <h3 className="text-[20px] font-[600] text-slate-700">Inbox</h3>
              <span className="flex items-center gap-2">
                <span className="h-[30px] w-[30px] flex items-center justify-center border-2 border-slate-300 rounded-full cursor-pointer bg-white group">
                  <FontAwesomeIcon
                    icon={faGears}
                    className="text-slate-800 text-[14px] group-hover:text-[#FD725D]"
                  />
                </span>
                <span className="h-[30px] w-[30px] flex items-center justify-center border-2 border-slate-300 rounded-full cursor-pointer bg-white group">
                  <FontAwesomeIcon
                    icon={faArchive}
                    className="text-slate-800 text-[14px] group-hover:text-[#FD725D]"
                  />
                </span>
              </span>
            </div>
            <div className="flex flex-col">
              <ConversationItem
                key={"34"}
                id={23}
                name={"Sifat Dipta"}
                lastMessage={"Hey how are you?"}
                lastMessageDate={new Date()}
                unreadMessages={34}
                avatar={"https://i.pravatar.cc/150?img=1"}
                active={true}
                lastSentByMe={false}
                lastSentMessageRead={true}
                selected={selectedConversation === 23}
                setSelectedConversation={setSelectedConversation}
                isTyping={false}
              />
              <ConversationItem
                key={"34"}
                id={34}
                name={"Toukir Rahman"}
                lastMessage={"Hey how are you?"}
                lastMessageDate={new Date()}
                unreadMessages={34}
                avatar={"https://i.pravatar.cc/150?img=2"}
                active={true}
                lastSentByMe={false}
                lastSentMessageRead={true}
                selected={selectedConversation === 34}
                setSelectedConversation={setSelectedConversation}
                isTyping={false}
              />
              {!chatsLoading &&
                chats?.data?.chats.map((c) => {
                  const sentTo = c.users.find((u) => u.id !== user?.id);

                  const isLastSentByMe = c.lastMessage?.sender?.id === user?.id;

                  const lastMessageReadByUser =
                    c.lastMessage?.readReceipts.find(
                      (r) => r.userId === sentTo?.id
                    );

                  return (
                    <ConversationItem
                      key={c.id}
                      id={c.id}
                      name={sentTo?.firstName + " " + sentTo?.lastName}
                      lastMessage={c.lastMessage?.text}
                      lastMessageDate={c.lastMessage?.createdAt}
                      unreadMessages={c.unreadCount}
                      avatar={sentTo?.selfie}
                      active={
                        (membersList &&
                          membersList.includes(sentTo?.id.toString())) ||
                        false
                      }
                      lastSentByMe={isLastSentByMe}
                      lastSentMessageRead={lastMessageReadByUser}
                      selected={c.id === selectedConversation}
                      setSelectedConversation={setSelectedConversation}
                      isTyping={isTypingChats.includes(c.id)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col lg:w-[68%] w-[65%]">
            <div className="flex items-center justify-between w-full min-h-[56px] h-[56px] px-[15px] border-b-2 border-slate-200">
              <div className="flex items-center justify-between space-x-[7px]">
                <Avatar size={38} src={"https://i.pravatar.cc/150?img=1"} />
                <div className="flex flex-col justify-center">
                  <div className="text-[13px] text-slate-700 font-[600]">
                    Sifat Dipta
                  </div>
                  {1 === 1 ? (
                    <span className="text-[#06CF9C] text-[11px] font-[600]">
                      Online
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px] font-[500]">
                      Last seen 34 min ago
                    </span>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-[5px] py-[4px] px-[12px] rounded-full text-[12px] font-[600] bg-red-100 hover:bg-slate-200 text-red-500 cursor-pointer">
                <FontAwesomeIcon icon={faFlag}/>
                Report
              </span>
            </div>
            <div className="flex flex-col flex-grow gap-[10px] py-[15px] px-[20px] overflow-auto">
              <div className="flex flex-col gap-[20px]">
                <Divider>
                  <span className="text-slate-400 text-[13px] font-[500]">
                    Yesterday
                  </span>
                </Divider>
                <ChatItem
                  userName="John Doe"
                  message="Hello"
                  avatar="https://i.pravatar.cc/150?img=1"
                  active={true}
                  time="10:00 am"
                  images={[]}
                  isMine={false}
                />
                <ChatItem
                  userName="John Doe"
                  message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                  avatar="https://i.pravatar.cc/150?img=1"
                  active={true}
                  time="10:00 am"
                  images={[
                    faker.image.url(),
                    faker.image.url(),
                    faker.image.url(),
                    faker.image.url(),
                    faker.image.url(),
                  ]}
                  isMine={false}
                />
                <ChatItem
                  userName="John Doe"
                  message="Lorem ipsum dolor sit amet"
                  avatar="https://i.pravatar.cc/150?img=2"
                  active={false}
                  time="10:00 am"
                  images={[faker.image.url()]}
                  isMine={true}
                />
              </div>
              <div className="flex flex-col gap-[20px]">
                <Divider>
                  <span className="text-slate-400 text-[13px] font-[500]">
                    Today
                  </span>
                </Divider>
                <ChatItem
                  userName="John Doe"
                  message="Hello John"
                  avatar="https://i.pravatar.cc/150?img=1"
                  active={true}
                  time="10:00 am"
                  images={[]}
                  isMine={false}
                />
                <ChatItem
                  userName="John Doe"
                  message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                  avatar="https://i.pravatar.cc/150?img=1"
                  active={true}
                  time="10:00 am"
                  images={[]}
                  isMine={false}
                />
                <ChatItem
                  userName="John Doe"
                  message="Lorem ipsum dolor sit amet"
                  avatar="https://i.pravatar.cc/150?img=2"
                  active={true}
                  time="10:00 am"
                  images={[]}
                  isMine={true}
                />
              </div>
            </div>
            <div className="flex items-center gap-[24px] p-[16px] relative z-10 bg-slate-300">
              <div className="flex items-center gap-[16px]">
                <span className="text-[20px] text-slate-800 cursor-pointer hover:text-[#FE705C] hover:scale-105">
                  <FontAwesomeIcon icon={faPaperclip} className="text-[16px]" />
                </span>
                <span className="text-[20px] text-slate-800 cursor-pointer hover:text-[#FE705C] hover:scale-105">
                  <FontAwesomeIcon icon={faImage} className="text-[16px]" />
                </span>
                <span className="text-[20px] text-slate-800 cursor-pointer hover:text-[#FE705C] hover:scale-105">
                  <FontAwesomeIcon icon={faSmile} className="text-[16px]" />
                </span>
              </div>
              <span className="flex-grow flex relative">
                <Input
                  className="rounded-[50px] bg-white border-none focus-within:border-2 focus-within:border-[#0095FF]"
                  placeholder="Type your message ..."
                  size="large"
                  onChange={(e) => {
                    const currentChat = chats?.data?.chats.find(
                      (chat) => chat.id === selectedConversation
                    );

                    const sendTo = currentChat?.users.find(
                      (u) => u.id !== user?.id
                    );

                    handleTyping(sendTo.id, currentChat.id, true);
                    setMessage(e.target.value);
                  }}
                />
                <span className="absolute right-[18px] top-[10px] text-slate-800 cursor-pointer hover:text-[#FE705C] hover:scale-105">
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="bg-white w-[16px] h-[24px] flex items-center justify-center text-[16px]"
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
