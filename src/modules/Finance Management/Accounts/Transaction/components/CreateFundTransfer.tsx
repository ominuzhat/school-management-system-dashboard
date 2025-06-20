import { Col, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import {
  useCreateFundTransactionMutation,
  useGetPendingTransactionQuery,
} from "../api/transactionEndPoints";
import { useGetAccountQuery } from "../../account/api/accountEndPoints";
import { TbCoinTaka } from "react-icons/tb";
import { useEffect } from "react";

const CreateFundTransfer = () => {
  const [create, { isLoading, isSuccess }] = useCreateFundTransactionMutation();
  const { data: accountList } = useGetAccountQuery({});
  const { data: pendingTransactionList } = useGetPendingTransactionQuery<any>(
    {}
  );

  console.log(pendingTransactionList?.data?.meta.aggregates?.total_amount);

  const [form] = AntForm.useForm();

  const onFinish = (values: any): void => {
    create({
      ...values,
      transaction_type: "transfer", // hardcoded as it's the only type in this version
    });
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
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <div className="">
            <p
              className={`border-2 p-4 rounded-lg cursor-pointer hover:shadow-md flex flex-col h-full transition-all duration-300`}
            >
              {pendingTransactionList?.data?.meta.aggregates?.total_amount}
            </p>
          </div>
          <Col lg={24}>
            <Form.Item<any>
              label="Transfer To"
              name="target_account_id"
              rules={[
                { required: true, message: "Target Account is required!" },
              ]}
            >
              <Select
                placeholder="Select Account"
                className="w-full"
                allowClear
              >
                {Array.isArray(accountList?.data) &&
                  accountList?.data?.map((account: any) => (
                    <Select.Option key={account?.id} value={account?.id}>
                      {account?.type == "cash"
                        ? `cash (Office Account)`
                        : `${account?.type} - ${account?.account_type} (${account?.balance})`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<any>
              label="Transfer Amount"
              name="amount"
              rules={[{ required: true, message: "Amount is required!" }]}
            >
              <Input
                addonBefore={<TbCoinTaka />}
                placeholder="Enter amount"
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateFundTransfer;
