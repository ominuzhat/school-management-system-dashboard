import { Tabs } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import FailCriteria from "../components/FailCriteria";
import GradeCriteria from "../components/GradeCriteria";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

const GradeMarkPage = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradescale,
    actionNames.add
  );

  return (
    <div>
      <div className="my-6">
        <BreadCrumb />
      </div>

      <div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Grade",
              key: "1",
              children: (
                <>
                  {createPermission ? <GradeCriteria /> : <NoPermissionData />}
                </>
              ),
            },

            {
              label: "Fail",
              key: "2",
              children: (
                <>
                  {createPermission ? <FailCriteria /> : <NoPermissionData />}
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default GradeMarkPage;
