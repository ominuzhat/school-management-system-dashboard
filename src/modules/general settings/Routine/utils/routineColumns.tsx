import { Space } from "antd";

import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useNavigate } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import { useDeleteRoutineMutation } from "../api/routineEndPoints";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";

const useRoutineColumns = (): ColumnsType<any> => {
  const navigate = useNavigate();

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.routine,
    actionNames.change
  );
  const [deleteItem] = useDeleteRoutineMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.routine,
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
      title: "Class Name",
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },
    {
      key: "2",
      title: "Section Name",
      dataIndex: "section",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },
    {
      key: "3",
      title: "Session Name",
      dataIndex: "session",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() => navigate(`/routine/update/${record?.id}`)}
            />
          )}

          <ViewButton to={`/routine/view/${record?.id}`} />

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

export default useRoutineColumns;
