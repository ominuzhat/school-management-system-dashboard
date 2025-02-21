import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { ICreateTransaction, TransactionType } from "../types/transactionTypes";
import { useCreateTransactionMutation } from "../api/transactionEndPoints";
import { useGetAccountQuery } from "../../account/api/accountEndPoints";
import { TbCoinTaka } from "react-icons/tb";

const CreateTransaction = () => {
  const [create, { isLoading, isSuccess }] = useCreateTransactionMutation();
  const { data: accountList } = useGetAccountQuery({});

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
          <Col lg={8}>
            <Form.Item<ICreateTransaction>
              label="Select Account Type"
              name="account"
              rules={[{ required: true, message: "Account Type is required!" }]}
            >
              <Select placeholder="Select Account Type" className="w-full">
                {Array.isArray(accountList?.data) &&
                  accountList?.data?.map((account: any) => (
                    <Select.Option key={account?.id} value={account?.id}>
                      {account?.account_type}  - {account?.balance}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
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
          <Col lg={8}>
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
            <Form.Item<ICreateTransaction>
              label="Description"
              name="description"
            >
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTransaction;
