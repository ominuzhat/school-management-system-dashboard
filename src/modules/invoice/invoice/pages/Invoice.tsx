import { Card, Tabs, TabsProps } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NonCommision from "../../non-commission/pages/NonCommision";
import CommisionAirTicket from "../../commission-air-ticket/pages/CommisionAirTicket";

const Invoice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (key: string) => {
    navigate(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "commission-air-ticket",
      label: "Commision Air Ticket",
      children: <CommisionAirTicket />,
    },
    {
      key: "non-commission-air-ticket",
      label: <p>Non Commission Air Ticket</p>,
      children: <NonCommision />,
    },
    {
      key: "reissue",
      label: "Reissue",
      children: "Content of Tab Pane 3",
    },
    {
      key: "refund",
      label: "Refund",
      children: "Content of Tab Pane 4",
    },
  ];

  // Determine the active tab based on the current path
  const activeKey =
    location.pathname.split("/").pop() || "commission-air-ticket";

  return (
    <React.Fragment>
      <Card>
        <Tabs
          centered
          activeKey={activeKey}
          items={items}
          onChange={onChange}
          type="card"
        />
      </Card>

      {/* <Outlet /> */}
    </React.Fragment>
  );
};

export default Invoice;
