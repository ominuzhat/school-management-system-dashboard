import { Col, Input, Row, Select, Form as AntForm } from "antd";
import React from "react";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import { Form } from "../../../../common/CommonAnt";
import { DatePickerWithOptionalToday } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";

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

const CreateBalanceTransfer = () => {
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
              label="Transfer From"
              name="dueDate"
              rules={[{ required: true, message: "Input your Transfer From!" }]}
            >
              <Select
                showSearch
                placeholder="Transfer From"
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
            <Form.Item<FieldType> label="Balance" name="dueDate">
              <Input placeholder="Balance" type="text" disabled />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType>
              label="Transfer To"
              name="dueDate"
              rules={[{ required: true, message: "Input your Transfer To!" }]}
            >
              <Select
                showSearch
                placeholder="Transfer To"
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
              label="Amount"
              name="dueDate"
              rules={[{ required: true, message: "Input your Amount!" }]}
            >
              <Input placeholder="Amount" type="text" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType> label="Transfer Charge" name="dueDate">
              <Input placeholder="Transfer Charge" type="text" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType> label="Total Amount" name="dueDate">
              <Input placeholder="Total Amount" type="number" disabled />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType>
              label="Date"
              name="dueDate"
              rules={[{ required: true, message: "Input your Amount!" }]}
            >
              <DatePickerWithOptionalToday
                showToday={true}
                onChange={(date, dateString) => {
                  console.log(
                    "Parent component received date change:",
                    date,
                    dateString
                  );
                }}
              />{" "}
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<FieldType> label="Note" name="dueDate">
              <Input placeholder="Note" type="text" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateBalanceTransfer;
