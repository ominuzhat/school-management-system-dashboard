import {
  Col,
  Input,
  Row,
  Form as AntForm,
  DatePicker,
  Upload,
  message,
} from "antd";
import { TbCoinTaka } from "react-icons/tb";
import { CalendarOutlined, InboxOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useEffect } from "react";
import { Form } from "../../../../../../common/CommonAnt";
import { useCreateInvoiceEntryMutation } from "../api/InvoiceEntryEndPoints";
import { ICreateInvoiceEntry } from "../types/invoiceEntryTypes";

const { Dragger } = Upload;

const CreateInvoiceEntry = () => {
  const [create, { isLoading, isSuccess }] = useCreateInvoiceEntryMutation();
  const [form] = AntForm.useForm();

  const onFinish = (values: any): void => {
    const formData = new FormData();
    formData.append("vendor", values.vendor);
    formData.append("amount", values.amount);
    formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
    formData.append("description", values.description);

    if (values.file && values.file[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    create(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  const fileProps = {
    name: "file",
    maxCount: 1,
    accept: ".jpg,.jpeg,.png,.pdf",
    beforeUpload: () => false, // Prevent auto upload
    onChange(info: any) {
      const file = info.file;
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        message.error("Only JPG, PNG, and PDF files are allowed!");
        form.setFieldsValue({ file: [] });
      }
    },
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item<ICreateInvoiceEntry>
              label="Vendor"
              name="vendor"
              rules={[{ required: true, message: "Vendor is required!" }]}
            >
              <Input placeholder="Vendor name" />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item<ICreateInvoiceEntry>
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

          <Col lg={12}>
            <Form.Item<ICreateInvoiceEntry>
              label="Date"
              name="date"
              initialValue={dayjs()}
              rules={[{ required: true, message: "Date is required!" }]}
            >
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="w-full"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateInvoiceEntry>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item
              label="Upload File"
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e: any) =>
                Array.isArray(e) ? e : e?.fileList
              }
            >
              <Dragger {...fileProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag JPG, PNG, or PDF file to this area
                </p>
                <p className="ant-upload-hint">
                  Only one file allowed. Max file size handled by backend.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateInvoiceEntry;
