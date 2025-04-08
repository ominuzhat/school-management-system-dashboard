import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import CreateRole from "../components/CreateRole";
import { Table } from "../../../../common/CommonAnt";
import RolePermissionColumn from "../utils/RolePermissionColumn";
import { useGetRolePermissionQuery } from "../api/rolePermissionEndPoints";
import { IRole } from "../type/rolePermissionTypes";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const RolePermissionPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = RolePermissionColumn();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.role,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.role,
    actionNames.add
  );

  const {
    data: rolePermissionData,
    isLoading,
    isFetching,
    refetch,
  } = useGetRolePermissionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (rolePermissionData?.data as IRole[] | undefined)?.length ?? 0;

  const dataSource = (rolePermissionData?.data as IRole[] | undefined) ?? [];

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Role",
                      content: <CreateRole />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Role
              </Button>
            </Col>
          )}
        </Row>
      </Card>

      {viewPermission ? (
        <Card>
          <Table
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={dataLength}
            dataSource={dataSource}
            columns={columns}
          />
        </Card>
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default RolePermissionPage;
