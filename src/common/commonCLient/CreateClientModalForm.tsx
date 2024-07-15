import { Card, Col, Input, Row, Select, Form as AntForm } from "antd";
import { useCreateRestaurantMutation } from "../../modules/Restaurants/api/restaurantsEndpoint";
import React from "react";
import Form from "../CommonAnt/Form";

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

const CreateClientModalForm = () => {
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
        <Card>
          <Row gutter={8}>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Client Category"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Client Category"
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
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Client Type"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Client Type"
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
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Client Name"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Client Name" type="text" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Email"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input placeholder="Email" type="email" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Gender"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "1", label: "Male" },
                    { value: "2", label: "Female" },
                    { value: "3", label: "others" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Mobile"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Mobile!",
                  },
                ]}
              >
                <Input addonBefore="+88" placeholder="Mobile" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Address"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                  },
                ]}
              >
                <Input placeholder="Address" type="text" />
              </Form.Item>
            </Col>

            <Col lg={6}>
              <Form.Item<FieldType>
                label="Source"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Source" />
              </Form.Item>
            </Col>

            <Col lg={6}>
              <Form.Item<FieldType>
                label="Walking Customer"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Walking Customer"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "1", label: "Yes" },
                    { value: "2", label: "No" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card className="mt-5">
          <Row gutter={8}>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Designation"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Designation!",
                  },
                ]}
              >
                <Input placeholder="Designation" type="text" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Trade License No"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Trade License No!",
                  },
                ]}
              >
                <Input placeholder="Trade License No" type="text" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Opening Balance Type"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Opening Balance Type"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "1", label: "Due" },
                    { value: "2", label: "Advance" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Credit Limit"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Credit Limit!",
                  },
                ]}
              >
                <Input placeholder="Credit Limit" type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </React.Fragment>
  );
};

export default CreateClientModalForm;
