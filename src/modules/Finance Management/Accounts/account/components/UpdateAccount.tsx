import { Col, Input, Row, Select, Form, Button } from "antd";
import {
  useGetSingleAccountQuery,
  useUpdateAccountMutation,
} from "../api/accountEndPoints";
import { AccountType, ICreateAccount } from "../types/accountTypes";
import { useEffect } from "react";

const UpdateAccount = ({ record }: any) => {
  const [form] = Form.useForm();

  const { data: singleData, isLoading } = useGetSingleAccountQuery(
    Number(record)
  );
  const [update] = useUpdateAccountMutation();

  useEffect(() => {
    if (singleData?.data) {
      const accountData = singleData?.data as unknown as ICreateAccount;
      form.setFieldsValue({
        account_type: accountData.account_type,
        balance: accountData.balance,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    update({ id: record, data: values });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
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
          <Col className="flex items-center justify-center">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Update Account
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateAccount;
