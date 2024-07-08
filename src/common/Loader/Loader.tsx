import { Spin } from "antd";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
