// src/features/message/components/MessageBubble.tsx
import { Avatar } from "antd";
import dayjs from "dayjs";
import { MessageProps } from "../types/messageType";
import AttachmentViewer from "../../../../common/components/AttachmentViewer";

export const MessageBubble = ({ message, isSelf }: MessageProps) => (
  <div
    className={`max-w-xs md:max-w-md rounded-lg p-3 relative ${
      isSelf ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none"
    }`}
    style={{ boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}
  >
    {/* Message bubble tail */}
    {!isSelf && (
      <div className="absolute -left-1 top-0 w-3 h-3 overflow-hidden">
        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white"></div>
      </div>
    )}
    {isSelf && (
      <div className="absolute -right-1 top-0 w-3 h-3 overflow-hidden">
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#DCF8C6]"></div>
      </div>
    )}
    
    {/* Message content */}
    <div className="flex items-center space-x-2 mb-1">
      {!isSelf && (
        <Avatar size="small" src={message?.author?.avatar} className="border" />
      )}
      <span
        className={`text-sm ${
          isSelf ? "text-[#262626]" : "text-[#075E54]"
        } font-semibold`}
      >
        {isSelf ? "You" : message?.author?.username}
      </span>
    </div>
    <p className={`text-sm ${isSelf ? "text-[#262626]" : "text-gray-800"}`}>
      {message?.content}
    </p>
    
    {/* Message footer */}
    <div
      className={`flex justify-end items-center mt-1 space-x-1 ${
        isSelf ? "text-[#262626]/70" : "text-gray-500"
      }`}
    >
      <span className="text-xs">
        {dayjs(message.created_at).format("h:mm A")}
      </span>
      {isSelf && <span className="text-xs">✓✓</span>}
    </div>
    
    {/* Attachments */}
    {message?.attachments&&message?.attachments?.length > 0 && (
  <div className="mt-2 space-y-2">
    {message.attachments.map((attachment) => (
      <AttachmentViewer 
        key={attachment.id} 
        attachment={attachment} 
      />
    ))}
  </div>
)}
  </div>
);