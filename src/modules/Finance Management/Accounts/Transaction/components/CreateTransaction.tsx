import { Col, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { ICreateTransaction, TransactionType } from "../types/transactionTypes";
import { useCreateTransactionMutation } from "../api/transactionEndPoints";
import { useGetAccountQuery } from "../../account/api/accountEndPoints";
import { TbCoinTaka } from "react-icons/tb";
import { useEffect } from "react";

const CreateTransaction = () => {
  const [create, { isLoading, isSuccess }] = useCreateTransactionMutation();
  const { data: accountList } = useGetAccountQuery({});
  const [form] = AntForm.useForm();

  const accountId = AntForm.useWatch("account", form);
  const transactionType = AntForm.useWatch("transaction_type", form);

  console.log(transactionType, "transactionType");

  const onFinish = (values: any): void => {
    create(values);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess, accountList]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        layout="vertical"
        initialValues={{ account_type: "", balance: "" }}
      >
        <Row>
          <Col lg={24}>
            <Form.Item<ICreateTransaction>
              label="From"
              name="account"
              rules={[{ required: true, message: "Account Type is required!" }]}
            >
              <Select placeholder="From" className="w-full" allowClear>
                {Array.isArray(accountList?.data) &&
                  accountList?.data?.map((account: any) => (
                    <Select.Option key={account?.id} value={account?.id}>
                      {account?.account_type} ({account?.balance})
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item<ICreateTransaction>
              label="Select Transaction Type"
              name="transaction_type"
              rules={[
                { required: true, message: "Transaction Type is required!" },
              ]}
            >
              <Select placeholder="Select Transaction Type" className="w-full">
                {Object.entries(TransactionType).map(([key, value]) => (
                  <Select.Option key={value} value={value}>
                    {key.replace(/_/g, " ")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {transactionType === "transfer" && (
            <Col lg={24}>
              <Form.Item<ICreateTransaction>
                label="To"
                name="target_account"
                rules={[{ required: true, message: "To is required!" }]}
              >
                <Select
                  placeholder="Select Account Type"
                  className="w-full"
                  allowClear
                >
                  {Array.isArray(accountList?.data) &&
                    accountList?.data
                      .filter((account: any) => account?.id !== accountId)
                      .map((account: any) => (
                        <Select.Option key={account?.id} value={account?.id}>
                          {account?.account_type} ({account?.balance})
                        </Select.Option>
                      ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          <Col lg={24}>
            <Form.Item<ICreateTransaction>
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Amount is required!" }]}
            >
              <Input
                addonBefore={<TbCoinTaka />}
                placeholder="Amount"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item<ICreateTransaction> label="Purpose" name="description">
              <Input.TextArea placeholder="Enter Purpose" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTransaction;
