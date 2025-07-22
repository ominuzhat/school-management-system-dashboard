import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";
import { useDeleteResultMutation } from "../api/resultsEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import DeleteButton from "../../../../../common/CommonAnt/Button/DeleteButton";

const useResultsColumns = (): ColumnsType<any> => {
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const [deleteItem] = useDeleteResultMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.studentresult,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteItem({ id }).unwrap();
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
      title: "Exam Name",
      dataIndex: "exam",
      align: "center",
      render: (title) => (title ? title.name : "-"),
    },
    {
      key: "2",
      title: "Student Name",
      dataIndex: "admission",
      align: "center",
      render: (title) =>
        title ? title.student.first_name + " " + title.student.last_name : "-",
    },
    {
      key: "3",
      title: "Class",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.grade_level : "-"),
    },
    {
      key: "4",
      title: "Roll No.",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.roll : "-"),
    },

    {
      key: "5",
      title: "Grade",
      dataIndex: "grade",
      align: "center",
      render: (title) => (title ? title : "-"),
    },

    {
      key: "6",
      title: "Contribution Marks",
      dataIndex: "contribution_marks",
      align: "center",
      render: (title) => (title ? title : "-"),
    },
    {
      key: "7",
      title: "Total Marks",
      dataIndex: "total_marks",
      align: "center",
      render: (title) => (title ? title : "-"),
    },
    {
      key: "8",
      title: "Status",
      dataIndex: "is_passed",
      align: "center",
      render: (title) =>
        title ? <Tag color="green">PASS</Tag> : <Tag color="red">FAIL</Tag>,
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <ViewButton to={`view/${record?.id}`} />
          {deletePermission && (
            <DeleteButton
              onConfirm={() => handleDelete(record.id)}
            ></DeleteButton>
          )}
        </Space>
      ),
    },
  ];
};

export default useResultsColumns;
