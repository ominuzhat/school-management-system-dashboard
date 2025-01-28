import {
  Card,
  Col,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import React from "react";
import { useCreateRestaurantMutation } from "../../../modules/Restaurants/api/restaurantsEndpoint";
import Form from "../Form";
import { DatePickerWithOptionalToday } from "../CommonSearch/CommonSearch";

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

const CreateEmployeeModalForm = () => {
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
            <Col lg={6}>
              <Form.Item<FieldType>
                label="ID Card No"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Employee ID Card No." />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Employee Name"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Employee Name" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Department"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Department"
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
                label="Designation"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Designation"
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
              <Form.Item<FieldType> label="Blood Group" name="dueDate">
                <Select
                  showSearch
                  placeholder="Blood Group"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType>
                label="Salary"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Salary!",
                  },
                ]}
              >
                <Input placeholder="Salary" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType> label="Commission" name="dueDate">
                <Input placeholder="Commission" type="number" />
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
                label="Mobile"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your Mobile!",
                  },
                ]}
              >
                <Input addonBefore="+088" placeholder="Mobile" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType> label="Birth Date" name="dueDate">
                <DatePickerWithOptionalToday
                  showToday={false}
                  onChange={(date, dateString) => {
                    console.log(
                      "Parent component received date change:",
                      date,
                      dateString
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType> label="Appointment Date" name="dueDate">
                <DatePickerWithOptionalToday
                  showToday={false}
                  onChange={(date, dateString) => {
                    console.log(
                      "Parent component received date change:",
                      date,
                      dateString
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<FieldType> label="Joining Date" name="dueDate">
                <DatePickerWithOptionalToday
                  showToday={true}
                  onChange={(date, dateString) => {
                    console.log(
                      "Parent component received date change:",
                      date,
                      dateString
                    );
                  }}
                />
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
          </Row>
        </Card>

        <Row gutter={8} className="mt-5">
          <Col lg={6}>
            <Form.Item<FieldType>
              label="Status"
              name="dueDate"
              rules={[
                {
                  required: true,
                  message: "Please input your Status!",
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => console.log("radio checked", e.target.value)}
                defaultValue={1}
              >
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateEmployeeModalForm;
