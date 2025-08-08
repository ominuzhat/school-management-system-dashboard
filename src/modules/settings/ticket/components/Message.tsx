import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetSingleTicketQuery } from "../api/ticketEndPoints";
import { useGetProfileQuery } from "../../../Profile/api/profileEndpoint";
import whatsappBg from "../../../../../public/whatsapp.png";
import { useWebSocket } from "../hooks/useWebSocket";
import { MessageHeader } from "./MessageHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

const  Message = () => {
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("ticket");
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: profile } = useGetProfileQuery();
  const { data: ticketDetails }:any = useGetSingleTicketQuery(ticketId as any, {
    skip: !ticketId,
  });
  const { messages, setMessages, sendMessage, sendFile } = useWebSocket(
    ticketId,
    profile?.data?.id
  );

  useEffect(() => {
    if (ticketDetails) {
      setMessages(ticketDetails.data.comments || []);
    }
  }, [ticketDetails, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (sendMessage(inputMessage)) {
      setInputMessage("");
    }
  };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };

  const onEmojiClick = (emojiData: any) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  if (!profile) {
    return <div className="flex items-center justify-center h-full">Loading profile...</div>;
  }
  const handleFileUpload = async (file: File) => {
    await sendFile(file);
  };

   return (
    <div className="flex flex-col h-screen bg-[#e5ddd5] w-full  fixed top-0 left-0">
      <MessageHeader
        title={ticketDetails?.title || "Chat"}
        username={ticketDetails?.created_by?.username || ""}
        avatar={ticketDetails?.created_by?.avatar}
      />

      <div
        className="flex-1 overflow-y-auto pt-16 pb-24 px-4"
        style={{
          backgroundImage: `url(${whatsappBg})`,
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <MessageList messages={messages} currentUserId={profile?.data?.id} />
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 md:left-32 w-full right-0 bg-[#f0f2f5] p-3 z-50">
        <MessageInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          onEmojiClick={onEmojiClick}
          handleFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default Message;