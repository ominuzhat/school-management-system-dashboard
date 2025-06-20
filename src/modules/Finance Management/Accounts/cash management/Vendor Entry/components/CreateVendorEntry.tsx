/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Col,
  Input,
  Row,
  Select,
  Form as AntForm,
  Card,
  Typography,
  Space,
  Divider,
  Upload,
  message,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { useCreateVendorEntryMutation } from "../api/VendorEntryEndPoints";
import { Form } from "../../../../../../common/CommonAnt";
import {
  MdAttachMoney,
  MdReceipt,
  MdPerson,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { BsCash, BsBank2, BsQrCodeScan } from "react-icons/bs";
import { FaCreditCard, FaShieldAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { HiOutlineBanknotes } from "react-icons/hi2";
import dayjs from "dayjs";
import { useGetAccountQuery } from "../../../account/api/accountEndPoints";

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const paymentMethods = [
  {
    value: "cash",
    label: "Cash",
    icon: <BsCash className="text-orange-500" />,
    color: "orange",
  },
  {
    value: "mfs",
    label: "Mobile Banking",
    icon: <CiMobile3 className="text-blue-500" />,
    color: "blue",
  },

  {
    value: "bank",
    label: "Bank Transfer",
    icon: <BsBank2 className="text-green-600" />,
    color: "green",
  },

  {
    value: "cheque",
    label: "Cheque Payment",
    icon: <HiOutlineBanknotes className="text-cyan-600" />,
    color: "cyan",
  },
];

const mfsProviders = [
  { value: "bkash", label: "Bkash" },
  { value: "nagad", label: "Nagad" },
  { value: "rocket", label: "Rocket" },
  { value: "upay", label: "Upay" },
];

const CreateVendorEntry = () => {
  const [form] = AntForm.useForm();
  const [amountDue, setAmountDue] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const paymentMethod = AntForm.useWatch("type", form);
  const [create, { isLoading, isSuccess }] = useCreateVendorEntryMutation();
  const { data: accountList } = useGetAccountQuery({});

  const onFinish = (values: any) => {
    const formData = new FormData();

    formData.append("vendor", values.vendor);
    formData.append("vendor_invoice_number", values.vendor_invoice_number);
    formData.append("amount_due", String(amountDue));
    formData.append("amount", values.amount);
    formData.append("remaining_balance", String(remainingBalance));
    formData.append("type", values.type);

    if (values.type === "bank") {
      formData.append("bank_name", values.bank_name);
      formData.append("account_name", values.account_name);
      formData.append("account_number", values.account_number);
      formData.append("transaction_number", values.transaction_number || "");
      formData.append("branch", values.branch);
    }

    if (values.type === "mfs") {
      formData.append("provider", values.provider);
      formData.append("mobile_number", values.mobile_number);
    }

    if (values.type === "surjopay") {
      formData.append("merchant_id", values.merchant_id);
      formData.append("api_key", values.api_key);
    }

    if (values.file && values.file[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    create(formData);
  };

  const handleVendorChange = (vendorId: string) => {
    const fakeDue = 1000;
    setAmountDue(fakeDue);
    const enteredAmount = form.getFieldValue("amount");
    setRemainingBalance(fakeDue - Number(enteredAmount || 0));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value) || 0;
    setRemainingBalance(amountDue - amount);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setAmountDue(0);
      setRemainingBalance(0);
    }
  }, [isSuccess, form]);

  return (
    <Card
      title={
        <Space className="items-center">
          <TbTruckDelivery className="text-xl text-indigo-600" />
          <Title level={4} className="m-0">
            Create Vendor Payment
          </Title>
        </Space>
      }
      bordered={false}
      className="shadow-sm rounded-lg"
    >
      <Form form={form} onFinish={onFinish} isLoading={isLoading}>
        {/* Vendor Info */}
        <div className="mb-6">
          <Text strong className="block mb-4 text-lg">
            Vendor Information
          </Text>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="vendor"
                label="Vendor"
                rules={[{ required: true, message: "Please select a vendor" }]}
              >
                <Select
                  placeholder="Select vendor"
                  suffixIcon={<MdPerson />}
                  onChange={handleVendorChange}
                >
                  <Option value="1">Vendor A</Option>
                  <Option value="2">Vendor B</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="vendor_invoice_number"
                label="Invoice Number"
                rules={[{ required: true, message: "Enter invoice number" }]}
              >
                <Input prefix={<MdReceipt />} placeholder="INV-001" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <Text strong className="block mb-4 text-lg">
            Payment Account
          </Text>
          <Row gutter={16}>
            <Col lg={24}>
              <Form.Item
                label="Select Account"
                name="account"
                rules={[{ required: true, message: "Account is required!" }]}
              >
                <Select placeholder="Select Account" className="w-full">
                  {Array.isArray(accountList?.data) &&
                    accountList?.data?.map((account: any) => (
                      <Select.Option key={account?.id} value={account?.id}>
                        {account?.type} - {account?.account_name}{" "}
                        {account?.account_type} ({account?.balance})
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <Text strong className="block mb-4 text-lg">
            Payment Details
          </Text>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="amount_due" label="Amount Due">
                <Input
                  value={`৳ ${amountDue.toLocaleString()}`}
                  disabled
                  prefix={<MdAttachMoney />}
                  className="font-medium"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="amount"
                label="Amount Paid"
                rules={[
                  {
                    required: true,
                    message: "Enter payment amount",
                  },
                ]}
              >
                <Input
                  type="number"
                  onChange={handleAmountChange}
                  prefix="৳"
                  className="font-medium"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="remaining_balance" label="Remaining Balance">
                <Input
                  value={`৳ ${remainingBalance.toLocaleString()}`}
                  disabled
                  className={`font-medium ${
                    remainingBalance > 0 ? "text-red-500" : "text-green-500"
                  }`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item name="description" label="Description">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Payment Method */}
        <div className="mb-6">
          <Text strong className="block mb-4 text-lg">
            Payment Method
          </Text>
          <Form.Item
            name="type"
            rules={[{ required: true, message: "Select payment method" }]}
            initialValue="bank"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.value}
                  onClick={() => form.setFieldsValue({ type: method.value })}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === method.value
                      ? `border-${method.color}-500 bg-${method.color}-50 ring-2 ring-${method.color}-200`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-xl">{method.icon}</div>
                    <Text strong>{method.label}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Form.Item>

          {/* Conditional Fields */}
          {paymentMethod === "bank" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="bank_name"
                  label="Bank Name"
                  rules={[{ required: true, message: "Enter bank name" }]}
                >
                  <Input prefix={<BsBank2 />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="account_name"
                  label="Account Name"
                  rules={[{ required: true, message: "Enter account name" }]}
                >
                  <Input prefix={<MdPerson />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="account_number"
                  label="Account Number"
                  rules={[{ required: true, message: "Enter account number" }]}
                >
                  <Input prefix={<MdOutlineAccountBalanceWallet />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="transaction_number"
                  label="Transaction Reference"
                >
                  <Input prefix={<BsQrCodeScan />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="branch"
                  label="Branch Name"
                  rules={[{ required: true, message: "Enter branch name" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          )}

          {paymentMethod === "mfs" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="provider"
                  label="MFS Provider"
                  rules={[{ required: true, message: "Select provider" }]}
                >
                  <Select suffixIcon={<CiMobile3 />}>
                    {mfsProviders.map((provider) => (
                      <Option key={provider.value} value={provider.value}>
                        {provider.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="transaction_number"
                  label="Transaction Reference"
                >
                  <Input prefix={<BsQrCodeScan />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="mobile_number"
                  label="Mobile Number"
                  rules={[
                    { required: true, message: "Enter mobile number" },
                    {
                      pattern: /^01[3-9]\d{8}$/,
                      message: "Invalid Bangladeshi mobile number",
                    },
                  ]}
                >
                  <Input prefix="+88" />
                </Form.Item>
              </Col>
            </Row>
          )}

          {paymentMethod === "cash" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="transaction_number"
                  label="Payment Receiver Name"
                  rules={[
                    { required: true, message: "Enter payment receiver name" },
                  ]}
                >
                  <Input placeholder="Enter payment receiver name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="mobile_number"
                  label="Mobile Number"
                  rules={[
                    { required: true, message: "Enter mobile number" },
                    {
                      pattern: /^01[3-9]\d{8}$/,
                      message: "Invalid Bangladeshi mobile number",
                    },
                  ]}
                >
                  <Input prefix="+88" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item name="note" label="Note (Optional)">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          )}

          {paymentMethod === "cheque" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="cheque_number"
                  label="Cheque Number"
                  rules={[{ required: true, message: "Enter cheque number" }]}
                >
                  <Input placeholder="e.g. 9876543210" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="cheque_date"
                  label="Cheque Date"
                  rules={[{ required: true, message: "Select cheque date" }]}
                  initialValue={dayjs()} // Make sure `dayjs` is imported
                >
                  <DatePicker format="YYYY-MM-DD" className="w-full" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="bank_name"
                  label="Bank Name"
                  rules={[{ required: true, message: "Enter bank name" }]}
                >
                  <Input placeholder="e.g. Dutch Bangla Bank" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="account_number"
                  label="Account Number"
                  rules={[{ required: true, message: "Enter account number" }]}
                >
                  <Input placeholder="e.g. 12345678901234" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  name="payment_description"
                  label="Payment Description"
                >
                  <Input.TextArea
                    placeholder="Write details about the payment..."
                    rows={3}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
        </div>

        <Divider />

        {/* File Upload */}
        <div className="mb-6">
          <Text strong className="block mb-4 text-lg">
            Upload Attachment
          </Text>
          <Form.Item
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: "Please upload a file" }]}
          >
            <Dragger
              name="file"
              beforeUpload={() => false}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              maxCount={1}
              multiple={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Only one file allowed (PDF, JPG, PNG, DOC)
              </p>
            </Dragger>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default CreateVendorEntry;
