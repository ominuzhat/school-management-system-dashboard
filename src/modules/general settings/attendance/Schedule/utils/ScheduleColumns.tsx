import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { useDeleteSchedulesMutation } from "../api/scheduleEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import { showModal } from "../../../../../app/features/modalSlice";
import DeleteButton from "../../../../../common/CommonAnt/Button/DeleteButton";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import {
  moduleNames,
  actionNames,
} from "../../../../../utilities/permissionConstant";
import UpdateLeave from "../components/UpdateSchedule";
import dayjs from "dayjs";

const useScheduleColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const [deleteItem] = useDeleteSchedulesMutation();

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionleave,
    actionNames.change
  );

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionleave,
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
      title: "Shift Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "-"),
    },

    {
      key: "2",
      title: "Start Time",
      dataIndex: "start_time",
      align: "center",
      render: (time) => {
        return time ? dayjs(time, "HH:mm:ss").format("h:mm A") : "-"; // Format in 12-hour format
      },
    },
    {
      key: "3",
      title: "End Time",
      dataIndex: "end_time",
      align: "center",
      render: (time) => {
        return time ? dayjs(time, "HH:mm:ss").format("h:mm A") : "-"; // Format in 12-hour format
      },
    },
    {
      key: "4",
      title: "Flexibility (In Minutes)",
      dataIndex: "flexible",
      align: "center",
      render: (title) => (title ? title : title),
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "is_active",
      align: "center",
      render: (title) =>
        title ? (
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
                    title: "Update Leave",
                    content: <UpdateLeave record={record?.id} />,
                  })
                )
              }
            />
          )}
          {/* <ViewButton to={`student-view/1`} />
          <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}

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

export default useScheduleColumns;
