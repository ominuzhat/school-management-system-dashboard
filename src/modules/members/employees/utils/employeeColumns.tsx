import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import UpdateEmployee from "../components/UpdateEmployee";

const useEmployeeColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

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
      dataIndex: "first_name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "2",
      title: "User Name",
      dataIndex: "user",
      align: "center",
      render: (user) => (user ? user.username : "N/A"),
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      align: "center",
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
      render: (department) => (department ? department : "N/A"),
    },
    {
      key: "7",
      title: "Hire Date",
      dataIndex: "hire_date",
      align: "center",
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
          <ViewButton to={`employee-view/${record?.id}`} />
        </Space>
      ),
    },
  ];
};

export default useEmployeeColumns;
