import { ClockCircleOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Dropdown, Menu } from "antd";
import { useEffect, useRef, useState } from "react";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import {
  useCreateMarkAllNotificationMutation,
  useCreateMarkAsReadNotificationMutation,
} from "../../../modules/notification/api/notificationEndPoints";
import { webSocketBaseUrl } from "../../../utilities/baseQuery";

const Notification = () => {
  const [create] = useCreateMarkAllNotificationMutation();
  const [markAsRead] = useCreateMarkAsReadNotificationMutation();
  const [notifications, setNotifications]: any = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ws: any = useRef(null);

  useEffect(() => {
    setupWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const setupWebSocket = () => {
    const token_raw = localStorage.getItem("access");
    const token_object = JSON.parse(token_raw || "{}");
    ws.current = new WebSocket(`${webSocketBaseUrl}/ws/admin/notifications/?token=${token_object.access}`);

    ws.current.onopen = () => {
      console.log("notification WebSocket connection established");
    };

    ws.current.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (data.type === "initial_notifications") {
        updateNotifications(data.data);
      } else if (data.type === "new_notification") {
        handleNewNotification(data.data);
      }
    };

    ws.current.onclose = () => {
      console.log(
        "WebSocket connection closed - attempting to reconnect in 5 seconds"
      );
      setTimeout(setupWebSocket, 5000);
    };

    ws.current.onerror = (error: any) => {
      console.error("WebSocket error:", error);
    };
  };

  const updateNotifications = (newNotifications: any) => {
    setNotifications(newNotifications);
    const unread = newNotifications.filter((n: any) => !n.is_read).length;
    setUnreadCount(unread);
  };

  const handleNewNotification = (notification: any) => {
    playNotificationSound();
    setNotifications((prev: any) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const notificationMenu = (
    <Menu style={{ maxWidth: 350, maxHeight: 400, overflow: "auto" }}>
      <Menu.Item key="header" disabled>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {unreadCount} New Notification{unreadCount !== 1 ? "s" : ""}
          </span>
          <Button
            type="link"
            size="small"
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await create({}).unwrap();
                console.log("All notifications marked as read.");
              } catch (error) {
                console.error("Failed to mark all as read:", error);
              }
            }}
          >
            Mark all as read
          </Button>
        </div>
      </Menu.Item>
      <Divider style={{ margin: "4px 0" }} />

      {notifications.length === 0 ? (
        <Menu.Item key="empty" disabled>
          <div style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.45)" }}>
            No new notifications
          </div>
        </Menu.Item>
      ) : (
        notifications.map((notification: any) => (
          <Menu.Item
            key={notification.id}
            onClick={() => markAsRead(notification?.id)}
            style={{
              backgroundColor: !notification.is_read ? "#f6ffed" : "inherit",
              padding: "8px 12px",
            }}
          >
            <a
              href={
                notification.related_object
                  ? `/${notification.related_object.type}/${notification.related_object.id}/`
                  : "#"
              }
              style={{ color: "inherit" }}
              onClick={(e) => e.preventDefault()}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 14 }}>{notification.title}</strong>
                {!notification.is_read && (
                  <span style={{ color: "#ff4d4f", fontSize: 8 }}>
                    <ClockCircleOutlined />
                  </span>
                )}
              </div>
              <p style={{ marginBottom: 2, fontSize: 13 }}>
                {notification.message}
              </p>
              <p style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 11 }}>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </a>
          </Menu.Item>
        ))
      )}
      <Divider style={{ margin: "4px 0" }} />
      <Menu.Item key="footer">
        <a
          href="/support/notifications/"
          style={{ display: "block", textAlign: "center" }}
        >
          See All Notifications
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={notificationMenu}
      trigger={["click"]}
      placement="bottomRight"
      visible={visible}
      onVisibleChange={setVisible}
      overlayStyle={{ width: 350 }}
    >
      <Badge count={unreadCount} overflowCount={99}>
        <Button
          type="default"
          shape="circle"
          icon={<Iconify name="ant-design:bell-outlined" />}
          onClick={() => setVisible(!visible)}
        />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
