import { Descriptions, DescriptionsProps, Tag } from "antd";

const ClientDetails = () => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: "Rakib Khan",
      span: 3,
    },
    {
      key: "2",
      label: "Client Type	",
      children: "INDIVIDUAL",
      span: 3,
    },
    {
      key: "3",
      label: "Client Due",
      children: "3",
      span: 3,
    },
    {
      key: "4",
      label: "Gender",
      children: "Male",
      span: 3,
    },
    {
      key: "5",
      label: "Mobile",
      children: "01910130495",
      span: 3,
    },
    {
      key: "6",
      label: "Create Date	",
      children: "10/1/2023",
      span: 3,
    },
    {
      key: "6",
      label: "Client Source	",
      children: "",
      span: 3,
    },
    {
      key: "6",
      label: "Status",
      children: <Tag color="green">Active </Tag>,
      span: 3,
    },
  ];

  return (
    <div>
      <Descriptions bordered title="Client Details" items={items} />
    </div>
  );
};

export default ClientDetails;
