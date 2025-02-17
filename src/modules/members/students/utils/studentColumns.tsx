import { Button, Space, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";

import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import dayjs from "dayjs";

const useStudentColumns = (): ColumnsType<any> => {
  // const dispatch = useDispatch();
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
      render: (user) => (user?.username ? user.username : "N/A"),
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
      title: "Enrollment Date",
      dataIndex: "enrollment_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.enrollment_date || 0).getTime() -
        new Date(b.enrollment_date || 0).getTime(),
      render: (enrollment_date) =>
        enrollment_date ? dayjs(enrollment_date).format("DD MMM YYYY") : "N/A",
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
          <Link to={`/students/update/${record.id}`}>
            <Button
              title="Edit"
              size="small"
              type="default"
              style={{
                color: "#FFA500",
                border: "1px solid #FFA500",
              }}
            >
              <FaEdit />
            </Button>
          </Link>

          <ViewButton to={`student-view/${record?.id}`} />
          {/* <DeleteButton 
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useStudentColumns;
