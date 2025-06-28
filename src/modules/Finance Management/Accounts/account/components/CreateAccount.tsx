import { Col, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateAccountMutation } from "../api/accountEndPoints";
import { useEffect } from "react";
import { MdAccountBalance } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";

const accountTypes = [
  {
    value: "bank",
    label: "Bank Account",
    color: "#4CAF50",
    icon: <MdAccountBalance />,
  },
  {
    value: "mfs",
    label: "MFS Account",
    color: "#2196F3",
    icon: <CiMobile3 />,
  },
  {
    value: "cash",
    label: "Cash",
    color: "#7AE2CF",
    icon: <BsCash />,
  },
  {
    value: "surjopay",
    label: "Shurjopay",
    color: "#00809D",
    icon: <FaCreditCard />,
  },
];

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

const CreateAccount = () => {
  const [create, { isLoading, isSuccess }] = useCreateAccountMutation();
  const [form] = AntForm.useForm();
  const accountType = AntForm.useWatch("type", form);

  const onFinish = (values: any) => {
    create(values);
  };

  // ✅ Set default type on mount
  useEffect(() => {
    form.setFieldsValue({ type: accountTypes[0].value });
  }, [form]);

  // ✅ Reset all fields except `type` when type changes
  useEffect(() => {
    if (accountType) {
      const currentType = accountType;
      form.resetFields();
      form.setFieldsValue({ type: currentType });
    }
  }, [accountType, form]);

  // ✅ Reset form after successful submit
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      form.setFieldsValue({ type: accountTypes[0].value });
    }
  }, [isSuccess, form]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[16, 16]} justify="space-between" className="mb-6">
          {accountTypes.map((account) => {
            const isSelected = accountType === account.value;
            return (
              <Col
                key={account.value}
                xs={24}
                sm={12}
                md={6}
                className="transition-all duration-300"
              >
                <div
                  onClick={() => form.setFieldsValue({ type: account.value })}
                  className={`border-2 p-4 rounded-lg cursor-pointer hover:shadow-md flex flex-col h-full transition-all duration-300`}
                  style={{
                    borderColor: isSelected ? account.color : "",
                    backgroundColor: isSelected ? `${account.color}10` : "",
                  }}
                >
                  <div
                    className="text-3xl mb-2"
                    style={{ color: account.color }}
                  >
                    {account.icon}
                  </div>
                  <p className="text-lg font-medium">{account.label}</p>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Hidden field for validation */}
        <Form.Item
          name="type"
          rules={[{ required: true, message: "Please select an account type" }]}
          className="hidden"
        >
          <Select>
            {accountTypes.map((account) => (
              <Option key={account.value} value={account.value}>
                {account.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {accountType === "bank" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Bank Name"
                name="bank_name"
                rules={[{ required: true, message: "Bank Name is required!" }]}
              >
                <Input placeholder="e.g. BRAC Bank" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Account Name"
                name="account_name"
                rules={[
                  { required: true, message: "Account Name is required!" },
                ]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Account Number"
                name="account_or_merchant_number"
                rules={[
                  { required: true, message: "Account Number is required!" },
                ]}
              >
                <Input placeholder="1234567890" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Branch Name"
                name="branch_name"
                rules={[
                  { required: true, message: "Branch Name is required!" },
                ]}
              >
                <Input placeholder="Gulshan Branch" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Routing Number" name="routing_number_or_apikey">
                <Input placeholder="123456789" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Balance"
                name="balance"
                rules={[{ required: true, message: "Balance is required!" }]}
              >
                <Input addonBefore="৳" type="number" placeholder="50000.00" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* --- MFS ACCOUNT FIELDS --- */}
        {accountType === "mfs" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="MFS Name"
                name="account_type"
                rules={[{ required: true, message: "MFS Name is required!" }]}
              >
                <Select placeholder="Select MFS">
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
                rules={[
                  { required: true, message: "Account Number is required!" },
                ]}
              >
                <Input placeholder="e.g. 01712345678" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Balance"
                name="balance"
                rules={[{ required: true, message: "Balance is required!" }]}
              >
                <Input addonBefore="৳" type="number" placeholder="25000.00" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* --- SHURJOPAY FIELDS --- */}
        {accountType === "surjopay" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Merchant ID"
                name="account_or_merchant_number"
                rules={[
                  { required: true, message: "Merchant ID is required!" },
                ]}
              >
                <Input placeholder="merchant_12345" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="API Key"
                name="routing_number_or_apikey"
                rules={[{ required: true, message: "API Key is required!" }]}
              >
                <Input placeholder="ssl_api_key_abcdef123456" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gateway URL"
                name="gateway_url"
                rules={[
                  { required: true, message: "Gateway URL is required!" },
                ]}
              >
                <Input placeholder="https://securepay.sslcommerz.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Balance"
                name="balance"
                rules={[{ required: true, message: "Balance is required!" }]}
              >
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

export default CreateAccount;
