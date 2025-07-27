import { Card, Col, Input, Modal, Row, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form } from "../../../../common/CommonAnt";
import { useState } from "react";
import { useCreateTicketMutation } from "../api/ticketEndPoints";

const { Option } = Select;

const ticketTypes = ["Technical", "Billing", "General"];

const CreateTicket = () => {
  const [create, { isLoading, isSuccess }] = useCreateTicketMutation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("ticket_type", values.ticket_type);
    formData.append("content", values.content);

    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("attachments", file.originFileObj);
      });
    }

    create(formData);
  };

  return (
    <Form
      onFinish={onFinish}
      isLoading={isLoading}
      isSuccess={isSuccess}
      initialValues={{ ticket_type: "general" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Title is required" }]}
                >
                  <Input placeholder="Enter ticket title" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Ticket Type" name="ticket_type">
                  <Select placeholder="Select ticket type">
                    {ticketTypes.map((type) => (
                      <Option key={type} value={type.toLowerCase()}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Subject"
                  name="description"
                  rules={[{ required: true, message: "Enter subject" }]}
                >
                  <Input placeholder="Describe your issue in detail..." />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Form.Item
              label="Comment"
              name="content"
              rules={[{ required: true, message: "Enter a comment" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Write your comment here..."
              />
            </Form.Item>

            <Form.Item label="Attachments" name="attachments">
              <Upload
                beforeUpload={() => false}
                maxCount={5}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
              <Modal
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="preview"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateTicket;
