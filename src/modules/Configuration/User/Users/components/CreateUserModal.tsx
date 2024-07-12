import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../../../Restaurants/api/restaurantsEndpoint";
import {
  HarmonyOSOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from "@ant-design/icons";

const CreateUserModal = () => {
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
          <Col lg={6}>
            <Form.Item<any>
              label="First Name"
              name="dueDate"
              rules={[{ required: true, message: "Input your First Name!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<any> label="Last Name" name="dueDate">
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<any>
              label="User Name"
              name="dueDate"
              rules={[{ required: true, message: "Input your User Name!" }]}
            >
              <Input placeholder="Employee User Name." />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<any>
              label="Email"
              name="dueDate"
              rules={[{ required: true, message: "Input your Email!" }]}
            >
              <Input placeholder="Enter Email" type="email" />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<any>
              label="Mobile"
              name="dueDate"
              rules={[{ required: true, message: "Input your Mobile!" }]}
            >
              <Input addonBefore="+88" placeholder="Mobile" type="number" />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item<any>
              label="User Role"
              name="dueDate"
              rules={[{ required: true, message: "Input your User Role!" }]}
            >
              <Select
                showSearch
                placeholder="Search User Role"
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: (
                      <p>
                        <ManOutlined /> Male{" "}
                      </p>
                    ),
                  },
                  {
                    value: "2",
                    label: (
                      <p>
                        <WomanOutlined /> Female
                      </p>
                    ),
                  },
                  {
                    value: "3",
                    label: (
                      <p>
                        <HarmonyOSOutlined /> Others{" "}
                      </p>
                    ),
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item<any>
              label="Password"
              name="dueDate"
              rules={[{ required: true, message: "Input your Password!" }]}
            >
              <Input.Password placeholder="Input password" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any>
              label="Confirm Password"
              name="dueDate"
              rules={[
                { required: true, message: "Input your Confirm Password!" },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateUserModal;
