import { Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import EditButton from "../../../common/CommonAnt/Button/EditButton";
import type { ColumnsType } from "antd/es/table";
import DeleteButton from "../../../common/CommonAnt/Button/DeleteButton";
import ViewButton from "../../../common/CommonAnt/Button/ViewButton";
import { useDeleteServiceItemMutation } from "../api/serviceEndpoints";
import UpdateService from "../components/UpdateService";

const useColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteServiceItemMutation();

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
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title), // Sorting by title
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "6",
      title: "slug",
      dataIndex: "slug",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Service",
                  content: <UpdateService record={record} />,
                })
              )
            }
          />
          <ViewButton to={`product-view/${record.id}`} />
          <DeleteButton onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton>
        </Space>
      ),
    },
  ];
};

export default useColumns;
