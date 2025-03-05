import { Col, Input, Row } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateTermMutation } from "../api/termEndPoints";

const CreateTerm = () => {
  const [create, { isLoading, isSuccess }] = useCreateTermMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ name: "" }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item
              label="Term Name"
              name="name"
              rules={[{ required: true, message: "Term Name is required!" }]}
            >
              <Input placeholder="Enter Term Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTerm;
