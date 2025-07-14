/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Col,
  Divider,
  Form as AntForm,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  DatePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  useGetSingleVendorEntryQuery,
  useUpdateVendorEntryMutation,
} from "../api/VendorEntryEndPoints";
import { useGetAccountQuery } from "../../../account/api/accountEndPoints";
import { useGetInvoiceEntriesQuery } from "../../Invoice Entry/api/InvoiceEntryEndPoints";
import { Form } from "../../../../../../common/CommonAnt";
import {
  MdPerson,
  MdOutlineAccountBalanceWallet,
  MdOutlinePayments,
} from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { BsCash, BsBank2, BsQrCodeScan } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

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

const UpdateVendorPaymentEntry = ({ record }: { record: number }) => {
  const [form] = AntForm.useForm();
  const [amountDue, setAmountDue] = useState<any>(0);
  const [remainingBalance, setRemainingBalance] = useState<any>(0);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const paymentMethod = AntForm.useWatch("type", form);

  const { data: singleData } = useGetSingleVendorEntryQuery<any>(record);
  const [update, { isLoading, isSuccess }] = useUpdateVendorEntryMutation();
  const { data: accountList } = useGetAccountQuery({});
  const { data: invoiceList } = useGetInvoiceEntriesQuery({});

  useEffect(() => {
    if (singleData?.data) {
      const entry = singleData.data;

      const matchedInvoice: any = invoiceList?.data?.results?.find(
        (inv: any) => inv.id === entry.invoice
      );

      setSelectedInvoice(matchedInvoice);
      setAmountDue(matchedInvoice?.amount_due || 0);
      setRemainingBalance((matchedInvoice?.amount_due || 0) - entry.amount);

      form.setFieldsValue({
        invoice: matchedInvoice?.vendor?.id,
        receiver_name: entry.receiver_name,
        amount: entry.amount,
        account: entry.account,
        type: entry.type,
        provider: entry.provider,
        bank_name: entry.bank_name,
        account_name: entry.account_name,
        account_number: entry.account_number,
        branch: entry.branch_name,
        cheque_number: entry.cheque_number,
        cheque_date: entry.cheque_date ? dayjs(entry.cheque_date) : undefined,
        mobile_number: entry.mobile_number,
        note: entry.note,
        payment_description: entry.payment_description,
        amount_due: matchedInvoice?.amount_due,
        remaining_balance: (matchedInvoice?.amount_due || 0) - entry.amount,
      });
    }
  }, [singleData, invoiceList]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Vendor payment updated successfully!");
    }
  }, [isSuccess]);

  const handleVendorChange = (vendorId: number) => {
    const matchedInvoice: any = invoiceList?.data?.results?.find(
      (invoice: any) => invoice.vendor?.id === vendorId
    );
    if (matchedInvoice) {
      setSelectedInvoice(matchedInvoice);
      setAmountDue(matchedInvoice.amount_due);
      const enteredAmount = form.getFieldValue("amount") || 0;
      setRemainingBalance(matchedInvoice.amount_due - Number(enteredAmount));
      form.setFieldsValue({
        amount_due: matchedInvoice.amount_due,
        remaining_balance: matchedInvoice.amount_due - Number(enteredAmount),
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = Number(e.target.value) || 0;
    const maxAmount = selectedInvoice?.amount_due || 0;
    const validAmount = inputAmount > maxAmount ? maxAmount : inputAmount;
    form.setFieldsValue({ amount: validAmount });
    setRemainingBalance(maxAmount - validAmount);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("invoice", values.invoice);
    formData.append("amount", values.amount);
    formData.append("account", values.account);
    formData.append("type", values.type);
    formData.append("receiver_name", values.receiver_name);
    formData.append("mobile_number", values.mobile_number);
    if (values.note) formData.append("note", values.note);

    if (values.type === "bank") {
      formData.append("bank_name", values.bank_name);
      formData.append("account_name", values.account_name);
      formData.append("account_number", values.account_number);
      formData.append("branch_name", values.branch);
      formData.append("transaction_number", values.transaction_number || "");
    }

    if (values.type === "mfs") {
      formData.append("provider", values.provider);
      formData.append("mobile_number", values.mobile_number);
      formData.append("transaction_number", values.transaction_number || "");
    }

    if (values.type === "cheque") {
      formData.append("cheque_number", values.cheque_number);
      formData.append("cheque_date", values.cheque_date.format("YYYY-MM-DD"));
      formData.append("bank_name", values.bank_name);
      formData.append("account_number", values.account_number);
      if (values.payment_description)
        formData.append("payment_description", values.payment_description);
    }

    if (values.file && Array.isArray(values.file)) {
      values.file.forEach((fileObj: any) => {
        if (fileObj.originFileObj) {
          formData.append("files[]", fileObj.originFileObj);
        }
      });
    }

    update({ id: record, data: formData });
  };

  return (
    <Card
      title={
        <Space className="items-center">
          <MdOutlinePayments className="text-xl text-indigo-600" />
          <Title level={4}>Update Vendor Payment</Title>
        </Space>
      }
    >
      <Form form={form} onFinish={onFinish} isLoading={isLoading}>
        <div className="mb-6">
          <Text strong className="block mb-4">
            Vendor Information
          </Text>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="invoice" label="Invoice">
                <Select
                  placeholder="Select Invoice"
                  suffixIcon={<MdPerson />}
                  onChange={handleVendorChange}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={
                    invoiceList?.data?.results?.map((invoice: any) => ({
                      label: `${invoice.vendor?.name} (${invoice.invoice_number}) - (${invoice?.amount})`,
                      value: invoice.vendor?.id,
                    })) ?? []
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="mb-6">
          <Text strong className="block mb-4">
            Payment Account
          </Text>
          <Row gutter={16}>
            <Col lg={24}>
              <Form.Item
                name="account"
                label="Select Account"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Account">
                  {Array.isArray(accountList?.data) &&
                    accountList?.data?.map((account: any) => (
                      <Option key={account.id} value={account.id}>
                        {account.type} - {account.account_name}{" "}
                        {account.account_type} ({account.balance})
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="mb-6">
          <Text strong className="block mb-4">
            Payment Details
          </Text>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="amount_due" label="Amount Due">
                <Input value={`৳ ${amountDue}`} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="amount"
                label="Amount Paid"
                rules={[{ required: true }]}
              >
                <Input type="number" prefix="৳" onChange={handleAmountChange} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="remaining_balance" label="Remaining Balance">
                <Input value={`৳ ${remainingBalance}`} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="receiver_name"
                label="Receiver Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="mobile_number"
                label="Mobile Number"
                rules={[{ required: true }]}
              >
                <Input prefix="+88" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="note" label="Note (Optional)">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className="mb-6">
          <Text strong className="block mb-4">
            Payment Method
          </Text>
          <Form.Item
            name="type"
            rules={[{ required: true }]}
            initialValue="cash"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.value}
                  onClick={() => form.setFieldsValue({ type: method.value })}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    paymentMethod === method.value
                      ? `border-${method.color}-500 bg-${method.color}-50 ring-2 ring-${method.color}-200`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    {method.icon}
                    <Text strong className="ml-2">
                      {method.label}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Form.Item>

          {paymentMethod === "bank" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="bank_name"
                  label="Bank Name"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<BsBank2 />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="account_name"
                  label="Account Name"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<MdPerson />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="account_number"
                  label="Account Number"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<MdOutlineAccountBalanceWallet />} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="branch"
                  label="Branch Name"
                  rules={[{ required: true }]}
                >
                  <Input />
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
            </Row>
          )}

          {paymentMethod === "mfs" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="provider"
                  label="MFS Provider"
                  rules={[{ required: true }]}
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
                  name="mobile_number"
                  label="Mobile Number"
                  rules={[{ required: true }]}
                >
                  <Input prefix="+88" />
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
            </Row>
          )}

          {/* {paymentMethod === "cash" && (
            <Row gutter={16}>
          
            </Row>
          )} */}

          {paymentMethod === "cheque" && (
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="cheque_number"
                  label="Cheque Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="cheque_date"
                  label="Cheque Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="bank_name"
                  label="Bank Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="account_number"
                  label="Account Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="payment_description"
                  label="Payment Description"
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          )}
        </div>

        <Divider />

        <div className="mb-6">
          <Text strong className="block mb-4">
            Upload Attachment
          </Text>
          <Form.Item
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Dragger beforeUpload={() => false} multiple>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>Click or drag file here to upload</p>
            </Dragger>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateVendorPaymentEntry;
