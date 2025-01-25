import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useNavigate } from "react-router-dom";

const useAdmissionColumns = (): ColumnsType<any> => {
  const navigate = useNavigate();

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
      title: "Student Name",
      dataIndex: "student",
      align: "center",
      render: (title) =>
        title ? title?.first_name + " " + title?.last_name : "N/A",
    },
    {
      key: "22",
      title: "User Name",
      dataIndex: "student",
      align: "center",
      render: (title) => (title ? title?.user?.username : "N/A"),
    },
    {
      key: "2",
      title: "Admission Number",
      dataIndex: "registration_number",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Admission Date",
      dataIndex: "admission_date",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "4",
      title: "Session",
      dataIndex: "session",
      align: "center",
      render: (title) => (title ? capitalize(title.name) : "N/A"),
    },
    {
      key: "5",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "6",
      title: "Fee Type",
      dataIndex: "fee_type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },

    {
      key: "7",
      title: "One Time Fee",
      dataIndex: "one_time_fee",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "8",
      title: "Monthly Fee",
      dataIndex: "monthly_fee",
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
              navigate(`/admission/update-admission/${record?.id}`)
            }
          />

          <ViewButton to={`admission-view/${record?.id}`} />

          {/* <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useAdmissionColumns;
