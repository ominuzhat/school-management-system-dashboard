import { Col, Input, Row } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateDepartmentMutation } from "../api/departmentEndPoints";
import { ICreateDepartment } from "../types/departmentType";


const CreateDepartmentModal = () => {
  const [create, { isLoading, isSuccess }] =
    useCreateDepartmentMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateDepartment>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateDepartmentModal;
