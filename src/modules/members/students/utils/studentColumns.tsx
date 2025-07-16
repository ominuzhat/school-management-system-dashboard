import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";

import { useNavigate } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import { useDeleteStudentMutation } from "../api/studentEndPoints";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";

const useStudentColumns = (): ColumnsType<any> => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const [deleteCartItem] = useDeleteStudentMutation();

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.student,
    actionNames.change
  );
  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.student,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteCartItem({ id }).unwrap();
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
      title: "Full Name",
      dataIndex: "first_name",
      align: "left",
      width: "200px",
      render: (_: any, record: any) =>
        `${record?.first_name} ${record?.last_name}`,
    },
    {
      key: "2",
      title: "User ID",
      dataIndex: "user",
      align: "center",
      sorter: (a, b) => a.user?.username?.localeCompare(b.user?.username || ""),
      render: (user) => (user?.username ? user.username : "N/A"),
    },
    {
      key: "3",
      title: "Class",
      dataIndex: "current_grade_level",
      align: "center",
      render: (current_grade_level) =>
        current_grade_level ? current_grade_level?.name : "N/A",
    },
    {
      key: "55",
      title: "Section",
      dataIndex: "current_section",
      align: "center",

      render: (current_section) =>
        current_section ? current_section?.name : "N/A",
    },
    {
      key: "44",
      title: "Session",
      dataIndex: "current_session",
      align: "center",

      render: (current_session) =>
        current_session ? current_session?.name : "N/A",
    },
    {
      key: "66",
      title: "Shift",
      dataIndex: "current_shift",
      align: "center",
      render: (current_shift) => (current_shift ? current_shift?.name : "N/A"),
    },

    {
      key: "4",
      title: "Phone",
      dataIndex: "phone_number",
      align: "center",
      render: (phone_number) => (phone_number ? phone_number : "N/A"),
    },
    {
      key: "6",
      title: "Active",
      dataIndex: "is_active",
      align: "center",
      render: (is_active) =>
        is_active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() => navigate(`/students/update/${record.id}`)}
            />
          )}

          <ViewButton to={`student-view/${record?.id}`} />
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

export default useStudentColumns;
