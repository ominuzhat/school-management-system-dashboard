// src/features/message/hooks/useWebSocket.ts
import { useState, useRef, useEffect } from "react";
import { message as antMessage } from "antd";
import { webSocketBaseUrl } from "../../../../utilities/baseQuery";
import { Message } from "../types/messageType";

export const useWebSocket = (ticketId: string | null, currentUserId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messageQueue = useRef<Message[]>([]);
  const isProcessing = useRef(false);

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
            id: currentUserId,
            username: "You",
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
    if (!ticketId || !currentUserId) return;

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
  }, [ticketId, currentUserId]);

  const sendMessage = (message: string) => {
    if (!message.trim() || !ws || ws.readyState !== WebSocket.OPEN) return false;

    const trimmed = message.trim();
    const messageData = { msg: trimmed };
    ws.send(JSON.stringify(messageData));
    return true;
  };
  const sendFile = async (file: File) => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !ticketId) return false;

    try {
      // First send metadata
      const metadata = {
        type: "attachment_metadata",
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        message: "Sent an attachment"
      };
      ws.send(JSON.stringify(metadata));

      // Then send the file data
      const arrayBuffer = await file.arrayBuffer();
      ws.send(arrayBuffer);

      return true;
    } catch (error) {
      console.error("Error sending file:", error);
      antMessage.error("Failed to send file");
      return false;
    }
  };

  return { messages, setMessages, sendMessage, sendFile };
};