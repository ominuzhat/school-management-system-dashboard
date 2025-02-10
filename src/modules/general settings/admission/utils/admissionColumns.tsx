import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useNavigate } from "react-router-dom";
import { IAdmissionStatus } from "../type/admissionType";

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
      sorter: (a, b) =>
        a.student?.user?.username?.localeCompare(
          b.student?.user?.username || ""
        ),
      render: (student) => student?.user?.username || "N/A",
    },
    {
      key: "2",
      title: "Admission Number",
      dataIndex: "registration_number",
      align: "center",
      sorter: (a, b) =>
        (a.registration_number || "").localeCompare(
          b.registration_number || ""
        ),
      render: (registration_number) => registration_number || "N/A",
    },
    {
      key: "3",
      title: "Admission Date",
      dataIndex: "admission_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.admission_date || 0).getTime() -
        new Date(b.admission_date || 0).getTime(),
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "4",
      title: "Session",
      dataIndex: "session",
      align: "center",
      sorter: (a, b) =>
        (a.session?.name || "").localeCompare(b.session?.name || ""),
      render: (session) => (session?.name ? capitalize(session.name) : "N/A"),
    },
    {
      key: "5",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "5",
      title: "Shift",
      dataIndex: "shift",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "6",
      title: "Fee Type",
      dataIndex: "fee_type",
      align: "center",
      sorter: (a, b) => (a.fee_type || "").localeCompare(b.fee_type || ""),
      render: (fee_type) => (fee_type ? capitalize(fee_type) : "N/A"),
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
      key: "8",
      title: "Due",
      dataIndex: "due_amount",
      align: "center",
      render: (title) => (title ? <Tag color="red">{title}</Tag> : "N/A"),
    },
    {
      key: "9",
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: IAdmissionStatus) => {
        const statusColors: Record<IAdmissionStatus, string> = {
          pending: "blue",
          approved: "green",
          rejected: "red",
          passed: "purple",
          withdrawn: "orange",
          failed: "volcano",
          on_hold: "gold",
        };

        return <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton onClick={() => navigate(`/admission/${record?.id}`)} />

          <ViewButton to={`/admission/admission-view/${record?.id}`} />

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
