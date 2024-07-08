import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ConfigProvider, theme } from "antd";
import Notification from "./common/Notification/Notification";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { Modal } from "./common/CommonAnt";

const App: React.FC = () => {
  const { themes, primaryColor } = useSelector(
    (state: RootState) => state.themes
  );

  return (
    <React.Fragment>
      <ConfigProvider
        theme={{
          algorithm:
            themes === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
            fontFamily: "Hind Siliguri, sans-serif",
            colorPrimary: primaryColor,
          },
        }}
      >
        <RouterProvider router={router} />
        <Notification />
        <Modal />
      </ConfigProvider>
    </React.Fragment>
  );
};

export default App;
