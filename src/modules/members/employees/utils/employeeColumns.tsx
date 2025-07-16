import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import UpdateEmployee from "../components/UpdateEmployee";
import { useGetDepartmentQuery } from "../../../general settings/Department/api/departmentEndPoints";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import { useDeleteEmployeeMutation } from "../api/employeeEndPoints";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import FingerAdmission from "../../../general settings/admission/components/FingerAdmission";
import { FaFingerprint } from "react-icons/fa6";

const useEmployeeColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.employee,
    actionNames.change
  );

  const { data: departmentList } = useGetDepartmentQuery({});

  const departmentFilters = Array.isArray(departmentList?.data)
    ? departmentList.data.map((dept: any) => ({
        text: dept.name,
        value: dept.name,
      }))
    : [];

  const [deleteItem] = useDeleteEmployeeMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.employee,
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
      title: "Full Name",
      dataIndex: "first_name",
      align: "center",
      render: (_: any, record: any) =>
        `${record?.first_name} ${record?.last_name}`,
    },
    {
      key: "2",
      title: "User Name",
      dataIndex: "user",
      align: "center",
      sorter: (a, b) => a.user?.username?.localeCompare(b.user?.username || ""),
      render: (user) => (user ? user.username : "N/A"),
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      align: "center",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
      render: (email) => (email ? email : "N/A"),
    },
    {
      key: "4",
      title: "Phone",
      dataIndex: "phone_number",
      align: "center",
      render: (phone_number) => (phone_number ? phone_number : "N/A"),
    },
    {
      key: "5",
      title: "Position",
      dataIndex: "position",
      align: "center",
      render: (position) => (position ? position : "N/A"),
    },
    {
      key: "66",
      title: "Base Salary",
      dataIndex: "base_salary",
      align: "center",
      render: (Base_salary) => (Base_salary ? Base_salary : "N/A"),
    },
    {
      key: "6",
      title: "Department",
      dataIndex: ["department", "name"],
      align: "center",
      showSorterTooltip: { target: "full-header" },
      filters: departmentFilters.length > 0 ? departmentFilters : undefined,
      onFilter: (value, record) => record?.department?.name === value,
      // sorter: (a, b) => a?.department?.name?.localeCompare(b?.department?.name),
      render: (department) => (department ? department : "N/A"),
    },
    {
      key: "7",
      title: "Hire Date",
      dataIndex: "hire_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.hire_date || 0).getTime() -
        new Date(b.hire_date || 0).getTime(),
      render: (hire_date) => (hire_date ? hire_date : "N/A"),
    },
    {
      key: "8",
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
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Update Employee",
                    content: <UpdateEmployee records={record} />,
                  })
                )
              }
            />
          )}

          <ViewButton to={`employee-view/${record?.id}`} />

          <Button
            title="Start Enrollment"
            size="small"
            type="default"
            style={{
              color: "green",
              // background: "#3892E3",
              border: "1px solid green",
            }}
            onClick={() =>
              dispatch(
                showModal({
                  title: "Start Enrollment",
                  content: (
                    <FingerAdmission
                      record={record?.id}
                      pathType={window.location.pathname}
                    />
                  ),
                })
              )
            }
          >
            <FaFingerprint />
          </Button>

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

export default useEmployeeColumns;
