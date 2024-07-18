import { Col, Input, Row, Select, Form as AntForm } from "antd";
import React from "react";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import { Form } from "../../../../common/CommonAnt";

type FieldType = {
  paxName: string;
  ppNum: string;
  client: string;
  ppIssueDate: string;
  DOB: string;
  ppExpiryDate: string;
  paxNum: number;
  gender: string;
  visitedCountry: string;
  ppReceived: string;
  policeClearanceReceived: string;
  policeClearanceIssueDate: string;
  walkingCustomer: string;
  dueDate: string;
};

const CreateAccountModal = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

  const [form] = AntForm.useForm();

  const gender = AntForm.useWatch("gender", form);

  console.log("aaa", gender);

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
    <React.Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={[]}
      >
        <Row gutter={8}>
          <Col lg={8}>
            <Form.Item<FieldType>
              label="Account Type"
              name="dueDate"
              rules={[{ required: true, message: "Input your Account Type!" }]}
            >
              <Select
                showSearch
                placeholder="Account Type"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "1", label: "Jack" },
                  { value: "2", label: "Lucy" },
                  { value: "3", label: "Tom" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType>
              label="Account Name"
              name="dueDate"
              rules={[{ required: true, message: "Input your Account Name!" }]}
            >
              <Input placeholder="Account Name" type="text" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType>
              label="Current Last Balance"
              name="dueDate"
              rules={[
                {
                  required: true,
                  message: "Input your Current Last Balance!",
                },
              ]}
            >
              <Input placeholder="Current Last Balance" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateAccountModal;
