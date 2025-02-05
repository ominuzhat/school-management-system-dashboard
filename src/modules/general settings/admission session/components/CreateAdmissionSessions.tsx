import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateAdmissionSessionMutation } from "../api/admissionSessionEndPoints";
import { IAdmissionSession } from "../type/admissionSessionType";
const { Option } = Select;

const CreateAdmissionSessions = () => {
  const [create, { isLoading, isSuccess }] =
    useCreateAdmissionSessionMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<IAdmissionSession>
              label="Session Name"
              name="name"
              rules={[{ required: true, message: "Session Name" }]}
            >
              <Input placeholder="Session Name" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<IAdmissionSession> label="Session Status" name="status">
              <Select placeholder="Select status">
                <Option value="open">Open</Option>
                <Option value="closed">Closed</Option>
                <Option value="on_hold">On Hold</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateAdmissionSessions;
