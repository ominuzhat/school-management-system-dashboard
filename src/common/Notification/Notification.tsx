import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  NotificationInitialStateTypes,
  clearNotification,
} from "../../app/features/notificationSlice";
import { notification } from "antd";

const Notification: React.FC = () => {
  const { type, message, placement } = useSelector<
    RootState,
    NotificationInitialStateTypes
  >((state) => state.notification);
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (message) {
      api[type]({
        message: message,
        placement: placement,
        showProgress: true,
      });
      dispatch(clearNotification());
    }
  }, [api, dispatch, message, placement, type]);

  return <React.Fragment>{contextHolder}</React.Fragment>;
};

export default Notification;
