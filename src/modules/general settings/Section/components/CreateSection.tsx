import { Col, Input, Row } from "antd";
import { Form } from "../../../../common/CommonAnt";

import { useCreateSectionMutation } from "../api/sectionEndPoints";
import { ICreateSection } from "../types/sectionTypes";

const CreateSection = () => {
  const [create, { isLoading, isSuccess }] = useCreateSectionMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        // initialValues={{ is_active: true }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Section Name"
              name="name"
              rules={[{ required: true, message: "Section Name" }]}
            >
              <Input placeholder="Section Name" />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: "Capacity" }]}
            >
              <Input placeholder="Capacity" type="number" />
            </Form.Item>
          </Col>

          {/* <Col>
            <Form.Item<ICreateSection>
              label="Active"
              name="is_active"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default CreateSection;
