import { useParams } from "react-router-dom";
import { useSingleProductItemQuery } from "../api/productEndPoints";
import { Button, Descriptions, DescriptionsProps } from "antd";

const ProductView = () => {
  const { productId } = useParams();
  const { data } = useSingleProductItemQuery({ id: Number(productId) });

  const {
    category,
    description,
    images,
    live_link,
    price,
    slug,
    subtitle,
    support_for,
    title,
    total_sale,
  } = data?.data || {};

  console.log("ttt", data);

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
      label: (
        <div className="custom-label font-bold ">Passport Issue Date </div>
      ),
      children: "13-02-2020",
    },
    {
      key: "2",
      label: (
        <div className="custom-label font-bold ">Passport Expiry Date </div>
      ),
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
      label: "Description",
      children: <>{description || "N/A"}</>,
    },
  ];

  return (
    <div>
      <Descriptions
        bordered
        title={` Product Name :  ${title}`}
        // extra={
        //   <div className="space-x-5">
        //     <Button type="primary">Print</Button>
        //     <Button type="primary">Edit</Button>
        //   </div>
        // }
        items={borderedItems}
      />
    </div>
  );
};

export default ProductView;
