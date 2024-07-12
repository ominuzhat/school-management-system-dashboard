import { Form } from "../../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import { Col, Input, Row, Select } from "antd";
import {
  HarmonyOSOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";

const CreateClientCategoryModal = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "restaurant_logo" &&
        Array.isArray(value) &&
        value[0]?.originFileObj
      ) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    create(formData);
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={[]}
      >
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item<any>
              label="Enter Category Name"
              name="dueDate"
              rules={[
                { required: true, message: "Input your Enter Category Name!" },
              ]}
            >
              <Input placeholder="Employee Enter Category Name." />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any>
              label="Category Prefix"
              name="dueDate"
              rules={[
                { required: true, message: "Input your Category Prefix!" },
              ]}
            >
              <Input placeholder="Employee Category Prefix." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateClientCategoryModal;
