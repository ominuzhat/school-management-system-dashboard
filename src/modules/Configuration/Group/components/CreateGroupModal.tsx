import { Form } from "../../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import { Col, Input, Row, Select } from "antd";
import {
  HarmonyOSOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";

const CreateGroupModal = () => {
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
              label="Designation Name"
              name="dueDate"
              rules={[
                { required: true, message: "Input your Designation Name!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Search Group Type"
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
                        <ManOutlined /> Umrah{" "}
                      </p>
                    ),
                  },
                  {
                    value: "2",
                    label: (
                      <p>
                        <WomanOutlined /> Hajj
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
          <Col lg={12}>
            <Form.Item<any>
              label="Group Name"
              name="dueDate"
              rules={[{ required: true, message: "Input your Group Name!" }]}
            >
              <Input placeholder="Employee Group Name." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateGroupModal;
