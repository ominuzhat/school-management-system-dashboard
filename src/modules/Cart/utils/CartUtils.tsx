// useColumns.js
import { Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import EditButton from "../../../common/CommonAnt/Button/EditButton";
import UpdateRestaurant from "../../Restaurants/components/UpdateRestaurant";
import type { ColumnsType } from "antd/es/table";
import type { ProductsTypes } from "../types/CartTypes";
import DeleteButton from "../../../common/CommonAnt/Button/DeleteButton";
import { useDeleteCartItemMutation } from "../api/CartEndpoints";

const useColumns = (): ColumnsType<ProductsTypes> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const handleDelete = async (id: any) => {
    try {
      await deleteCartItem({ id }).unwrap();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  return [
    {
      key: "0",
      title: "SL",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "4",
      title: "Live Website Link",
      dataIndex: "live_link",
      render: (live_link) =>
        live_link ? (
          <a href={live_link} target="_blank" rel="noopener noreferrer">
            <GlobalOutlined />
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      key: "6",
      title: "Support",
      dataIndex: "support_for",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "5",
      title: "Price",
      dataIndex: "price",
      render: (title) => (title ? title : "N/A"),
    },

    {
      title: "Actions",
      render: (record) => (
        <Space>
          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Restaurant",
                  content: <UpdateRestaurant record={record} />,
                })
              )
            }
          />
          {/* <ViewButton to={`${record.id}`} /> */}
          <DeleteButton onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton>
        </Space>
      ),
    },
    // Add other column definitions here
  ];
};

export default useColumns;
