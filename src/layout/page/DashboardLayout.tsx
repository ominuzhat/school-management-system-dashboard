import { Layout } from "antd";
import React, { useState } from "react";
import "../styles/DashboardLayout.css";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import SidebarDrawer from "../components/DashboardSidebar/SidebarDrawer";

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Layout className="dashboard-main-layout">
        <DashboardSidebar />

        <Layout id="contain-layout">
          <DashboardHeader setOpen={setOpen} />
          <Content>
            <div className="dashboard-content" style={{ padding: "10px 20px" }}>
              <Outlet />
            </div>
          </Content>

          {/* <DashboardFooter /> */}
        </Layout>
      </Layout>
      <SidebarDrawer open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default DashboardLayout;
