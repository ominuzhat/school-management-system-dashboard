import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";

import { useCreateSectionMutation } from "../api/sectionEndPoints";
import { ICreateSection } from "../types/sectionTypes";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { IClasses } from "../../classes/type/classesType";

const { Option } = Select;
const CreateSection = () => {
  const { data: classData } = useGetClassesQuery({});
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
              label="Class"
              name="grade_level"
              rules={[{ required: true, message: "Class" }]}
            >
              <Select className="w-full" placeholder="Select Class" allowClear>
                {Array.isArray(classData?.data) &&
                  classData.data.map((data: IClasses) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

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
