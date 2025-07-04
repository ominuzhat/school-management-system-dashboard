import {
  Card,
  Typography,
  List,
  Avatar,
  Tag,
  Space,
  Grid,
  Row,
  Col,
  Badge,
} from "antd";
import {
  UserOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  DollarOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { useBreakpoint } = Grid;

const getFileIcon = (fileType: string) => {
  if (fileType.includes("pdf"))
    return <FilePdfOutlined style={{ color: "#f5222d" }} />;
  if (
    fileType.includes("image") ||
    fileType.includes("jpeg") ||
    fileType.includes("png")
  )
    return <FileImageOutlined style={{ color: "#52c41a" }} />;
  return <FileOutlined />;
};

const getStatusTag = (status: string) => {
  switch (status) {
    case "paid":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Paid
        </Tag>
      );
    case "partial":
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          Partial
        </Tag>
      );
    case "unpaid":
      return (
        <Tag icon={<ClockCircleOutlined />} color="error">
          Unpaid
        </Tag>
      );
    case "draft":
      return <Tag color="default">Draft</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ViewVendor = ({ record }: any) => {
  const screens = useBreakpoint();
  const vendor = record;

  if (!vendor) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Typography.Text type="secondary">
          Loading vendor data...
        </Typography.Text>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Vendor Profile Card */}
      <Card
        bordered={false}
        style={{
          background: "linear-gradient(135deg, #f6f7f9 0%, #e6f7ff 100%)",
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={8} md={6}>
            <div
              style={{
                display: "flex",
                justifyContent: screens.xs ? "center" : "flex-start",
              }}
            >
              <Avatar
                size={screens.xs ? 80 : 100}
                style={{
                  backgroundColor: "#1890ff",
                  fontSize: screens.xs ? 32 : 40,
                }}
                icon={<UserOutlined />}
              />
            </div>
          </Col>
          <Col xs={24} sm={16} md={18}>
            <Typography.Title level={3} style={{ marginBottom: "8px" }}>
              {vendor.name}
            </Typography.Title>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginBottom: "8px" }}
            >
              {vendor.purpose}
            </Typography.Text>

            <Space size="large" wrap>
              <Space>
                <MailOutlined style={{ color: "#1890ff" }} />
                <Typography.Text>{vendor.email}</Typography.Text>
              </Space>
              <Space>
                <PhoneOutlined style={{ color: "#52c41a" }} />
                <Typography.Text>{vendor.contact_number}</Typography.Text>
              </Space>
              <Space>
                <EnvironmentOutlined style={{ color: "#faad14" }} />
                <Typography.Text>{vendor.address}</Typography.Text>
              </Space>
              <Tag color={vendor.is_active ? "success" : "error"}>
                {vendor.is_active ? "Active" : "Inactive"}
              </Tag>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Invoices Section */}
      <Card
        title={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Invoices
          </Typography.Title>
        }
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <List
          itemLayout="vertical"
          dataSource={vendor.invoices}
          renderItem={(invoice: any) => (
            <List.Item
              key={invoice.id}
              style={{
                padding: "16px",
                margin: "8px 0",
                borderRadius: "8px",
                background: "#fafafa",
                borderLeft: `4px solid ${
                  invoice.payment_status === "paid"
                    ? "#52c41a"
                    : invoice.payment_status === "partial"
                    ? "#faad14"
                    : "#f5222d"
                }`,
              }}
            >
              <List.Item.Meta
                avatar={
                  <Badge
                    count={invoice.files.length}
                    style={{ backgroundColor: "#1890ff" }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#e6f7ff",
                        color: "#1890ff",
                        width: 50,
                        height: 50,
                      }}
                      icon={<FileOutlined />}
                    />
                  </Badge>
                }
                title={
                  <Space>
                    <Typography.Text strong>
                      {invoice.invoice_number}
                    </Typography.Text>
                    {getStatusTag(invoice.payment_status)}
                    {getStatusTag(invoice.status)}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={4}>
                    <Typography.Text>{invoice.description}</Typography.Text>
                    <Space>
                      <CalendarOutlined style={{ color: "#888" }} />
                      <Typography.Text type="secondary">
                        {dayjs(invoice.date).format("MMM D, YYYY")} - Due:{" "}
                        {dayjs(invoice.due_date).format("MMM D, YYYY")}
                      </Typography.Text>
                    </Space>
                    <Typography.Text>
                      Created by: {invoice.created_by.username} (
                      {invoice.created_by.role.name})
                    </Typography.Text>
                  </Space>
                }
              />

              <div style={{ marginTop: "12px" }}>
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={8}>
                    <Card
                      size="small"
                      title="Amount"
                      style={{ marginBottom: "16px" }}
                    >
                      <Space direction="vertical">
                        <Typography.Text strong>
                          Total: ৳{invoice.amount.toLocaleString()}
                        </Typography.Text>
                        <Typography.Text
                          type={invoice.amount_due > 0 ? "danger" : "success"}
                        >
                          Due: ৳{invoice.amount_due.toLocaleString()}
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          Paid: ৳
                          {(
                            invoice.amount - invoice.amount_due
                          ).toLocaleString()}
                        </Typography.Text>
                      </Space>
                    </Card>
                  </Col>

                  <Col xs={24} sm={12} md={8}>
                    <Card
                      size="small"
                      title="Files"
                      style={{ marginBottom: "16px" }}
                    >
                      <List
                        size="small"
                        dataSource={invoice.files}
                        renderItem={(file: any) => (
                          <List.Item>
                            <Space>
                              {getFileIcon(file.file_type)}
                              <a
                                href={file.file}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.file_name}
                              </a>
                              <Typography.Text type="secondary">
                                ({formatFileSize(file.file_size)})
                              </Typography.Text>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>

                  <Col xs={24} sm={24} md={8}>
                    <Card
                      size="small"
                      title="Payments"
                      style={{ marginBottom: "16px" }}
                    >
                      {invoice.payments.length > 0 ? (
                        <List
                          size="small"
                          dataSource={invoice.payments}
                          renderItem={(payment: any) => (
                            <List.Item>
                              <Space direction="vertical" size={2}>
                                <Space>
                                  <DollarOutlined
                                    style={{ color: "#52c41a" }}
                                  />
                                  <Typography.Text strong>
                                    ৳{payment.amount.toLocaleString()}
                                  </Typography.Text>
                                  <Tag>{payment.type}</Tag>
                                </Space>
                                <Typography.Text type="secondary">
                                  {dayjs(payment.payment_date).format(
                                    "MMM D, YYYY"
                                  )}
                                </Typography.Text>
                              </Space>
                            </List.Item>
                          )}
                        />
                      ) : (
                        <Typography.Text type="secondary">
                          No payments recorded
                        </Typography.Text>
                      )}
                    </Card>
                  </Col>
                </Row>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ViewVendor;
