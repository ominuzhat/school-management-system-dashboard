import { Col, Input, Row, Select, Switch } from "antd";
import { Form } from "../../../../common/CommonAnt";

import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useCreateSectionMutation } from "../api/sectionEndPoints";
import { ICreateSection } from "../types/sectionTypes";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";

const CreateSection = () => {
  const { data: GetClassData } = useGetClassesQuery({});
  const { data: GetSessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });
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
        initialValues={{ is_active: true }}
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
      </Form>
    </div>
  );
};

export default CreateSection;
