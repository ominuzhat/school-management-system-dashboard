import { Col, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import {
  useGetSingleAccountQuery,
  useUpdateAccountMutation,
} from "../api/accountEndPoints";
import { useEffect, useState } from "react";

const mfsAccountTypeChoices = [
  ["bkash", "Bkash Mobile Banking"],
  ["rocket", "Rocket"],
  ["mycash", "My Cash"],
  ["upay", "Upay"],
  ["islami_bank_mcash", "Islami Bank mCash"],
  ["ok_wallet", "OK Wallet"],
  ["first_cash", "FirstCash"],
  ["rupali_bank", "Rupali Bank"],
  ["tele_cash", "TeleCash"],
  ["islamic_wallet", "Islamic Wallet"],
  ["meghna_pay", "Meghna Pay"],
  ["nagad", "Nagad"],
  ["wallet", "Wallet"],
];

const { Option } = Select;

const UpdateAccount = ({ record }: any) => {
  const [form] = AntForm.useForm();
  const [accountType, setAccountType] = useState();
  const { data: singleData, isLoading } = useGetSingleAccountQuery<any>(
    Number(record)
  );
  const [update, { isLoading: isUpdating, isSuccess }] =
    useUpdateAccountMutation();

  useEffect(() => {
    if (record && singleData) {
      setAccountType(singleData.data.type);
    }
  }, [record, singleData]);

  useEffect(() => {
    if (singleData?.data) {
      const accountData = singleData.data;
      setAccountType(accountData.type);
      form.setFieldsValue(accountData);
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    update({ id: record, data: values });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading || isUpdating}
        isSuccess={isSuccess}
      >
        {/* --- BANK ACCOUNT FIELDS --- */}
        {accountType === "bank" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Bank Name" name="bank_name">
                <Input placeholder="e.g. BRAC Bank" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Account Name" name="account_name">
                <Input placeholder="John Doe" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Account Number"
                name="account_or_merchant_number"
              >
                <Input placeholder="1234567890" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Branch Name" name="branch_name">
                <Input placeholder="Gulshan Branch" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Routing Number" name="routing_number_or_apikey">
                <Input placeholder="123456789" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Balance" name="balance">
                <Input addonBefore="৳" type="number" placeholder="50000.00" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* --- MFS ACCOUNT FIELDS --- */}
        {accountType === "mfs" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="MFS Name" name="account_type">
                <Select placeholder="Select MFS" disabled>
                  {mfsAccountTypeChoices.map(([value, label]) => (
                    <Option key={value} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Account Number"
                name="account_or_merchant_number"
              >
                <Input placeholder="e.g. 01712345678" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Balance" name="balance">
                <Input addonBefore="৳" type="number" placeholder="25000.00" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* --- SHURJOPAY FIELDS --- */}
        {accountType === "surjopay" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Merchant ID" name="account_or_merchant_number">
                <Input placeholder="merchant_12345" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="API Key" name="routing_number_or_apikey">
                <Input placeholder="ssl_api_key_abcdef123456" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gateway URL" name="gateway_url">
                <Input placeholder="https://securepay.sslcommerz.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Balance" name="balance">
                <Input addonBefore="৳" type="number" placeholder="0.00" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* --- CASH FIELDS --- */}
        {accountType === "cash" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Balance" name="balance">
                <Input addonBefore="৳" type="number" placeholder="3000.00" />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default UpdateAccount;
