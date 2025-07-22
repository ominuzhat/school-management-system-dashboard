import { useGetSingleVendorEntryQuery } from "../api/VendorEntryEndPoints";
import {
  Card,
  Descriptions,
  Tag,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  Badge,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  BankOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { TbCoinTaka } from "react-icons/tb";

const { Title, Text } = Typography;

const ViewVendorPaymentEntry = ({ record }: any) => {
  const { data: singleData, isLoading } =
    useGetSingleVendorEntryQuery<any>(record);

  if (isLoading) return <div>Loading...</div>;
  if (!singleData?.data) return <div>No payment data found</div>;

  const payment = singleData.data;
  const createdBy = payment.created_by;
  const paymentType = payment.type?.toUpperCase();

  const getPaymentTypeTag = () => {
    const typeMap: Record<string, { color: string }> = {
      CASH: { color: "green" },
      BANK: { color: "blue" },
      MFS: { color: "orange" },
      SSL: { color: "purple" },
      SURJOPAY: { color: "cyan" },
    };
    return (
      <Tag color={typeMap[paymentType]?.color || "default"}>{paymentType}</Tag>
    );
  };

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
                <Title level={3}>Payment Details</Title>
                <Space>
                  <Badge
                    status="success"
                    text={`৳${payment.amount?.toFixed(2) || "0.00"}`}
                  />
                  {getPaymentTypeTag()}
                </Space>
              </div>

              <Descriptions bordered column={1}>
                <Descriptions.Item label="Payment Date">
                  <Space>
                    <CalendarOutlined />
                    {payment.payment_date
                      ? dayjs(payment.payment_date).format("DD MMMM YYYY")
                      : "-"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Invoice">
                  <Space>
                    <FileTextOutlined />
                    {payment.invoice ? `INV-${payment.invoice}` : "-"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Account">
                  <Space>
                    <BankOutlined />
                    {payment.account ? `ACC-${payment.account}` : "-"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Reference">
                  <Space>
                    <CreditCardOutlined />
                    {payment.reference || "-"}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  <Space>
                    <InfoCircleOutlined />
                    {payment.description || "No description available"}
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </Space>
          </Card>

          <Divider />

          <Card title="Account Details">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Account Type">
                {payment.account_type || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Account/Merchant Number">
                {payment.account_or_merchant_number || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Account Name">
                {payment.account_name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Bank Name">
                {payment.bank_name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Branch Name">
                {payment.branch_name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Routing/API Key">
                <Text ellipsis style={{ maxWidth: "300px" }}>
                  {payment.routing_number_or_apikey || "-"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Gateway URL">
                {payment.gateway_url ? (
                  <a
                    href={payment.gateway_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {payment.gateway_url}
                  </a>
                ) : (
                  "-"
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Created By">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>
                <UserOutlined style={{ marginRight: 8 }} />
                {createdBy?.username || "-"}
              </Text>
              <Text>
                <Space>
                  <InfoCircleOutlined />
                  {createdBy?.role?.name || "-"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <CalendarOutlined />
                  Created on{" "}
                  {payment.created_at
                    ? dayjs(payment.created_at).format("DD MMM YYYY, hh:mm A")
                    : "-"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <BankOutlined />
                  {createdBy?.role?.institution?.name || "-"}
                </Space>
              </Text>
            </Space>
          </Card>

          <Divider />

          <Card title="Payment Summary">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text>
                <Space>
                  <TbCoinTaka />
                  <Text strong>Amount:</Text> ৳
                  {payment.amount?.toFixed(2) || "0.00"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <CalendarOutlined />
                  <Text strong>Date:</Text>{" "}
                  {payment.payment_date
                    ? dayjs(payment.payment_date).format("DD MMM YYYY")
                    : "-"}
                </Space>
              </Text>
              <Text>
                <Space>
                  <InfoCircleOutlined />
                  <Text strong>Type:</Text> {paymentType}
                </Space>
              </Text>
              <Text>
                <Space>
                  <BankOutlined />
                  <Text strong>Balance:</Text> ৳
                  {payment.balance?.toFixed(2) || "0.00"}
                </Space>
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider />
    </div>
  );
};

export default ViewVendorPaymentEntry;
