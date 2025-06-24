import { Col, Input, Row, Select, Form as AntForm, Card, Statistic } from "antd";
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
  const { data: pendingTransactionList } = useGetPendingTransactionQuery<any>({});

  const transactionData = pendingTransactionList?.data || {
    pending_amount: 0,
    requested_amount: 0,
    approved_amount: 0,
    rejected_amount: 0
  };

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
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Amount"
              value={transactionData.pending_amount}
              precision={2}
              valueStyle={{ color: '#faad14' }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Requested Amount"
              value={transactionData.requested_amount}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Approved Amount"
              value={transactionData.approved_amount}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Rejected Amount"
              value={transactionData.rejected_amount}
              precision={2}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
      </Row>

      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
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

          <Col lg={12}>
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