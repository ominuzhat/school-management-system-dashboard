import { Typography } from "antd";
import React from "react";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ThemesTypes } from "../../../app/features/themeSlice";

const SidebarButtom: React.FC = () => {
  const { themes } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );
  return (
    <React.Fragment>
      <div
        className="need-support-style"
        style={{
          background:
            themes === "light" ? "#f0f8ff" : "rgba(85, 131, 215, 0.8)",
          color: themes === "light" ? "black" : "white",
        }}
      >
        <Iconify name="fluent:person-support-28-regular" width={30} />
        <Typography.Text strong style={{ fontSize: "18px", display: "block" }}>
          Need Support
        </Typography.Text>
        <Typography.Text style={{ textAlign: "center" }}>
          If you need support please contact with us.
        </Typography.Text>
        <br />
        <Typography.Text>support@codecanvascreation.com</Typography.Text>
        <Typography.Text>Cell: +8809617391391</Typography.Text>
      </div>
    </React.Fragment>
  );
};

export default SidebarButtom;
