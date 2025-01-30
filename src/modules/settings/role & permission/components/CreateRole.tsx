import { Col, Input, Row } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateRoleMutation } from "../api/rolePermissionEndPoints";

const CreateRole = () => {
  const [create, { isLoading, isSuccess }] = useCreateRoleMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<any>
              label="Role Name"
              name="name"
              rules={[{ required: true, message: "Role Name" }]}
            >
              <Input placeholder="Role Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateRole;
