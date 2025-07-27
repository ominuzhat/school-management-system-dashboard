import {
  Card,
  Tag,
  Descriptions,
  Avatar,
  Divider,
  Typography,
  Space,
  Spin,
  Image,
  Button,
  List,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import {
  useAddCommentTicketMutation,
  useGetSingleTicketQuery,
} from "../api/ticketEndPoints";
import {
  UserOutlined,
  PaperClipOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { TextArea } = Input;

const priorityColors = {
  high: "red",
  medium: "orange",
  low: "green",
};

const statusColors = {
  open: "blue",
  closed: "red",
  in_progress: "orange",
  resolved: "purple",
};

const typeColors = {
  technical: "geekblue",
  billing: "purple",
  general: "cyan",
};

const TicketView = () => {
  const { ticketID } = useParams();
  const { data, isFetching, isLoading, refetch } = useGetSingleTicketQuery(
    Number(ticketID)
  );
  const [createComment] = useAddCommentTicketMutation();
  const [form] = Form.useForm();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: { content: string }) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("content", values.content);

      files.forEach((file) => {
        formData.append("attachments", file.originFileObj as Blob);
      });

      await createComment({
        id: Number(ticketID),
        data: formData,
      }).unwrap();

      message.success("Comment added successfully");
      form.resetFields();
      setFiles([]);
      refetch();
    } catch (err) {
      message.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadAttachment = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const beforeUpload = (file: File) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File must smaller than 5MB!");
    }
    return isLt5M;
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFiles(fileList);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!data?.data) {
    return <div>Ticket not found</div>;
  }

  const ticket = data.data;
  const createdBy = ticket.created_by;
  const institution = createdBy.role.institution;

  return (
    <div className="p-4">
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Card
        title={
          <Space>
            <Title level={4} className="!mb-0">
              {ticket.title}
            </Title>
            <Tag
              color={
                priorityColors[
                  ticket.priority as keyof typeof priorityColors
                ] || "default"
              }
              className="capitalize"
            >
              {ticket.priority}
            </Tag>
          </Space>
        }
        extra={
          <Space>
            <Tag
              color={
                statusColors[ticket.status as keyof typeof statusColors] ||
                "default"
              }
              className="capitalize"
            >
              {ticket.status.replace("_", " ")}
            </Tag>
            <Text type="secondary">
              Created {dayjs(ticket.created_at).fromNow()}
            </Text>
          </Space>
        }
        className="shadow-lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ticket Details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <Title level={5} className="!mb-4">
                Description
              </Title>
              <Text>{ticket.description}</Text>
            </div>

            <Divider orientation="left">
              Comments ({ticket.comments?.length || 0})
            </Divider>

            {/* Comment List */}
            {ticket.comments && ticket.comments.length > 0 ? (
              ticket.comments.map((comment: any, index: number) => (
                <div
                  key={index}
                  className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <Avatar
                      size="large"
                      icon={<UserOutlined />}
                      src={comment.author.profile_picture}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Text strong>{comment.author.username}</Text>
                        <Tag color="blue">{comment.author.role.name}</Tag>
                        <Text type="secondary" className="text-xs">
                          {dayjs(comment.created_at).format(
                            "MMM D, YYYY h:mm A"
                          )}
                        </Text>
                      </div>
                      <div className="mt-2 ml-0">
                        {comment.content === "undefined" ? (
                          <Text type="secondary" italic>
                            No message content
                          </Text>
                        ) : (
                          <Text>{comment.content}</Text>
                        )}
                      </div>

                      {comment.attachments?.length > 0 && (
                        <div className="mt-4">
                          <Divider
                            dashed
                            orientation="left"
                            className="!text-xs !mt-6"
                          >
                            <PaperClipOutlined /> ATTACHMENTS (
                            {comment.attachments.length})
                          </Divider>
                          <List
                            grid={{ gutter: 16, xs: 1, sm: 2 }}
                            dataSource={comment.attachments}
                            renderItem={(file: any) => (
                              <List.Item>
                                <Card
                                  size="small"
                                  hoverable
                                  cover={
                                    file.file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                      <Image
                                        height={200}
                                        width={400}
                                        alt="attachment"
                                        src={file.file}
                                        preview={{
                                          toolbarRender: (originalNode) => (
                                            <>
                                              {originalNode}
                                              <Button
                                                type="text"
                                                icon={<DownloadOutlined />}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  downloadAttachment(
                                                    file.file,
                                                    file.file.split("/").pop()
                                                  );
                                                }}
                                              />
                                            </>
                                          ),
                                        }}
                                      />
                                    ) : null
                                  }
                                  actions={[
                                    <Button
                                      type="text"
                                      icon={<DownloadOutlined />}
                                      onClick={() =>
                                        downloadAttachment(
                                          file.file,
                                          file.file.split("/").pop()
                                        )
                                      }
                                    >
                                      Download
                                    </Button>,
                                  ]}
                                >
                                  <Card.Meta
                                    title={
                                      <Text
                                        ellipsis
                                        style={{ maxWidth: "100%" }}
                                      >
                                        {file.file.split("/").pop()}
                                      </Text>
                                    }
                                    description={`Uploaded ${dayjs(
                                      file.uploaded_at
                                    ).fromNow()}`}
                                  />
                                </Card>
                              </List.Item>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 border border-dashed rounded-lg">
                <Text>No comments yet</Text>
              </div>
            )}

            {/* Add Comment Form */}
            <Card title="Add Comment" className="mt-6">
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your comment",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Type your comment here..."
                    maxLength={500}
                    showCount
                  />
                </Form.Item>

                <Form.Item label="Attachments">
                  <Upload
                    fileList={files}
                    onChange={handleFileChange}
                    beforeUpload={beforeUpload}
                    multiple
                    listType="picture-card"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  >
                    {files.length >= 4 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Post Comment
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

          {/* Right Column - Metadata */}
          <div>
            <Card title="Ticket Details" className="mb-4" bordered={false}>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Priority">
                  <Tag
                    color={
                      priorityColors[
                        ticket.priority as keyof typeof priorityColors
                      ] || "default"
                    }
                    className="capitalize"
                  >
                    {ticket.priority}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  <Tag
                    color={
                      typeColors[
                        ticket.ticket_type as keyof typeof typeColors
                      ] || "default"
                    }
                    className="capitalize"
                  >
                    {ticket.ticket_type}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                  {dayjs(ticket.created_at).format("MMMM D, YYYY h:mm A")}
                </Descriptions.Item>
                <Descriptions.Item label="Last Updated">
                  {dayjs(ticket.updated_at).format("MMMM D, YYYY h:mm A")}
                </Descriptions.Item>
                {ticket.resolved_at && (
                  <Descriptions.Item label="Resolved At">
                    {dayjs(ticket.resolved_at).format("MMMM D, YYYY h:mm A")}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>

            <Card title="Created By" className="mb-4" bordered={false}>
              <Space>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={createdBy.profile_picture}
                />
                <div>
                  <Text strong>{createdBy.username}</Text>
                  <div className="flex gap-1 mt-1">
                    <Tag color="blue">{createdBy.role.name}</Tag>
                    <Tag color={createdBy.is_active ? "green" : "red"}>
                      {createdBy.is_active ? "Active" : "Inactive"}
                    </Tag>
                  </div>
                  <Text type="secondary" className="block text-xs">
                    Joined {dayjs(createdBy.date_joined).fromNow()}
                  </Text>
                </div>
              </Space>
            </Card>

            <Card title="Institution" bordered={false}>
              <Space direction="vertical" className="w-full">
                <div className="flex items-center gap-2">
                  <Text strong>{institution.name}</Text>
                  <Tag color={institution.is_active ? "green" : "red"}>
                    {institution.is_active ? "Active" : "Inactive"}
                  </Tag>
                </div>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Code">
                    <Tag>{institution.code}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="City">
                    <Text>{institution.city}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    <Text>{institution.contact_email}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Current Session">
                    <Tag color="cyan">{institution.current_session.name}</Tag>
                    <Tag>{institution.current_session.status}</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TicketView;
