import { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import {
  useGetSingleSectionQuery,
  useUpdateSectionMutation,
} from "../api/sectionEndPoints";
import { ICreateSection, IGetSection } from "../types/sectionTypes";

const UpdateSection = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: singleData } = useGetSingleSectionQuery(record);
  const [updateClass, { isLoading }] = useUpdateSectionMutation();

  useEffect(() => {
    if (singleData?.data) {
      const sectionData = singleData?.data as unknown as IGetSection;
      form.setFieldsValue({
        name: sectionData.name,
        capacity: sectionData.capacity,
        // is_active: sectionData.is_active,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    updateClass({ id: record, data: values });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Section
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateSection;
