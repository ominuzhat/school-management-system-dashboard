import { Button, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Iconify from "../IconifyConfig/IconifyConfig";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const SingleDataView: React.FC<Props> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Space direction="vertical" style={{ width: "100%" }}>
        <BreadCrumb />

        <Button
          danger
          type="default"
          size="middle"
          ghost
          onClick={() => navigate(-1)}
          icon={<Iconify name="pajamas:go-back" />}
        >
          Return to previous page
        </Button>

        <Typography.Text strong style={{ fontSize: "24px" }}>
          {title}
        </Typography.Text>

        {children}
      </Space>
    </React.Fragment>
  );
};

export default SingleDataView;
