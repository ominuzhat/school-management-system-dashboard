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

const RolePermissionPage = () => {
  const dispatch = useDispatch();
  const { data: rolePermissionData, isLoading } = useGetRolePermissionQuery({});

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
        </Row>
      </Card>

      <Card>
        <Table
          loading={isLoading}
          total={dataLength}
          dataSource={dataSource}
          columns={RolePermissionColumn()}
        />
      </Card>
    </div>
  );
};

export default RolePermissionPage;
