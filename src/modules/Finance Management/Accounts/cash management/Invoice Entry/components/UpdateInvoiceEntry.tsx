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
import { useEffect, useState } from "react";
import { Form } from "../../../../../../common/CommonAnt";
import {
  useGetSingleInvoiceEntryQuery,
  useUpdateInvoiceEntryMutation,
} from "../api/InvoiceEntryEndPoints";
import { useGetVendorQuery } from "../../Vendor/api/vendorEndPoints";

const { Dragger } = Upload;

const UpdateInvoiceEntry = ({ record }: { record: number }) => {
  const [form] = AntForm.useForm();
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const { data: singleData, isLoading } =
    useGetSingleInvoiceEntryQuery<any>(record);
  const { data: vendorList } = useGetVendorQuery({});
  const [update, { isLoading: isUpdating }] = useUpdateInvoiceEntryMutation();

  useEffect(() => {
    if (singleData?.data) {
      const entry = singleData.data;
      form.setFieldsValue({
        vendor: entry.vendor?.id,
        amount: entry.amount,
        date: dayjs(entry.date),
        description: entry.description,
      });

      if (entry?.files?.length) {
        const formattedFiles = entry.files.map((file: any) => ({
          uid: `${file.id}`,
          name: file.name || `File-${file.id}`,
          status: "done",
          url: file.file,
          fileId: file.id,
        }));
        setFileList(formattedFiles);
        form.setFieldsValue({ uploaded_files: formattedFiles });
      }
    }
  }, [singleData, form]);

  const onFinish = (values: any): void => {
    const formData = new FormData();

    formData.append("vendor", values.vendor);
    formData.append("amount", values.amount);
    formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
    formData.append("description", values.description);

    values.uploaded_files?.forEach((file: any) => {
      if (!file.fileId && file.originFileObj) {
        formData.append("uploaded_files", file.originFileObj);
      }
    });

    deletedFiles.forEach((id) => {
      formData.append("delete_files", id.toString());
    });

    update({ id: record, data: formData })
      .unwrap()
      .then(() => {
        message.success("Invoice updated successfully!");
        setDeletedFiles([]);
      })
      .catch(() => message.error("Update failed."));
  };

  const handleFileChange = ({ fileList: newFileList }: any) => {
    const removed = fileList.filter(
      (f) => !newFileList.some((newF: any) => newF.uid === f.uid)
    );
    const removedIds = removed
      .filter((file: any) => file.fileId)
      .map((file: any) => file.fileId);

    setDeletedFiles((prev) => [...prev, ...removedIds]);
    setFileList(newFileList);
    form.setFieldsValue({ uploaded_files: newFileList });
  };

  const fileProps = {
    name: "files",
    multiple: true,
    accept: ".jpg,.jpeg,.png,.pdf",
    beforeUpload: () => false,
    fileList,
    onChange: handleFileChange,
    onPreview: (file: any) => {
      const fileURL = file.url || URL.createObjectURL(file.originFileObj);
      window.open(fileURL, "_blank");
    },
    showUploadList: {
      showPreviewIcon: false,
      showDownloadIcon: false,
      showRemoveIcon: true,
    },
  };

  return (
    <div>
      {/* Custom styles for text size */}

      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isUpdating || isLoading}
        isSuccess={false}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item label="Vendor" name="vendor">
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
            <Form.Item label="Amount" name="amount">
              <Input
                addonBefore={<TbCoinTaka />}
                placeholder="Amount"
                type="number"
              />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item label="Date" name="date">
              <DatePicker
                format="YYYY-MM-DD"
                className="w-full"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item
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
                <p className="ant-upload-text text-lg font-medium">
                  Click or drag JPG, PNG, or PDF files to this area
                </p>
                <p className="ant-upload-hint text-base">
                  You can upload multiple files. Previously uploaded files can
                  also be removed. Click file name to open in new tab.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateInvoiceEntry;
