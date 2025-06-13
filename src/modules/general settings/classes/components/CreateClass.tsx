import { Col, Input, Row } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateClassesMutation } from "../api/classesEndPoints";

const CreateClass = () => {
  const [create, { isLoading, isSuccess }] = useCreateClassesMutation();

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
              label="Class Name"
              name="name"
              rules={[{ required: true, message: "Class Name is required!" }]}
            >
              <Input placeholder="Enter Class Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateClass;
