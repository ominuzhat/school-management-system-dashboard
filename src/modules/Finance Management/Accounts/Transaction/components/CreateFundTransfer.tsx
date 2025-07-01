import {
  Col,
  Input,
  Row,
  Select,
  Form as AntForm,
  Card,
  Statistic,
} from "antd";
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

  const transactionData = pendingTransactionList?.data || {
    transferrable_collection: 0,
    requested_collection: 0,
    approved_collection: 0,
    rejected_collection: 0,
  };

  const [form] = AntForm.useForm();

  const onFinish = (values: any): void => {
    create({
      ...values,
      transaction_type: "transfer",
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
              value={transactionData.transferrable_collection}
              precision={2}
              valueStyle={{ color: "#faad14" }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Requested Amount"
              value={transactionData.requested_collection}
              precision={2}
              valueStyle={{ color: "#1890ff" }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Approved Amount"
              value={transactionData.approved_collection}
              precision={2}
              valueStyle={{ color: "#52c41a" }}
              prefix={<TbCoinTaka />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Rejected Amount"
              value={transactionData.rejected_collection}
              precision={2}
              valueStyle={{ color: "#ff4d4f" }}
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
              name="destination_account"
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
                        ? `cash (Office Account) - (${account?.balance})`
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
          {/* ✅ New Notes Field */}
          <Col span={24}>
            <Form.Item<any> label="Notes" name="notes">
              <Input.TextArea
                placeholder="Add any notes about this transfer"
                rows={4}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateFundTransfer;
