import { Descriptions, DescriptionsProps, Typography } from "antd";

const ClientDetails = () => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Date",
      children: "13-02-2024",
    },
    {
      key: "2",
      label: "Airlines",
      children: "Ek- Emirates Airlines",
    },
    {
      key: "3",
      label: "Vendor",
      children: "Chowdury",
    },
    {
      key: "4",
      label: "Ticket Price",
      children: "BDT 340000",
    },
    {
      key: "5",
      label: "Flight Status",
      children: "Done",
    },
    {
      key: "6",
      label: "Route",
      children: "DAC>DXB>GRU",
    },
  ];

  return (
    <div>
      <Descriptions bordered title="Client Details" items={items} />
    </div>
  );
};

export default ClientDetails;
