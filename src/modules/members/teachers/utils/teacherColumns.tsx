import { Space, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import UpdateTeacher from "../components/UpdateTeacher";

const useTeacherColumns = (): ColumnsType<any> => {
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
      render: (name) => (name ? name?.username : "N/A"),
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
      title: "Hire Date",
      dataIndex: "hire_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.hire_date || 0).getTime() -
        new Date(b.hire_date || 0).getTime(),
      render: (hire_date) => (hire_date ? hire_date : "N/A"),
    },
    {
      key: "6",
      title: "Base Salary",
      dataIndex: "base_salary",
      align: "center",
      render: (base_salary) => (base_salary ? base_salary : "N/A"),
    },

    {
      key: "7",
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
                  title: "Update Teacher",
                  content: <UpdateTeacher record={record} />,
                })
              )
            }
          />
          <ViewButton to={`teacher-view/${record?.id}`} />
          {/* <DeleteButton 
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useTeacherColumns;
