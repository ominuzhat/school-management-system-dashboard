import { Card, Tabs, TabsProps } from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import ClientDetails from "../component/ClientDetails";

const ClientViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (key: string) => {
    navigate(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "details",
      label: "Details",
      children: <ClientDetails />,
    },
    {
      key: "Invoice",
      label: <p>Invoice</p>,
      children: "ii",
    },
    {
      key: "Payments",
      label: "Payments",
      children: "Content of Tab Pane 3",
    },
    {
      key: "Quotation",
      label: "Quotation",
      children: "Content of Tab Pane 4",
    },
    {
      key: "List of Upload Passports",
      label: "List of Upload Passports",
      children: "Content of Tab Pane 4",
    },
    {
      key: "Clients Ledger",
      label: "Clients Ledger",
      children: "Content of Tab Pane 4",
    },
  ];

  // Determine the active tab based on the current path
  const activeKey = location.pathname.split("/").pop() || "details";

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Tabs
          centered
          activeKey={activeKey}
          items={items}
          onChange={onChange}
          type="card"
        />
      </Card>
    </div>
  );
};

export default ClientViewPage;
