import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Avatar,
  Input,
  Button,
  Popover,
  Tooltip,
  Empty,
  message as antMessage,
} from "antd";
import {
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useGetSingleTicketQuery } from "../api/ticketEndPoints";
import { useGetProfileQuery } from "../../../Profile/api/profileEndpoint";
import { webSocketBaseUrl } from "../../../../utilities/baseQuery";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AttachmentViewer from "../../../../common/components/AttachmentViewer";

dayjs.extend(relativeTime);

interface Message {
  id: number;
  content: string;
  created_at: string;
  author: {
    id: number;
    username: string;
    role?: {
      name: string;
    };
  };
  attachments?: any[];
  isRead?: boolean;
}

const Message = () => {
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get("ticket");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messageQueue = useRef<Message[]>([]);
  const isProcessing = useRef(false);

  const { data: profile } = useGetProfileQuery();
  const { data: ticketDetails }: any = useGetSingleTicketQuery(
    ticketId as any,
    {
      skip: !ticketId,
    }
  );

  useEffect(() => {
    if (ticketDetails) {
      setMessages(ticketDetails.data.comments || []);
    }
  }, [ticketDetails]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processMessageQueue = () => {
    if (isProcessing.current || messageQueue.current.length === 0) return;

    isProcessing.current = true;
    const message = messageQueue.current.shift();

    if (message) {
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === message.id);
        if (exists) return prev;

        const completeMessage = {
          ...message,
          author: message.author || {
            id: profile?.data?.id,
            username: profile?.data?.username || "You",
          },
        };

        return [...prev, completeMessage];
      });
    }

    isProcessing.current = false;
    if (messageQueue.current.length > 0) {
      setTimeout(processMessageQueue, 100);
    }
  };

  useEffect(() => {
    if (!ticketId || !profile?.data) return;

    const token = localStorage.getItem("access");
    const tokenObject = token ? JSON.parse(token) : null;
    const accessToken = tokenObject?.access;

    if (!accessToken) {
      antMessage.error("Authentication required. Please login again.");
      return;
    }

    const wsUrl = `${webSocketBaseUrl}/ws/ticket/${ticketId}/?token=${accessToken}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (!data.id || !data.content) {
          console.error("Invalid message format:", data);
          return;
        }
        messageQueue.current.push(data);
        processMessageQueue();
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      antMessage.error("Connection error. Please refresh the page.");
    };

    socket.onclose = (event) => {
      if (!event.wasClean) {
        antMessage.warning("Connection lost. Reconnecting...");
        setTimeout(() => {
          if (!ws || ws.readyState === WebSocket.CLOSED) {
            setWs(new WebSocket(wsUrl));
          }
        }, 5000);
      }
      setWs(null);
    };

    return () => {
      socket.close();
    };
  }, [ticketId, profile]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;

    const trimmed = inputMessage.trim();
    const messageData = { msg: trimmed };
    ws.send(JSON.stringify(messageData));
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar src={ticketDetails?.created_by?.avatar} />
          <div>
            <h3 className="font-medium">{ticketDetails?.title}</h3>
            <p className="text-xs text-gray-500">
              {ticketDetails?.created_by?.username}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Tooltip title="Call">
            <Button shape="circle" icon={<PhoneOutlined />} />
          </Tooltip>
          <Tooltip title="Video">
            <Button shape="circle" icon={<VideoCameraOutlined />} />
          </Tooltip>
          <Tooltip title="More">
            <Button shape="circle" icon={<EllipsisOutlined />} />
          </Tooltip>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => {
              // Ensure consistent ID comparison
              const isSelf =
                String(message?.author?.id) === String(profile?.data?.id);

              return (
                <div
                  key={`${message.id}-${message.created_at}`}
                  className={`flex ${
                    isSelf ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                      isSelf ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">
                        {message?.author?.username}
                      </span>
                      <span className="text-xs opacity-70">
                        {dayjs(message.created_at).fromNow()}
                      </span>
                    </div>
                    <p>{message?.content}</p>
                    {message?.attachments &&
                      message?.attachments?.length > 0 && (
                        <div className="mt-2">
                          <AttachmentViewer attachment={message?.attachments} />
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <Empty description="No messages yet" />
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Popover content={<div>Emoji picker here</div>} trigger="click">
            <Button shape="circle" icon={<SmileOutlined />} />
          </Popover>
          <Popover content={<div>Attachment options here</div>} trigger="click">
            <Button shape="circle" icon={<PaperClipOutlined />} />
          </Popover>
          <Input.TextArea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="flex-1"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
