// src/features/message/components/MessageList.tsx
import { Empty } from "antd";
import { MessageBubble } from "./MessageBubble";
import { Message } from "../types/messageType";

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Empty
          description={
            <span className="text-gray-600">
              No messages yet. Start the conversation! 👋
            </span>
          }
          imageStyle={{ height: 100 }}
        />
      </div>
    );
  }

  return (
    <div
      className="space-y-2 w-full px-2 
               sm:px-4 
               md:pl-64 md:pr-8 
               lg:pl-64 lg:pr-44 
               xl:pl-[30rem] xl:pr-52"
    >
      {" "}
      {messages.map((message) => {
        const isSelf = String(message?.author?.id) === String(currentUserId);
        return (
          <div
            key={`${message.id}-${message.created_at}`}
            className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
          >
            <MessageBubble message={message} isSelf={isSelf} />
          </div>
        );
      })}
    </div>
  );
};
