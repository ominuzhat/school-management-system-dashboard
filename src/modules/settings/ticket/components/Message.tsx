/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Input,
  Button,
  List,
  Badge,
  Popover,
  Divider,
  message,
  Spin,
  Empty,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  useGetSingleTicketQuery,
  useGetTicketQuery,
} from "../api/ticketEndPoints";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import AttachmentViewer from "../../../../common/components/AttachmentViewer";

const Message = () => {
  const [filters, setFilters] = useState({ search: "", is_active: "" });
  const { page_size, page } = useAppSelector(FilterState);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: ticketDetails } = useGetSingleTicketQuery(
    Number(selectedTicket)
  );

  console.log(ticketDetails, setOnlineStatus);

  const {
    data: ticketData,
    isLoading,

    isFetching,
    error,
  } = useGetTicketQuery({
    search: filters.search,
    is_active: filters.is_active,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  // Map tickets to contacts
  const contacts: any[] =
    (Array.isArray(ticketData?.data?.results) &&
      (ticketData?.data?.results as any[]).map((ticket) => ({
        id: ticket.id,
        name: ticket?.title,
        avatar: ticket.title.charAt(0).toUpperCase(),
        lastMessage: ticket.description || "No description",
        time: new Date(ticket.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unread: ticket.comments?.length || 0,
        status: ticket.status,
        priority: ticket.priority,
      }))) ||
    [];

  console.log(contacts);
  console.log(ticketData?.data);

  // Update messages when selected ticket changes
  useEffect(() => {
    if (selectedTicket) {
      const ticketMessages: any[] = [
        {
          id: 0,
          text: selectedTicket.description,
          sender: "them",
          time: new Date(selectedTicket.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          author: selectedTicket.created_by,
        },
        ...(selectedTicket.comments?.map((comment: any) => ({
          id: comment.id,
          text: comment.content,
          sender: comment.author.id === 405 ? "me" : ("them" as "me" | "them"), // Replace 405 with current user ID
          time: new Date(comment.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          author: comment.author,
          attachments: comment.attachments,
        })) || []),
      ];
      setMessages(ticketMessages);
    }
  }, [selectedTicket]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      message.warning("Message cannot be empty!");
      return;
    }

    const newMsg: any = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAvatarColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500";
      case "closed":
        return "bg-gray-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-orange-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "blue";
    }
  };

  const handleTicketSelect = (ticketId: number) => {
    const ticket =
      Array.isArray(ticketData?.data?.results) &&
      ticketData?.data?.results.find((t: any) => t.id === ticketId);
    setSelectedTicket(ticket || null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - Contacts */}
      <div className="w-1/3 flex flex-col border-r border-gray-200 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center p-3 bg-gray-50">
          <Avatar size="large" className="bg-green-500">
            ME
          </Avatar>
          <Button type="text" icon={<MoreOutlined />} />
        </div>

        {/* Search */}
        <div className="p-2 bg-gray-50">
          <Input
            placeholder="Search tickets"
            prefix={<SearchOutlined />}
            className="rounded-lg"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            allowClear
          />
        </div>

        {/* Contacts list */}
        <div className="flex-1 overflow-y-auto">
          {error ? (
            <div className="p-4 text-center text-red-500">
              Error loading tickets
            </div>
          ) : isLoading || isFetching ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : contacts.length === 0 ? (
            <Empty
              description="No tickets found"
              className="flex flex-col justify-center h-full"
            />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={contacts}
              renderItem={(item) => (
                <List.Item
                  className={`p-3 hover:bg-gray-50 cursor-pointer border-0 border-b border-gray-100 ${
                    selectedTicket?.id === item.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleTicketSelect(item.id)}
                  actions={[
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">{item.time}</span>
                      {item.unread > 0 && (
                        <Badge
                          count={item.unread}
                          style={{
                            backgroundColor: getPriorityColor(item.priority),
                          }}
                        />
                      )}
                    </div>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot={item.unread > 0} offset={[-5, 35]}>
                        <Avatar
                          size="large"
                          className={getAvatarColor(item.status)}
                        >
                          {item.avatar}
                        </Avatar>
                      </Badge>
                    }
                    title={
                      <div className="flex items-center">
                        <span className="font-medium">{item.name}</span>
                        <Badge
                          color={getPriorityColor(item.priority)}
                          className="ml-2"
                        />
                      </div>
                    }
                    description={
                      <span className="text-gray-500 truncate">
                        {item.lastMessage}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedTicket ? (
          <>
            {/* Chat header */}
            <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center">
                <Avatar
                  size="large"
                  className={getAvatarColor(selectedTicket.status)}
                >
                  {selectedTicket.title.charAt(0).toUpperCase()}
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium">{selectedTicket.title}</div>
                  <div className="text-xs text-gray-500">
                    {onlineStatus ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      <span>
                        Created by {selectedTicket.created_by.username} (
                        {selectedTicket.created_by.role.name}) at{" "}
                        {new Date(selectedTicket.created_at).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Tooltip title="Call">
                  <Button type="text" icon={<PhoneOutlined />} />
                </Tooltip>
                <Tooltip title="Video Call">
                  <Button type="text" icon={<VideoCameraOutlined />} />
                </Tooltip>
                <Tooltip title="Search">
                  <Button type="text" icon={<SearchOutlined />} />
                </Tooltip>
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="flex flex-col w-40">
                      <Button type="text" className="text-left">
                        View ticket details
                      </Button>
                      <Button type="text" className="text-left">
                        Mute notifications
                      </Button>
                      <Button type="text" className="text-left">
                        Clear chat
                      </Button>
                      <Divider className="my-2" />
                      <Button type="text" danger className="text-left">
                        Close ticket
                      </Button>
                    </div>
                  }
                  trigger="click"
                >
                  <Tooltip title="More options">
                    <Button type="text" icon={<EllipsisOutlined />} />
                  </Tooltip>
                </Popover>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100 bg-opacity-50 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png')]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                      message.sender === "me"
                        ? "bg-green-100 rounded-tr-none"
                        : "bg-white rounded-tl-none"
                    }`}
                  >
                    {message.author && (
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {message.author.username} ({message.author.role.name})
                      </div>
                    )}
                    <div className="text-gray-800">{message.text}</div>

                    {/* Attachments */}
                    {message.attachments?.map((attachment: any) => (
                      <AttachmentViewer
                        key={attachment.id}
                        attachment={attachment}
                      />
                    ))}

                    <div className="text-right text-xs text-gray-500 mt-1">
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="flex items-center p-3 bg-gray-50">
              <Button
                type="text"
                icon={<PaperClipOutlined />}
                className="text-gray-500"
              />
              <Button
                type="text"
                icon={<SmileOutlined />}
                className="text-gray-500"
              />
              <Input
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onPressEnter={handleSendMessage}
                className="flex-1 mx-2 rounded-full bg-white"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                className="bg-green-500 border-green-500"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <Empty
              description={
                <span className="text-gray-500">
                  Select a ticket to view conversation
                </span>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
