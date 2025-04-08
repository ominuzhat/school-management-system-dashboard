import { Space } from "antd";

import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import EditRolePermission from "../components/EditRolePermission";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";

const RolePermissionColumn = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.role,
    actionNames.change
  );

  return [
    {
      key: "0",
      title: "ID",
      align: "center",
      dataIndex: "id",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "1",
      title: "Role Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
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
                    title: "Update Role Permissions",
                    content: <EditRolePermission record={record} />,
                  })
                )
              }
            />
          )}

          <ViewButton to={`/role-permission/${record?.id}`} />
        </Space>
      ),
    },
  ];
};

export default RolePermissionColumn;
