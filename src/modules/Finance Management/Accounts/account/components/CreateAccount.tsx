import { Col, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateAccountMutation } from "../api/accountEndPoints";
import { AccountType, ICreateAccount } from "../types/accountTypes";
import { useEffect } from "react";

const CreateAccount = () => {
  const [create, { isLoading, isSuccess }] = useCreateAccountMutation();
  const [form] = AntForm.useForm();

  const onFinish = (values: any): void => {
    create(values);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Form.Item<ICreateAccount>
              label="Select Account"
              name="account_type"
              rules={[{ required: true, message: "Account is required!" }]}
            >
              <Select placeholder="Select Account" className="w-full">
                {Object.entries(AccountType).map(([key, value]) => (
                  <Select.Option key={value} value={value}>
                    {key.replace(/_/g, " ")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item<ICreateAccount>
              label="Balance"
              name="balance"
              rules={[{ required: true, message: "Balance is required!" }]}
            >
              <Input placeholder="Balance" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateAccount;
