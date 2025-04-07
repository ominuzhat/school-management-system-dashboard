import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateSubjects from "../components/UpdateSubject";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";

const useSubjectColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
    actionNames.change
  );
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
      title: "Subject Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      key: "2",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level.name : "N/A"),
      sorter: (a, b) =>
        (a.grade_level?.name || "").localeCompare(b.grade_level?.name || ""),
    },

    {
      key: "3",
      title: "Class Teacher",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) =>
        grade_level?.class_teacher
          ? `${grade_level.class_teacher?.first_name} ${grade_level.class_teacher?.last_name}`
          : "N/A",
      sorter: (a, b) => {
        const teacherA = a.grade_level?.class_teacher
          ? `${a.grade_level.class_teacher?.first_name} ${a.grade_level.class_teacher?.last_name}`
          : "";
        const teacherB = b.grade_level?.class_teacher
          ? `${b.grade_level.class_teacher?.first_name} ${b.grade_level.class_teacher?.last_name}`
          : "";
        return teacherA.localeCompare(teacherB);
      },
    },

    {
      key: "4",
      title: "Marks",
      dataIndex: "marks",
      align: "center",
      render: (title) => (title ? <Tag color="green">{title}</Tag> : "N/A"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
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
          )}
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
