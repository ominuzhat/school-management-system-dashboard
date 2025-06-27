import { Col, Input, Row, Form as AntForm } from "antd";
import { useEffect } from "react";
import { useCreateVendorMutation } from "../api/vendorEndPoints";
import { Form } from "../../../../../../common/CommonAnt";
import { ICreateVendor } from "../types/vendorTypes";

const CreateVendor = () => {
  const [create, { isLoading, isSuccess }] = useCreateVendorMutation();
  const [form] = AntForm.useForm();

  const onFinish = (values: any): void => {
    const results = {
      ...values,
    };

    create(results);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item<ICreateVendor>
              label="Vendor Name"
              name="name"
              rules={[{ required: true, message: "Vendor name is required!" }]}
            >
              <Input placeholder="Enter vendor name" />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item<ICreateVendor>
              label="Contact Number"
              name="contact_number"
              rules={[
                { required: true, message: "Contact number is required!" },
              ]}
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateVendor>
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Enter a valid email!",
                },
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
            >
              <Input placeholder="vendor@example.com" />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateVendor>
              label="Address"
              name="address"
            >
              <Input.TextArea placeholder="Enter address" rows={2} />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item
              label="Purpose"
              name="purpose"
            >
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateVendor;
