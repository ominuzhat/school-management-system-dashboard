import { useParams } from "react-router-dom";
import { useSingleProductItemQuery } from "../api/productEndPoints";
import { Carousel, Descriptions, DescriptionsProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

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
    tags,
  } = data?.data || {};

  console.log("ttt", data);

  const borderedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <div className="custom-label font-bold">category</div>,
      children: <div>{category?.name}</div>,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold ">Sub title</div>,
      children: <div>{subtitle}</div>,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold ">Support </div>,
      children: <div>{support_for}</div>,
    },
    {
      key: "2",
      label: <div className="custom-label font-bold ">Live Link</div>,
      children: (
        <a href={live_link} target="_blank" rel="noopener noreferrer">
          <GlobalOutlined />
        </a>
      ),
    },
    {
      key: "3",
      label: "Slug",
      children: <div>{slug || "N/A"}</div>,
    },
    {
      key: "3",
      label: "Total Sale",
      children: <div>{total_sale || "N/A"}</div>,
    },
    {
      key: "3",
      label: "Price",
      children: <div>{price || "N/A"}</div>,
    },
    {
      key: "3",
      label: "tags",
      children: <div>{tags || "N/A"}</div>,
    },
    {
      key: "3",
      label: "tags",
      children: <div>{tags || "N/A"}</div>,
    },

    {
      key: "7",
      label: "Description",
      children: <>{description || "N/A"}</>,
    },
  ];

  const contentStyle: React.CSSProperties = {
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div>
      <Carousel autoplay>
        {images?.map((image: any) => (
          <div key={image?.id}>
            <h3 style={contentStyle}>
              <img
                src={image?.image}
                alt={`slide-${image?.id}`}
                style={{ width: "100%", height: "100%" }}
              />
            </h3>
          </div>
        ))}
      </Carousel>

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
