import { Card, Tabs, TabsProps } from "antd";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import Migration from "../Components/Migration";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";

const ResultMigrationPage = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.exam,
    actionNames.add
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-center w-full">
          <span>Migration</span>
        </div>
      ),
      children: <Migration />,
    },
    {
      key: "2",
      label: (
        <div className="flex justify-center w-full">
          <span>Rollback</span>
        </div>
      ),
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div className="p-6">
      <Card
        className="rounded-lg shadow-xl border-0 w-full"
        headStyle={{ borderBottom: "none" }}
      >
        {createPermission ? (
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={(key) => console.log(key)}
            className="w-full "
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default ResultMigrationPage;
