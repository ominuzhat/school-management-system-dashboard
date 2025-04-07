import { Card, Result, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

const NoPermissionData = () => {
  return (
    <Card className="no-permission-card">
      <Result
        icon={<LockOutlined style={{ fontSize: "48px", color: "#ff4d4f" }} />}
        title="Access Denied"
        subTitle="You don't have permission to view this data"
        extra={
          <Button type="primary" onClick={() => (window.location.href = "/")}>
            Back to Home
          </Button>
        }
        style={{
          padding: "40px 0",
        }}
      />
      <div style={{ textAlign: "center", marginTop: -20 }}>
        <p style={{ color: "rgba(0, 0, 0, 0.45)" }}>
          Please contact your administrator if you believe this is an error
        </p>
      </div>
    </Card>
  );
};

export default NoPermissionData;
