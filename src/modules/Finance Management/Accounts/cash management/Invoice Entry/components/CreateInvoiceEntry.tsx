/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Col,
  Input,
  Row,
  Form as AntForm,
  DatePicker,
  Upload,
  message,
  Select,
} from "antd";
import { TbCoinTaka } from "react-icons/tb";
import { CalendarOutlined, InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Form } from "../../../../../../common/CommonAnt";
import { useCreateInvoiceEntryMutation } from "../api/InvoiceEntryEndPoints";
import { ICreateInvoiceEntry } from "../types/invoiceEntryTypes";
import { useGetVendorQuery } from "../../Vendor/api/vendorEndPoints";

const { Dragger } = Upload;

const CreateInvoiceEntry = () => {
  const [create, { isLoading, isSuccess }] = useCreateInvoiceEntryMutation();
  const { data: vendorList } = useGetVendorQuery({});
  const [form] = AntForm.useForm();

  const onFinish = (values: any): void => {
    const formData = new FormData();
    formData.append("vendor_id", values.vendor_id);
    formData.append("amount", values.amount);
    formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
    formData.append("description", values.description);

    // Append multiple files
    if (values.uploaded_files && values.uploaded_files.length > 0) {
      values.uploaded_files.forEach((file: any, index: number) => {
        if (file.originFileObj) {
          formData.append(`uploaded_files`, file.originFileObj);
        }
      });
    }

    create(formData)
      .unwrap()
      .then(() => message.success("Invoice entry created successfully!"))
      .catch(() => message.error("Failed to create invoice entry."));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  const fileProps = {
    name: "files",
    multiple: true,
    accept: ".jpg,.jpeg,.png,.pdf",
    beforeUpload: () => false, // Prevent auto upload
    onChange(info: any) {
      const isValid = info.fileList.every((file: any) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type)
      );
      if (!isValid) {
        message.error("Only JPG, PNG, and PDF files are allowed!");
        form.setFieldsValue({ uploaded_files: [] });
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
              name="vendor_id"
              rules={[{ required: true, message: "Vendor is required!" }]}
            >
              <Select placeholder="Select a Vendor" allowClear showSearch>
                {vendorList?.data?.results?.map((vendor: any) => (
                  <Select.Option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </Select.Option>
                ))}
              </Select>
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
            <Form.Item<ICreateInvoiceEntry>
              label="Upload Files"
              name="uploaded_files"
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
                  Click or drag JPG, PNG, or PDF files to this area
                </p>
                <p className="ant-upload-hint">
                  You can upload multiple files. Max file size handled by
                  backend.
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
