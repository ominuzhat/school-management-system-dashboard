import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import UpdateExamHall from "../Components/UpdateExamHall";

const useExamHallColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  // const [deleteCartItem] = useDeleteOrderItemMutation();

  // const handleDelete = async (id: any) => {
  //   try {
  //     await deleteCartItem({ id }).unwrap();
  //     console.log("Item deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete item:", error);
  //   }
  // };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Exam Hall Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Capacity",
      dataIndex: "capacity",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
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
                  title: "Update Class",
                  content: <UpdateExamHall record={record?.id} />,
                })
              )
            }
          />
          {/* <ViewButton to={`student-view/1`} />
          <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useExamHallColumns;
