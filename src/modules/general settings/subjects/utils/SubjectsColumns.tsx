import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateSubjects from "../components/UpdateSubject";

const useSubjectColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  //   const [deleteCartItem] = useDeleteOrderItemMutation();

  //   const handleDelete = async (id: any) => {
  //     try {
  //       await deleteCartItem({ id }).unwrap();
  //       console.log("Item deleted successfully");
  //     } catch (error) {
  //       console.error("Failed to delete item:", error);
  //     }
  //   };

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
      title: "Marks",
      dataIndex: "marks",
      align: "center",
      render: (title) => (title ? <Tag color="green">{title}</Tag> : "N/A"),
    },

    {
      key: "3",
      title: "Class ",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level.name : "N/A"),
    },

    {
      key: "4",
      title: "Class Teacher ",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) =>
        grade_level.class_teacher
          ? grade_level.class_teacher?.first_name +
            grade_level.class_teacher?.last_name
          : "N/A",
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
                  title: "Update Subject",
                  content: <UpdateSubjects record={record?.id} />,
                })
              )
            }
          />
          {/* <ViewButton to={`student-view/1`} /> */}
          {/* <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useSubjectColumns;
