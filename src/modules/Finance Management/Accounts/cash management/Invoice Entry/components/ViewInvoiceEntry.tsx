import { useGetSingleInvoiceEntryQuery } from "../api/InvoiceEntryEndPoints";
import {
  Card,
  Descriptions,
  Tag,
  Space,
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Table,
} from "antd";
import {
  FilePdfOutlined,
  DownloadOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const ViewInvoiceEntry = ({ record }: any) => {
  const { data: singleData, isLoading } =
    useGetSingleInvoiceEntryQuery<any>(record);

  if (isLoading) return <div>Loading...</div>;
  if (!singleData?.data) return <div>No data found</div>;

  const invoice = singleData?.data;
  const vendor = invoice?.vendor;
  const createdBy = invoice?.created_by;
  const files = invoice?.files || [];
  const payments = invoice?.payments || [];

  const getStatusTag = (status?: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      draft: { color: "default", text: "Draft" },
      unpaid: { color: "orange", text: "Unpaid" },
      paid: { color: "green", text: "Paid" },
      partially_paid: { color: "blue", text: "Partially Paid" },
      cancelled: { color: "red", text: "Cancelled" },
    };
    return (
      <Tag color={status ? statusMap[status]?.color : "default"}>
        {status ? statusMap[status]?.text : "Unknown"}
      </Tag>
    );
  };

  const getPaymentStatusTag = (status?: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      unpaid: { color: "volcano", text: "Unpaid" },
      paid: { color: "green", text: "Paid" },
      partially_paid: { color: "blue", text: "Partially Paid" },
    };
    return (
      <Tag color={status ? statusMap[status]?.color : "default"}>
        {status ? statusMap[status]?.text : "Unknown"}
      </Tag>
    );
  };

  const fileColumns = [
    {
      title: "File",
      dataIndex: "file_name",
      key: "file_name",
      render: (text: string, record: any) => (
        <Space>
          <FilePdfOutlined style={{ fontSize: "20px", color: "#FF0000" }} />
          <a href={record?.file} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </Space>
      ),
    },
    {
      title: "Size",
      dataIndex: "file_size",
      key: "file_size",
      render: (size?: number) =>
        `${size ? (size / 1024).toFixed(2) : "0.00"} KB`,
    },
    {
      title: "Uploaded",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
      render: (date?: string) =>
        date ? dayjs(date).format("DD MMM YYYY, hh:mm A") : "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="link"
          icon={<DownloadOutlined />}
          href={record?.file}
          download
          target="_blank"
        />
      ),
    },
  ];

  const paymentColumns = [
    {
      title: "Date",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date?: string) =>
        date ? dayjs(date).format("DD MMM YYYY") : "-",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount?: number) => `$${amount?.toFixed(2) || "0.00"}`,
    },
    {
      title: "Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (method?: string) => method || "-",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      render: (ref?: string) => ref || "-",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title level={3}>
                  Invoice # {invoice?.invoice_number || "N/A"}
                </Title>
                <Space>
                  {getStatusTag(invoice?.status)}
                  {getPaymentStatusTag(invoice?.payment_status)}
                </Space>
              </div>

              <Descriptions bordered column={1}>
                <Descriptions.Item label="Invoice Date">
                  <Space>
                    <CalendarOutlined />
                    {invoice?.date
                      ? dayjs(invoice.date).format("DD MMMM YYYY")
                      : "N/A"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Due Date">
                  <Space>
                    <CalendarOutlined />
                    {invoice?.due_date
                      ? dayjs(invoice.due_date).format("DD MMMM YYYY")
                      : "N/A"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Amount">
                  <Space>
                    <DollarOutlined />${invoice?.amount?.toFixed(2) || "0.00"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Amount Due">
                  <Space>
                    <DollarOutlined />$
                    {invoice?.amount_due?.toFixed(2) || "0.00"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  <Space>
                    <InfoCircleOutlined />
                    {invoice?.description || "No description"}
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </Space>
          </Card>

          <Divider />

          <Card title="Attachments">
            <Table
              columns={fileColumns}
              dataSource={files}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Vendor Details">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>{vendor?.name || "N/A"}</Title>
              <Text>
                <Space>
                  <PhoneOutlined />
                  {vendor?.contact_number || "N/A"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <MailOutlined />
                  {vendor?.email || "N/A"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <HomeOutlined />
                  {vendor?.address || "N/A"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <InfoCircleOutlined />
                  {vendor?.purpose || "N/A"}
                </Space>
              </Text>
            </Space>
          </Card>

          <Divider />

          <Card title="Created By">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>
                <Space>
                  <UserOutlined />
                  {createdBy?.username || "N/A"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <InfoCircleOutlined />
                  {createdBy?.role?.name || "N/A"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <CalendarOutlined />
                  Created on{" "}
                  {invoice?.created_at
                    ? dayjs(invoice.created_at).format("DD MMM YYYY, hh:mm A")
                    : "N/A"}
                </Space>
              </Text>
            </Space>
          </Card>

          <Divider />

          <Card title="Payment History">
            {payments?.length > 0 ? (
              <Table
                columns={paymentColumns}
                dataSource={payments}
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <Text type="secondary">No payments recorded</Text>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />
    </div>
  );
};

export default ViewInvoiceEntry;
