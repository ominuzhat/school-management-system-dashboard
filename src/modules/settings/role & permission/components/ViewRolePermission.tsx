import { useParams } from "react-router-dom";
import { useGetSingleRolePermissionQuery } from "../api/rolePermissionEndPoints";
import { Badge, Col, Row, Table } from "antd";
import usersRoleColumn from "../utils/usersRoleColumn";
import permissionColumn from "../utils/permissionsColumn";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";

const ViewRolePermission = () => {
  const { roleId } = useParams();

  const { data, isLoading } = useGetSingleRolePermissionQuery(Number(roleId));

  const { name, users, permissions } = data?.data || {};

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <h1 className="my-5">
        <span className="font-semibold">Role Name :</span> {name}
      </h1>

      <Row gutter={[16, 16]}>
        <Col lg={users && users.length > 10 ? 24 : 12}>
          <Badge.Ribbon text="Users" placement="start">
            <Table
              loading={isLoading}
              pagination={false}
              dataSource={users}
              columns={usersRoleColumn()}
            />
          </Badge.Ribbon>
        </Col>
        <Col
          lg={
            users && users.length > 10 && permissions && permissions.length > 10
              ? 24
              : 12
          }
        >
          <Badge.Ribbon text="Permissions" placement="start">
            <Table
              loading={isLoading}
              pagination={false}
              dataSource={permissions}
              columns={permissionColumn()}
            />
          </Badge.Ribbon>
        </Col>
      </Row>
    </div>
  );
};

export default ViewRolePermission;
