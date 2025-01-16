import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateClassesMutation } from "../api/classesEndPoints";

const CreateClass = () => {
  const [create, { isLoading, isSuccess }] = useCreateClassesMutation();

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    console.log("Form Values Submitted:", values);

    create(formData);
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
          <Col lg={8}>
            <Form.Item
              label="Class Name"
              name="name"
              rules={[{ required: true, message: "Class Name is required!" }]}
            >
              <Input placeholder="Enter Class Name" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item
              label="Select Class Teacher"
              name="class_teacher"
              rules={[
                {
                  required: true,
                  message: "Class Teacher selection is required!",
                },
              ]}
            >
              <Select placeholder="Select Class Teacher" className="w-full">
                {/* Replace with dynamic data */}
                <Select.Option value={0}>Teacher 0</Select.Option>
                <Select.Option value={1}>Teacher 1</Select.Option>
                <Select.Option value={2}>Teacher 2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateClass;
