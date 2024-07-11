import { Button, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import "../../../index.css";

const borderedItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: <div className="custom-label font-bold">Passport Number</div>,
    children: <div>000012</div>,
  },
  {
    key: "2",
    label: <div className="custom-label font-bold ">Date Of Birth</div>,
    children: "13-02-2020",
  },
  {
    key: "2",
    label: <div className="custom-label font-bold ">Passport Issue Date </div>,
    children: "13-02-2020",
  },
  {
    key: "2",
    label: <div className="custom-label font-bold ">Passport Expiry Date </div>,
    children: "13-02-2020",
  },
  {
    key: "3",
    label: "Client",
    children: "Shakib Khan",
  },
  {
    key: "3",
    label: "Gender",
    children: "Male",
  },
  {
    key: "4",
    label: "Previous Visited Countries",
    children: "India , Maldives , Bhutan",
  },
  {
    key: "5",
    label: "Previous Passport Number",
    children: "000000369",
  },
  {
    key: "6",
    label: "Mobile Number",
    children: "01862404050",
  },
  {
    key: "6",
    label: "Which Country For",
    children: "Bangladesh",
  },
  {
    key: "6",
    label: "Group Name",
    children: "BR624",
  },
  {
    key: "6",
    label: "Passport Received",
    children: "No (Gmail)",
  },

  {
    key: "6",
    label: "Passport Status",
    children: "Flight Done",
  },
  {
    key: "6",
    label: "Police Clearance Issue Date",
    children: "Yes (20-12-2024)",
  },
  {
    key: "22",
    label: <div className="custom-label">Passport Tracking Number</div>,
    children: "000012",
  },

  {
    key: "7",
    label: "Remark",
    children: (
      <>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
        quisquam iusto at nobis? Laboriosam, rem eligendi molestias totam nemo
        et.
      </>
    ),
  },
];

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
const payment: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Total Payment",
    children: "BDT 500000",
  },
  {
    key: "2",
    label: "Due Amount",
    children: "BDT 200000",
  },
  {
    key: "3",
    label: "Advance",
    children: "BDT 200000",
  },
  {
    key: "4",
    label: "Payment History",
    children: (
      <div className="space-y-2 ">
        <div className="flex items-center justify-between border-b-2 pb-3">
          <p>13-july-2024</p>
          <p>MR 0201115</p>
          <p>Cash</p>
          <p>BDT 50000</p>
          <Button className="ms-5"> View Money Receipt </Button>
        </div>
        <div className="flex items-center justify-between border-b-2 pb-3">
          <p>13-july-2024</p>
          <p>MR 0201115</p>
          <p>Cash</p>
          <p>BDT 50000</p>
          <Button className="ms-5"> View Money Receipt </Button>
        </div>
        <div className="flex items-center justify-between border-b-2 pb-3">
          <p>13-july-2024</p>
          <p>MR 0201115</p>
          <p>Cash</p>
          <p>BDT 50000</p>
          <Button className="ms-5"> View Money Receipt </Button>
        </div>
        <div className="flex items-center justify-between pb-3">
          <p>13-july-2024</p>
          <p>MR 0201115</p>
          <p>Cash</p>
          <p>BDT 50000</p>
          <Button className="ms-5"> View Money Receipt </Button>
        </div>
      </div>
    ),
  },
];

const ViewPassportManagement = () => {
  return (
    <div>
      <Descriptions
        bordered
        title="Passport Name"
        extra={
          <div className="space-x-5">
            <Button type="primary">Print</Button>
            <Button type="primary">Edit</Button>
          </div>
        }
        items={borderedItems}
      />

      <Descriptions
        className="mt-10"
        bordered
        title="Flight Details"
        extra={<Button type="primary">View Invoice</Button>}
        items={items}
      />
      <Descriptions
        className="mt-10"
        bordered
        title="Flight Details"
        items={payment}
      />
    </div>
  );
};

export default ViewPassportManagement;
