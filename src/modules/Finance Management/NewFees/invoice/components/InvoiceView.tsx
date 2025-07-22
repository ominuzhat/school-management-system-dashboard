import { useGetSingleInvoiceQuery } from "../api/invoiceEndPoints";
import {
  Card,
  Typography,
  Divider,
  Row,
  Col,
  Table,
  Tag,
  Space,
  Descriptions,
  Badge,
  Spin,
  Image,
  Collapse,
  List,
} from "antd";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const InvoiceView = ({ record }: { record: string }) => {
  const { data, isLoading } = useGetSingleInvoiceQuery<any>(Number(record));

  if (isLoading) return <Spin size="large" />;
  if (!data) return <Text>Invoice not found</Text>;

  const invoice = data.data;
  const student = invoice?.collect_fee?.admission?.student;
  const admission = invoice?.collect_fee?.admission;
  const institution = student?.user?.role?.institution;
  const payment = invoice?.collect_fee;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "success";
      case "partial":
        return "warning";
      case "unpaid":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Particular",
      dataIndex: ["particular", "name"],
      key: "particular",
      render: (text: string) => <Text strong>{text?.trim()}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `৳${amount?.toFixed(2)}`,
    },
    {
      title: "Paid",
      dataIndex: "paid_amount",
      key: "paid_amount",
      render: (paid: number) => `৳${paid?.toFixed(2)}`,
    },
    {
      title: "Due",
      dataIndex: "due_amount",
      key: "due_amount",
      render: (due: number) => `৳${due?.toFixed(2)}`,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => (
        <Tag
          color={
            record.due_amount > 0
              ? getStatusColor("partial")
              : getStatusColor("paid")
          }
        >
          {record.due_amount > 0 ? "Partial" : "Paid"}
        </Tag>
      ),
    },
  ];

  return (
    <Card>
      {/* Header Section */}
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Image
            width={120}
            src={student?.image}
            fallback="https://via.placeholder.com/120"
            alt="Institution Logo"
          />
          <Title level={4} style={{ marginTop: 8, marginBottom: 0 }}>
            {institution?.name}
          </Title>
          <Text type="secondary">{institution?.city}</Text>
          <Paragraph>
            <Text type="secondary">{institution?.contact_email}</Text>
          </Paragraph>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Title level={3} style={{ marginBottom: 0 }}>
              INVOICE
            </Title>
            <Text strong>#{invoice?.invoice_number}</Text>
          </Space>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Space direction="vertical" align="end" style={{ width: "100%" }}>
            <Badge
              status={getStatusColor(invoice?.status)}
              text={
                <Text strong style={{ textTransform: "capitalize" }}>
                  {invoice?.status}
                </Text>
              }
            />
            <Text>
              Issued: {dayjs(invoice?.issue_date)?.format("MMM DD, YYYY")}
            </Text>
            <Text>Due: {dayjs(invoice?.due_date)?.format("MMM DD, YYYY")}</Text>
            <Text>
              Payment Date:{" "}
              {dayjs(payment?.payment_date)?.format("MMM DD, YYYY")}
            </Text>
          </Space>
        </Col>
      </Row>

      <Divider />

      {/* Student Information */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Student Information" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Name">
                {student?.first_name} {student?.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="Student ID">
                {student?.user?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {dayjs(student?.date_of_birth)?.format("MMM DD, YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Religion">
                {student?.religion}
              </Descriptions.Item>
              <Descriptions.Item label="Contact">
                {student?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {student?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {student?.present_address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Academic Information" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Class">
                {student?.current_grade_level?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Section">
                {student?.current_section?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Roll">
                {admission?.roll}
              </Descriptions.Item>
              <Descriptions.Item label="Registration No">
                {admission?.registration_number}
              </Descriptions.Item>
              <Descriptions.Item label="Group">
                {student?.group_type_display}
              </Descriptions.Item>
              <Descriptions.Item label="Shift">
                {student?.current_shift?.name} (
                {student?.current_shift?.start_time} -{" "}
                {student?.current_shift?.end_time})
              </Descriptions.Item>
              <Descriptions.Item label="Session">
                {student?.current_session?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Admission Date">
                {dayjs(admission?.admission_date)?.format("MMM DD, YYYY")}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Parent Information */}
      <Collapse ghost>
        <Panel header="Parent Information" key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Father's Information" size="small">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Name">
                    {student?.father_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {student?.father_number}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {student?.father_email || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Profession">
                    {student?.father_profession || "-"}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Mother's Information" size="small">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Name">
                    {student?.mother_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone">
                    {student?.mother_phone_number}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {student?.mother_email || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Profession">
                    {student?.mother_profession || "-"}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Panel>
      </Collapse>

      <Divider />

      {/* Subjects Information */}
      <Card title="Enrolled Subjects" size="small">
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
          dataSource={admission?.subjects}
          renderItem={(subject: any) => (
            <List.Item>
              <Tag color="blue" style={{ width: "100%", textAlign: "center" }}>
                {subject.name}
              </Tag>
            </List.Item>
          )}
        />
      </Card>

      <Divider />

      {/* Payment Summary */}
      <Card title="Payment Summary" size="small">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Total Amount">
                <Text strong>৳{invoice?.total_amount?.toFixed(2)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Total Paid">
                <Text type="success">৳{invoice?.total_paid?.toFixed(2)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Total Due">
                <Text type="danger">
                  ৳{(invoice?.total_amount - invoice?.total_paid)?.toFixed(2)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <Badge
                  status={getStatusColor(invoice?.status)}
                  text={
                    <Text strong style={{ textTransform: "capitalize" }}>
                      {invoice?.status}
                    </Text>
                  }
                />
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Payment Method">
                {payment?.account?.account_type || "Cash"}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Date">
                {dayjs(payment?.payment_date)?.format("MMM DD, YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Invoice Generated">
                {dayjs(invoice?.issue_date)?.format("MMM DD, YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Notes">
                {invoice?.notes || "-"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Fee Details Table */}
      <Table
        columns={columns}
        dataSource={invoice?.items}
        rowKey="id"
        pagination={false}
        bordered
        size="small"
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={1}>
                <Text strong>TOTAL</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong>৳{invoice?.total_amount?.toFixed(2)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text strong type="success">
                  ৳{invoice?.total_paid?.toFixed(2)}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text strong type="danger">
                  ৳{(invoice?.total_amount - invoice?.total_paid)?.toFixed(2)}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <Badge
                  status={getStatusColor(invoice?.status)}
                  text={
                    <Text strong style={{ textTransform: "capitalize" }}>
                      {invoice?.status}
                    </Text>
                  }
                />
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />

      <Divider />

      {/* Footer */}
      <Row justify="center">
        <Col>
          <Text type="secondary">
            Thank you for choosing {institution?.name}
          </Text>
        </Col>
      </Row>
    </Card>
  );
};

export default InvoiceView;
