import { Space, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import {
  useDeleteTicketMutation,
  useUpdateStatusTicketMutation,
} from "../api/ticketEndPoints";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import { Popconfirm, Button } from "antd";
const useTicketColumns = (): ColumnsType<any> => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const [updateStatus] = useUpdateStatusTicketMutation({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.teacher,
    actionNames.change
  );

  const [deleteTicketItem] = useDeleteTicketMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.teacher,
    actionNames.delete
  );

  const handleUpdateStatus = async (id: any) => {
    try {
      const formData = new FormData();
      formData.append("status", "closed");

      await updateStatus({ id, data: formData }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteTicketItem({ id }).unwrap();
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
      title: "Title",
      dataIndex: "title",
      align: "left",
    },
    {
      key: "2",
      title: "Ticket Type",
      dataIndex: "ticket_type",
      align: "center",
      sorter: (a, b) => a.ticket_type.localeCompare(b.ticket_type || ""),
      render: (name) => (name ? capitalize(name) : "-"),
    },

    {
      key: "4",
      title: "Priority",
      dataIndex: "priority",
      align: "center",
      render: (priority: string) => {
        if (!priority) return "-";

        const priorityMap: Record<string, { color: string; label: string }> = {
          critical: { color: "red", label: "Critical" },
          high: { color: "volcano", label: "High" },
          medium: { color: "gold", label: "Medium" },
          low: { color: "green", label: "Low" },
        };

        const mapped = priorityMap[priority.toLowerCase()] || {
          color: "default",
          label: priority,
        };

        return <Tag color={mapped.color}>{mapped.label}</Tag>;
      },
    },

    {
      key: "7",
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: string) => {
        let color = "default";
        let label = status;

        switch (status) {
          case "open":
            color = "green";
            label = "Open";
            break;
          case "in_progress":
            color = "blue";
            label = "In Progress";
            break;
          case "resolved":
            color = "gold";
            label = "Resolved";
            break;
          case "closed":
            color = "red";
            label = "Closed";
            break;
          default:
            color = "gray";
            label = status;
        }

        return <Tag color={color}>{label}</Tag>;
      },
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {/* {updatePermission && (
            <EditButton
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Update Ticket",
                    content: <UpdateTicket record={record} />,
                  })
                )
              }
            />
          )} */}
          {updatePermission && (
            <Popconfirm
              title="Are you sure you want to close this ticket?"
              onConfirm={() => handleUpdateStatus(record.id)}
              okText="Yes"
              cancelText="No"
              disabled={record.status === "closed"}
            >
              <Button
                danger
                type="primary"
                disabled={record.status === "closed"}
                size="small"
              >
                Close
              </Button>
            </Popconfirm>
          )}

          <ViewButton to={`/ticket/view/${record?.id}`} />

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

export default useTicketColumns;
