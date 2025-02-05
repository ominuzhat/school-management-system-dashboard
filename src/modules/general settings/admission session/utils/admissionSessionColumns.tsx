import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateAdmissionSessions from "../components/UpdateAdmissionSessions";

const useAdmissionSessionsColumns = (): ColumnsType<any> => {
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
      title: "Session Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "1",
      title: "Session Status",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        let color = "";

        switch (status) {
          case "open":
            color = "green"; // Open status is green
            break;
          case "closed":
            color = "red"; // Closed status is red
            break;
          case "on_hold":
            color = "orange"; // On Hold status is orange
            break;
          default:
            color = "gray"; // Default color if status is not found
        }

        return status ? (
          <Tag color={color}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        ) : (
          "N/A"
        );
      },
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
                  title: "Update Admission Session",
                  content: <UpdateAdmissionSessions record={record?.id} />,
                })
              )
            }
          />
          {/* <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useAdmissionSessionsColumns;
