import { Col, Input, Row, Form as AntForm, InputNumber } from "antd";
import { useCreateExamHallMutation } from "../api/examHallEndPoints";
import { Form } from "../../../../../common/CommonAnt";

const CreateExamHall = () => {
  const [create, { isLoading, isSuccess }] = useCreateExamHallMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          name: "",
          description: "",
          capacity: 0,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <AntForm.Item
              label="Class Name"
              name="name"
              rules={[{ required: true, message: "Class Name is required!" }]}
            >
              <Input placeholder="Enter Class Name" />
            </AntForm.Item>
          </Col>

          <Col lg={12}>
            <AntForm.Item
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: "Capacity is required!" }]}
            >
              <InputNumber
                placeholder="Enter Capacity"
     
                style={{ width: "100%" }}
              />
            </AntForm.Item>
          </Col>

          <Col lg={24}>
            <AntForm.Item label="Description" name="description">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </AntForm.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateExamHall;
