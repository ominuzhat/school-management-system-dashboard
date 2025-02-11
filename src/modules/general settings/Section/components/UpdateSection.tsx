import { useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, Switch } from "antd";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import {
  useGetSingleSectionQuery,
  useUpdateSectionMutation,
} from "../api/sectionEndPoints";
import { ICreateSection, IGetSection } from "../types/sectionTypes";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";

const UpdateSection = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: GetClassData } = useGetClassesQuery({});
  const { data: singleData } = useGetSingleSectionQuery(record);
  const [updateClass, { isLoading }] = useUpdateSectionMutation();
  const { data: GetSessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });

  useEffect(() => {
    if (singleData?.data) {
      const sectionData = singleData?.data as unknown as IGetSection;
      form.setFieldsValue({
        name: sectionData.name,
        capacity: sectionData.capacity,
        is_active: sectionData.is_active,
        grade_level: sectionData.grade_level?.id,
        session: sectionData.session?.id,
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
              label="Session "
              name="session"
              rules={[{ required: true, message: "Select Session " }]}
            >
              <Select placeholder="Select Session" className="w-full">
                {Array.isArray(GetSessionData?.data) &&
                  GetSessionData?.data?.map((data: any, index: number) => (
                    <Select.Option key={index} value={data?.id}>
                      {data?.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Class "
              name="grade_level"
              rules={[{ required: true, message: "Select Class " }]}
            >
              <Select placeholder="Select Class" className="w-full">
                {Array.isArray(GetClassData?.data) &&
                  GetClassData?.data?.map((data: any, index: number) => (
                    <Select.Option key={index} value={data?.id}>
                      {data?.name}
                    </Select.Option>
                  ))}
              </Select>
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

          <Col>
            <Form.Item<ICreateSection>
              label="Active"
              name="is_active"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
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
