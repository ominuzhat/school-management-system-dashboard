import { Button, Result, Typography } from "antd";
import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import Iconify from "../IconifyConfig/IconifyConfig";

const ErrorPage: React.FC = () => {
  const { statusText, status, message, data }: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#333333",
      }}
    >
      <Result
        status={status}
        title={
          <Typography.Text
            strong
            style={{ color: "white", fontSize: "1.5rem" }}
          >
            {statusText || message}
          </Typography.Text>
        }
        subTitle={
          <Typography.Text style={{ color: "#cccccc" }}>{data}</Typography.Text>
        }
        extra={
          <Button
            icon={<Iconify name="carbon:return" />}
            onClick={() => navigate(-1)}
            type="primary"
            danger
          >
            Go Back
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
