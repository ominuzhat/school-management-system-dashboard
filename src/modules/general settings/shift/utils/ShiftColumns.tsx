import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateShift from "../components/UpdateShift";
import moment from "moment";
import { GetPermission } from "../../../../utilities/permission";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";

const useShiftColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.shift,
    actionNames.change
  );

  // const [deleteItem] = useDeleteShiftMutation();

  // const deletePermission = GetPermission(
  //   dashboardData?.data?.permissions,
  //   moduleNames.shift,
  //   actionNames.delete
  // );

  // const handleDelete = async (id: any) => {
  //   try {
  //     await deleteItem({ id }).unwrap();
  //   } catch (error) {
  //     console.error("Failed to delete item:", error);
  //   }
  // };

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
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "2",
      title: "Start Time",
      dataIndex: "start_time",
      align: "center",
      render: (time) => {
        return time ? moment(time, "HH:mm:ss").format("h:mm A") : "N/A"; // Format in 12-hour format
      },
    },
    {
      key: "3",
      title: "End Time",
      dataIndex: "end_time",
      align: "center",
      render: (time) => {
        return time ? moment(time, "HH:mm:ss").format("h:mm A") : "N/A"; // Format in 12-hour format
      },
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
                    title: "Update Shift",
                    content: <UpdateShift record={record?.id} />,
                  })
                )
              }
            />
          )}
          {/* {deletePermission && (
            <DeleteButton
              onConfirm={() => handleDelete(record.id)}
            ></DeleteButton>
          )} */}
        </Space>
      ),
    },
  ];
};

export default useShiftColumns;
