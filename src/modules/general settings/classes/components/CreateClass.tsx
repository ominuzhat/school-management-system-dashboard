import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateServiceMutation } from "../../../service/api/serviceEndpoints";

const CreateClass = () => {
  const [create, { isLoading, isSuccess }] = useCreateServiceMutation();

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "images") {
          // Handle the images array specifically
          value.forEach((file) => {
            if (file?.originFileObj) {
              formData.append(key, file.originFileObj);
            }
          });
        } else if (typeof value[0] === "object" && value[0] !== null) {
          // Handle faqs or other objects in arrays
          value.forEach((item, index) => {
            formData.append(`${key}[${index}][question]`, item.question);
            formData.append(`${key}[${index}][answer]`, item.answer);
          });
        } else {
          // Handle keyPoints or other arrays of strings
          value.forEach((item) => {
            formData.append(key, item);
          });
        }
      } else if (value instanceof File || value instanceof Blob) {
        // If the value is a file or blob
        formData.append(key, value);
      } else {
        // For regular string/number values
        formData.append(key, value as string | Blob);
      }
    });

    console.log("ascfasd", values);

    create(formData);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ keyPoints: [""], faqs: [{}] }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<any>
              label="Class Name"
              name="name"
              rules={[{ required: true, message: "Class Name!" }]}
            >
              <Input placeholder="Class Name." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<any>
              label="Monthly Tuition Fees"
              name="registration"
              rules={[{ required: true, message: "Monthly Tuition Fees" }]}
            >
              <Input placeholder="Monthly Tuition Fees" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<any>
              label="Select Class Teacher"
              name="registration"
              rules={[{ required: true, message: "Select Class Teacher" }]}
            >
              <Select placeholder="Select Class Teacher" className="w-full">
                {/* {categoryData?.data?.map((category) => (
                    <Select.Option key={category.id} value={category?.id}>
                        {category?.name}
                    </Select.Option>
                    ))} */}

                <Select.Option value={1}>1</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateClass;
