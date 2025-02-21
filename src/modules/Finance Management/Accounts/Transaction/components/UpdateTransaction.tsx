import { Col, Input, Row, Select, Form } from "antd";
import { useEffect } from "react";
import {
  ICreateTransaction,
  IGetTransaction,
  TransactionType,
} from "../types/transactionTypes";
import { useGetAccountQuery } from "../../account/api/accountEndPoints";
import {
  useGetSingleTransactionQuery,
  useUpdateTransactionMutation,
} from "../api/transactionEndPoints";
import { TbCoinTaka } from "react-icons/tb";

const UpdateTransaction = ({ record }: any) => {
  const { data: accountList } = useGetAccountQuery({});

  const [form] = Form.useForm();

  const { data: singleData } = useGetSingleTransactionQuery(Number(record));
  const [update] = useUpdateTransactionMutation();

  useEffect(() => {
    if (singleData?.data) {
      const accountData = singleData?.data as unknown as IGetTransaction;
      form.setFieldsValue({
        account: accountData.account,
        transaction_type: accountData.transaction_type,
        amount: accountData.amount,
        description: accountData.description,
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
          <Col lg={8}>
            <Form.Item<ICreateTransaction>
              label="Select Account Type"
              name="account"
              rules={[{ required: true, message: "Account Type is required!" }]}
            >
              <Select placeholder="Select Account Type" className="w-full">
                {accountList?.data?.results?.map((account: any) => (
                  <Select.Option key={account?.id} value={account?.id}>
                    {account?.account_type} - {account?.balance}
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

export default UpdateTransaction;
