import { Button, Popconfirm, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateAdmissionSessions from "../components/UpdateAdmissionSessions";
import {
  useClosedAdmissionSessionMutation,
  useOpenAdmissionSessionMutation,
} from "../api/admissionSessionEndPoints";

const useAdmissionSessionsColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const [openSession] = useOpenAdmissionSessionMutation();
  const [deleteCartItem] = useClosedAdmissionSessionMutation();

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

          <Popconfirm
            title="Are you sure to Closed this item?"
            onConfirm={async () => {
              try {
                await deleteCartItem({ session: record?.id } as any).unwrap();
                console.log("Item Closed successfully");
              } catch (error) {
                console.error("Failed to delete item:", error);
              }
            }}
            onCancel={() => console.log("Cancelled")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" size="small" danger>
              Close
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Are you sure to Open this item?"
            onConfirm={async () => {
              try {
                await openSession({ session: record?.id } as any).unwrap();
                console.log("Item Opened successfully");
              } catch (error) {
                console.error("Failed to Open item:", error);
              }
            }}
            onCancel={() => console.log("Cancelled")}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="default"
              size="small"
              style={{ color: "green", border: "1px solid green" }}
            >
              Open
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

export default useAdmissionSessionsColumns;
