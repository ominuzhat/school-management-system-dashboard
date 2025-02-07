import {
  Card,
  Descriptions,
  Table,
  Typography,
  Divider,
  Badge,
  Row,
  Col,
  Tag,
  Spin,
} from "antd";
import {
  DollarCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetCollectSingleFeesQuery } from "../api/collectFeeEndPoints";

const { Title, Text } = Typography;

const SingleCollectFee = () => {
  const { collectFeeId } = useParams();
  const { data: singleData, isLoading } = useGetCollectSingleFeesQuery(
    Number(collectFeeId)
  );

  if (isLoading) return <Spin />;

  const feeData = singleData?.data;
  const student = feeData?.admission?.student;

  return (
    <Card
      title={
        <Title level={3} style={{ color: "#1890FF" }}>
          🎓 Collect Fee Details
        </Title>
      }
      bordered={false}
      style={{
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        background: "#F7F7F7",
        borderRadius: 10,
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Student Info Section */}
        <Col xs={24} md={12}>
          <Card
            type="inner"
            title={
              <Title level={4} style={{ color: "#333" }}>
                <UserOutlined style={{ color: "#1890FF" }} /> Student
                Information
              </Title>
            }
            bordered={false}
            style={{
              marginBottom: 16,
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Student Name">
                <Text strong>
                  {student?.first_name} {student?.last_name}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {student?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {student?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="DOB">
                {student?.date_of_birth}
              </Descriptions.Item>
              <Descriptions.Item label="Institution">
                {student?.user?.role?.institution?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Enrollment Date">
                <CalendarOutlined /> {student?.enrollment_date}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Payment Info Section */}
        <Col xs={24} md={12}>
          <Card
            type="inner"
            title={
              <Title level={4} style={{ color: "#333" }}>
                <DollarCircleOutlined style={{ color: "#1890FF" }} /> Payment
                Information
              </Title>
            }
            bordered={false}
            style={{
              marginBottom: 16,
              background: "#FFFFFF",
              borderRadius: 8,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Paid Amount">
                <Text strong style={{ color: "#1890FF" }}>
                  ৳ {feeData?.paid_amount}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {feeData?.payment_method}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Date">
                {feeData?.payment_date}
              </Descriptions.Item>
              <Descriptions.Item label="Fee Type">
                {feeData?.admission?.fee_type}
              </Descriptions.Item>
              <Descriptions.Item label="Monthly Fee">
                ৳ {feeData?.admission?.monthly_fee}
              </Descriptions.Item>
              <Descriptions.Item label="One-Time Fee">
                ৳ {feeData?.admission?.one_time_fee}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={feeData?.status === "Paid" ? "success" : "error"}
                  text={feeData?.status}
                  style={{ fontWeight: "bold" }}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Subjects Table */}
      <Card
        type="inner"
        title={
          <Title level={4} style={{ color: "#333" }}>
            <BookOutlined style={{ color: "#1890FF" }} /> Subjects
          </Title>
        }
        bordered={false}
        style={{ background: "#FFFFFF", borderRadius: 8 }}
      >
        <Table
          dataSource={feeData?.admission?.subjects}
          pagination={false}
          size="small"
          columns={[
            { title: "Subject Name", dataIndex: "name", key: "name" },
            { title: "Marks", dataIndex: "marks", key: "marks" },
            {
              title: "Class",
              dataIndex: ["grade_level", "name"],
              key: "grade_level",
            },
          ]}
        />
      </Card>

      <Divider />

      {/* Fees Table */}
      <Card
        type="inner"
        title="Fee Details"
        bordered={false}
        style={{ background: "#FFFFFF", borderRadius: 8 }}
      >
        <Table
          dataSource={feeData?.admission?.fees}
          pagination={false}
          size="small"
          columns={[
            { title: "Fee Name", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            {
              title: "One-Time",
              dataIndex: "one_time",
              key: "one_time",
              render: (oneTime) =>
                oneTime ? (
                  <Tag color="purple">One Time</Tag>
                ) : (
                  <Tag color="green">Regular</Tag>
                ),
            },
          ]}
        />
      </Card>

      <Divider />

      {/* Add-ons Table */}
      <Card
        type="inner"
        title="Additional Fees"
        bordered={false}
        style={{ background: "#FFFFFF", borderRadius: 8 }}
      >
        <Table
          dataSource={feeData?.add_ons}
          pagination={false}
          size="small"
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
          ]}
        />
      </Card>
    </Card>
  );
};

export default SingleCollectFee;
