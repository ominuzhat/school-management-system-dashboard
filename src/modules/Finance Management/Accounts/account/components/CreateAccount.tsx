import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateAccountMutation } from "../api/accountEndPoints";
import { AccountType, ICreateAccount } from "../types/accountTypes";

const CreateAccount = () => {
  const [create, { isLoading, isSuccess }] = useCreateAccountMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ account_type: "", balance: "" }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item<ICreateAccount>
              label="Select Account Type"
              name="account_type"
              rules={[{ required: true, message: "Account Type is required!" }]}
            >
              <Select placeholder="Select Account Type" className="w-full">
                {Object.entries(AccountType).map(([key, value]) => (
                  <Select.Option key={value} value={value}>
                    {key.replace(/_/g, " ")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
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
