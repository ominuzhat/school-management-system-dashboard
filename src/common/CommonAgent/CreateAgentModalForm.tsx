import { Card, Col, Input, Row } from "antd";
import { useCreateRestaurantMutation } from "../../modules/Restaurants/api/restaurantsEndpoint";
import { Form } from "../CommonAnt";
import React from "react";

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

const CreateAgentModalForm = () => {
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
    <React.Fragment>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={[]}
      >
        <Card>
          <Row gutter={8}>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Name"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Enter Your Name" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType>
                label="Commision Rate"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Enter Your Name" type="number" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType> label="Phone No" name="dueDate">
                <Input addonBefore="+088" placeholder="Phone No" type="text" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item<FieldType> label="Email" name="dueDate">
                <Input placeholder="Email" type="email" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </React.Fragment>
  );
};

export default CreateAgentModalForm;
