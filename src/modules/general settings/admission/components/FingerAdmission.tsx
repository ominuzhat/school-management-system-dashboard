import { Col, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateFingerAdmissionMutation } from "../api/admissionEndPoints";

const FingerAdmission = ({ record }: any) => {
  const [createFingerAdmission, { isLoading, isSuccess }] =
    useCreateFingerAdmissionMutation();

  const onFinish = (values: any): void => {
    createFingerAdmission({ id: record, data: values });
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item
              label="Hand"
              name="hand"
              rules={[{ required: true, message: "Hand" }]}
            >
              <Select placeholder="Select Hand" className="w-full">
                <Select.Option value="left">Left</Select.Option>
                <Select.Option value="right">Right</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item
              label="Finger"
              name="finger"
              rules={[{ required: true, message: "Finger" }]}
            >
              <Select placeholder="Select Finger" className="w-full">
                <Select.Option value="thumb">Thumb</Select.Option>
                <Select.Option value="index">Index</Select.Option>
                <Select.Option value="middle">Middle</Select.Option>
                <Select.Option value="ring">Ring</Select.Option>
                <Select.Option value="pinky">Pinky</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FingerAdmission;
