import { Layout, Typography } from "antd";
import React from "react";

const DashboardFooter: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <Layout.Footer>
      <Typography.Text style={{ textAlign: "center", display: "block" }}>
        © {year}. All Rights and Design & Developed by{" "}
        <Typography.Link
          target="_blank"
          href="https://www.codecanvascreation.com/"
        >
          Code Canvas Creation.
        </Typography.Link>
      </Typography.Text>
    </Layout.Footer>
  );
};

export default DashboardFooter;
