import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateClassesMutation } from "../api/classesEndPoints";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";

const CreateClass = () => {
  const [create, { isLoading, isSuccess }] = useCreateClassesMutation();
  const { data: teacherData } = useGetTeacherQuery({});

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ name: "", description: "", class_teacher: null }}
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
          <Col lg={12}>
            <Form.Item label="Select Class Teacher" name="class_teacher">
              <Select placeholder="Select Class Teacher" className="w-full">
                {teacherData?.data?.results?.map((teacher: any) => (
                  <Select.Option key={teacher.id} value={teacher.id}>
                    {teacher?.first_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateClass;
