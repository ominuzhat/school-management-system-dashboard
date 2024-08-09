// useColumns.js
import { Space } from "antd";
import { useDispatch } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { TCategoryDataTypes } from "../types/CategoryTypes";
import { useDeleteCategoryItemMutation } from "../api/CategoryEndPoints";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import UpdateCategory from "../components/UpdateCategory";

const useColumns = (): ColumnsType<TCategoryDataTypes> => {
  const dispatch = useDispatch();
  const [deleteCartItem] = useDeleteCategoryItemMutation();
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
      title: "Name",
      align: "center",
      dataIndex: "name",
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
                  title: "Update Category",
                  content: <UpdateCategory record={record} />,
                })
              )
            }
          />
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
