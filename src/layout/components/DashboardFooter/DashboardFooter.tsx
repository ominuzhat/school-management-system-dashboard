import { Layout, Typography } from "antd";
import React from "react";

const DashboardFooter: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <Layout.Footer>
      <Typography.Text style={{ textAlign: "center", display: "block" }}>
        © {year}. All Rights Reserved by HB Aviation and Design & Developed by{" "}
        <Typography.Link target="_blank" href="https://m360ict.com/">
          M360ICT.
        </Typography.Link>
      </Typography.Text>
    </Layout.Footer>
  );
};

export default DashboardFooter;
