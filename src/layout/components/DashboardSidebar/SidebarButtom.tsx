import { Typography } from "antd";
import React from "react";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";

const SidebarButtom: React.FC = () => {
  return (
    <React.Fragment>
      <div className="need-support-style">
        <Iconify
          name="fluent:person-support-28-regular"
          width={50}
          color="white"
        />
        <Typography.Text
          strong
          style={{ color: "white", fontSize: "18px", display: "block" }}
        >
          Need Support
        </Typography.Text>
        <Typography.Text style={{ display: "block", color: "#cccccc" }}>
          If you need support please contact with us.
        </Typography.Text>
        <br />
        <Typography.Text
          style={{
            color: "white",
          }}
        >
          Cell: 09638-336699
        </Typography.Text>
      </div>
    </React.Fragment>
  );
};

export default SidebarButtom;
