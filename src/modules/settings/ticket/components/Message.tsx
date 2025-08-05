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
import dayjs from "dayjs";
import { useGetProfileQuery } from "../../../Profile/api/profileEndpoint";
import { webSocketBaseUrl } from "../../../../utilities/baseQuery";

const Message = () => {
  // State management
  const [filters, setFilters] = useState({ search: "", is_active: "" });
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { data: profile } = useGetProfileQuery();

  // Redux state
  const { page_size, page } = useAppSelector(FilterState);

  // API queries
  const { data: ticketDetails } = useGetSingleTicketQuery(
    selectedTicketId as number,
    {
      skip: !selectedTicketId,
    }
  );

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

  // WebSocket connection management
  useEffect(() => {
    console.log(ticketDetails?.data?.title,'ticketDetails');
    if (!ticketDetails?.data?.title) return;
    const wsUrl = `${webSocketBaseUrl}/ws/tickets/${ticketDetails?.data?.title}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU0OTE5NjY1LCJpYXQiOjE3NTQzMTQ4NjUsImp0aSI6IjkwZTQ3MjhkZjc4OTQ5YmU5MWE3NzNhYmFiOTJkYzAzIiwidXNlcl9pZCI6MTI2LCJ1c2VybmFtZSI6IkhvbHliaXJkIn0.lW8-hFOyb9jyPLWMGU52RSaL73BZSPVITrwC_nSSst8`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'chat.message') {
        handleNewMessage(data.message);
      } else if (data.type === 'unread_update') {
        setUnreadCounts(data.unread_counts);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        setSocket(new WebSocket(wsUrl));
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [selectedTicketId, profile?.data?.id, ticketDetails?.data?.title]);

  // Handle incoming messages
  const handleNewMessage = (messageData: any) => {
    setMessages(prev => [...prev, {
      id: messageData.id,
      text: messageData.content,
      sender: messageData.author.id === profile?.data?.id ? "me" : "them",
      time: formatTime(messageData.created_at),
      author: messageData.author,
      attachments: messageData.attachments,
    }]);
  };

  // Mark messages as read when they become visible
  useEffect(() => {
    if (!selectedTicketId || !profile?.data?.id || !socket) return;

    const unreadIds = messages
      .filter(m => m.sender === "them" && !m.isRead)
      .map(m => m.id);

    if (unreadIds.length > 0) {
      socket.send(JSON.stringify({
        mark_read: unreadIds
      }));
      
      // Update local state to mark as read
      setMessages(prev => prev.map(m => 
        unreadIds.includes(m.id) ? {...m, isRead: true} : m
      ));
    }
  }, [messages, selectedTicketId, profile?.data?.id, socket]);

  // Effects for initial data loading
  useEffect(() => {
    if (ticketDetails?.data?.id) {
      const ticket = ticketDetails.data;
      const ticketMessages = formatTicketMessages(ticket);
      setMessages(ticketMessages);
      
      // Initialize unread counts
      const counts: Record<number, number> = {};
      ticket.comments?.forEach((comment: any) => {
        if (!comment.read_by?.includes(profile?.data?.id) && comment.author.id !== profile?.data?.id) {
          counts[comment.author.id] = (counts[comment.author.id] || 0) + 1;
        }
      });
      setUnreadCounts(counts);
    }
  }, [ticketDetails, profile?.data?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper functions
  const formatTime = (dateString: string) => {
    return dayjs(dateString).format("h:mm A");
  };

  const formatTicketMessages = (ticket: any): any[] => {
    return [
      {
        id: 0,
        text: ticket.description,
        sender: "them",
        time: formatTime(ticket.created_at),
        author: ticket.created_by,
        isRead: true,
      },
      ...(ticket.comments?.map((comment: any) => ({
        id: comment.id,
        text: comment.content,
        sender: comment.author.id === profile?.data?.id ? "me" : "them",
        time: formatTime(comment.created_at),
        author: comment.author,
        attachments: comment.attachments,
        isRead: comment.read_by?.includes(profile?.data?.id) || comment.author.id === profile?.data?.id,
      })) || []),
    ];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Event handlers
  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      message.warning("Message cannot be empty!");
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        msg: newMessage
      }));
      setNewMessage("");
    } else {
      message.error("Connection error. Please try again.");
    }
  };

  const getAvatarColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-500";
      case "closed": return "bg-gray-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-orange-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "blue";
    }
  };

  const handleTicketSelect = (ticketId: number) => {
    setSelectedTicketId(ticketId);
  };

  // Calculate total unread for a ticket
  const calculateTicketUnread = (ticket: any) => {
    if (!profile?.data?.id) return 0;
    return ticket.comments?.filter((c: any) => 
      !c.read_by?.includes(profile.data.id) && c.author.id !== profile.data.id
    ).length || 0;
  };

  // Component rendering
  const renderContactsList = () => {
    if (error) return <div className="p-4 text-center text-red-500">Error loading tickets</div>;
    if (isLoading || isFetching) return <div className="flex justify-center items-center h-full"><Spin size="large" /></div>;
    if (!ticketData?.data?.results?.length) return <Empty description="No tickets found" className="flex flex-col justify-center h-full" />;

    return (
      <List
        itemLayout="horizontal"
        dataSource={ticketData.data.results}
        renderItem={(item: any) => (
          <List.Item
            className={`p-3 hover:bg-gray-50 cursor-pointer border-0 border-b border-gray-100 ${
              selectedTicketId === item.id ? "bg-blue-50" : ""
            }`}
            onClick={() => handleTicketSelect(item.id)}
            actions={[
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">
                  {dayjs(item.created_at).format("MMM D")}
                </span>
                {calculateTicketUnread(item) > 0 && (
                  <Badge
                    count={calculateTicketUnread(item)}
                    style={{ backgroundColor: getPriorityColor(item.priority) }}
                  />
                )}
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Badge dot={calculateTicketUnread(item) > 0} offset={[-5, 35]}>
                  <Avatar size="large" className={getAvatarColor(item.status)}>
                    {item.title.charAt(0).toUpperCase()}
                  </Avatar>
                </Badge>
              }
              title={
                <div className="flex items-center">
                  <span className="font-medium">{item.title}</span>
                  <Badge
                    color={getPriorityColor(item.priority)}
                    className="ml-2"
                  />
                </div>
              }
              description={
                <span className="text-gray-500 truncate">
                  {item.description || "No description"}
                </span>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  const renderMessageArea = () => {
    if (!ticketDetails?.data) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <Empty description={<span className="text-gray-500">Select a ticket to view conversation</span>} />
        </div>
      );
    }

    const ticket = ticketDetails.data;

    return (
      <>
        {/* Chat header */}
        <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center">
            <Avatar size="large" className={getAvatarColor(ticket.status)}>
              {ticket.title.charAt(0).toUpperCase()}
            </Avatar>
            <div className="ml-3">
              <div className="font-medium">{ticket.title}</div>
              <div className="text-xs text-gray-500">
                {onlineStatus ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  <span>
                    Created by {ticket.created_by.username} (
                    {ticket.created_by.role.name}) at{" "}
                    {formatTime(ticket.created_at)}
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
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                  msg.sender === "me"
                    ? "bg-green-100 rounded-tr-none"
                    : "bg-white rounded-tl-none"
                } ${!msg.isRead ? "border-l-2 border-blue-500" : ""}`}
              >
                {msg.author && (
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    {msg.author.username} ({msg.author.role?.name})
                    {!msg.isRead && msg.sender === "them" && (
                      <span className="ml-2 text-blue-500 text-xs">(unread)</span>
                    )}
                  </div>
                )}
                <div className="text-gray-800">{msg.text}</div>
                {msg.attachments?.map((attachment: any) => (
                  <AttachmentViewer key={attachment.id} attachment={attachment} />
                ))}
                <div className="text-right text-xs text-gray-500 mt-1">
                  {msg.time}
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
            disabled={!socket || socket.readyState !== WebSocket.OPEN}
          />
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - Contacts */}
      <div className="w-1/3 flex flex-col border-r border-gray-200 bg-white">
        <div className="flex justify-between items-center p-3 bg-gray-50">
          <Avatar size="large" className="bg-green-500">
            {profile?.data?.username.charAt(0).toUpperCase()}
          </Avatar>
          <Button type="text" icon={<MoreOutlined />} />
        </div>

        <div className="p-2 bg-gray-50">
          <Input
            placeholder="Search tickets"
            prefix={<SearchOutlined />}
            className="rounded-lg"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            allowClear
          />
        </div>

        <div className="flex-1 overflow-y-auto">{renderContactsList()}</div>
      </div>

      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {renderMessageArea()}
        {!socket || socket.readyState !== WebSocket.OPEN ? (
          <div className="absolute bottom-20 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-xs">
            Connection lost - reconnecting...
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Message;