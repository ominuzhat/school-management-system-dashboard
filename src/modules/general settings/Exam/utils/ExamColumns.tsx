import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";

const useExamColumns = (): ColumnsType<any> => {
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
      title: "Class Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Description",
      dataIndex: "comment",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "3",
      title: "Class Teacher Name",
      dataIndex: "class_teacher",
      align: "center",
      render: (title) => (title ? title?.first_name : "N/A"),
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
                  title: "Update Exam",
                  content: "<UpdateClass record={record?.id} />",
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

export default useExamColumns;
