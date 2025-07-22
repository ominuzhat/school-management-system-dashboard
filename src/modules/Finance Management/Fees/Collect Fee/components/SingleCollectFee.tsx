import {
  Card,
  Descriptions,
  Table,
  Typography,
  Badge,
  Row,
  Col,
  Tag,
  Spin,
  Space,
  Statistic,
  Grid,
  Avatar,
} from "antd";
import {
  DollarCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
  IdcardOutlined,
  ContactsOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  SolutionOutlined,
  FileDoneOutlined,
  BankOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useGetCollectSingleFeesQuery } from "../api/collectFeeEndPoints";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const SingleCollectFee = () => {
  const { collectFeeId } = useParams();
  const { data: singleData, isLoading } = useGetCollectSingleFeesQuery(
    Number(collectFeeId)
  );
  const screens = useBreakpoint();

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" />
      </div>
    );

  const feeData = singleData?.data;
  const student = feeData?.admission?.student;
  const admission = feeData?.admission;
  const payment = feeData;
  const particulars =
    admission?.payments?.flatMap((payment: any) => payment.particulars) || [];

  // Payment status configuration
  type PaymentStatus = "paid" | "partial" | "unpaid" | "default" | "pending";
  const paymentStatusConfig: Record<
    PaymentStatus,
    { color: string; icon: React.ReactNode; text: string }
  > = {
    paid: {
      color: "#52c41a",
      icon: <CheckCircleOutlined />,
      text: "Paid",
    },
    partial: {
      color: "#faad14",
      icon: <ExclamationCircleOutlined />,
      text: "Partial",
    },
    unpaid: {
      color: "#ff4d4f",
      icon: <ExclamationCircleOutlined />,
      text: "Unpaid",
    },
    pending: {
      color: "#BC259C",
      icon: <ExclamationCircleOutlined />,
      text: "Pending",
    },
    default: {
      color: "#d9d9d9",
      icon: null,
      text: "Unknown",
    },
  };

  const getStatusConfig = (status: string) => {
    const lowerStatus = status?.toLowerCase() as PaymentStatus;
    return paymentStatusConfig[lowerStatus] ?? paymentStatusConfig.default;
  };

  // Responsive columns configuration
  const responsiveColumns = screens.xs ? 1 : screens.sm ? 2 : 3;

  return (
    <div
      style={{
        padding: screens.xs ? "12px" : "24px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          <SolutionOutlined
            style={{
              color: "#1890ff",
              marginRight: "12px",
            }}
          />
          Fee Collection Details
        </Title>
        <div>
          <Text strong style={{ marginRight: "8px" }}>
            Status:
          </Text>
          <Badge
            color={getStatusConfig(payment?.status).color}
            text={
              <Text
                strong
                style={{
                  textTransform: "capitalize",
                  color: getStatusConfig(payment?.status).color,
                }}
              >
                {getStatusConfig(payment?.status).text}
              </Text>
            }
          />
        </div>
      </div>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f6f7f9 0%, #e7e9ee 100%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Statistic
              title="Total Amount"
              value={payment?.total_amount}
              prefix={<DollarCircleOutlined style={{ color: "#3f8600" }} />}
              valueStyle={{ color: "#3f8600", fontSize: "24px" }}
              suffix="৳"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f6f7f9 0%, #e7e9ee 100%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Statistic
              title="Paid Amount"
              value={payment?.total_paid}
              prefix={<DollarCircleOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff", fontSize: "24px" }}
              suffix="৳"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f6f7f9 0%, #e7e9ee 100%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Statistic
              title="Due Amount"
              value={payment?.total_due}
              prefix={<DollarCircleOutlined style={{ color: "#cf1322" }} />}
              valueStyle={{ color: "#cf1322", fontSize: "24px" }}
              suffix="৳"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "linear-gradient(135deg, #f6f7f9 0%, #e7e9ee 100%)",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CalendarOutlined
                style={{
                  fontSize: "24px",
                  color: "#722ed1",
                  marginRight: "12px",
                }}
              />
              <div>
                <Text type="secondary">Payment Date</Text>
                <div style={{ fontSize: "18px", fontWeight: "500" }}>
                  {dayjs(payment?.payment_date).format("DD MMM YYYY")}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Student Information */}
      <Card
        title={
          <Space>
            <UserOutlined style={{ color: "#1890ff" }} />
            <Text strong style={{ fontSize: "18px" }}>
              Student Information
            </Text>
          </Space>
        }
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
        bordered={false}
        headStyle={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={8}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#1890ff",
                  marginRight: "16px",
                }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {student?.first_name} {student?.last_name}
                </Title>
                <Text type="secondary">Student ID: {student?.id}</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={16}>
            <Descriptions
              column={responsiveColumns}
              size="small"
              labelStyle={{
                fontWeight: "600",
                color: "#595959",
              }}
              contentStyle={{ fontWeight: "500" }}
            >
              <Descriptions.Item label="Roll No.">
                {admission?.roll}
              </Descriptions.Item>
              <Descriptions.Item label="Class">
                {admission?.grade_level}
              </Descriptions.Item>
              <Descriptions.Item label="Section">
                {admission?.section?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Session">
                {admission?.session?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Admission Date">
                {dayjs(admission?.admission_date).format("DD MMM YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student?.gender === "M" ? "Male" : "Female"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Contact Information */}
      <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ContactsOutlined style={{ color: "#1890ff" }} />
                <Text strong style={{ fontSize: "18px" }}>
                  Contact Information
                </Text>
              </Space>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              height: "100%",
            }}
            bordered={false}
            headStyle={{ borderBottom: "1px solid #f0f0f0" }}
          >
            <Descriptions
              column={1}
              size="small"
              labelStyle={{
                fontWeight: "600",
                color: "#595959",
                width: "150px",
              }}
              contentStyle={{ fontWeight: "500" }}
            >
              <Descriptions.Item
                label={
                  <Space>
                    <PhoneOutlined /> Phone
                  </Space>
                }
              >
                {student?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <MailOutlined /> Email
                  </Space>
                }
              >
                {student?.email || "-"}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <HomeOutlined /> Address
                  </Space>
                }
              >
                {student?.present_address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <TeamOutlined style={{ color: "#1890ff" }} />
                <Text strong style={{ fontSize: "18px" }}>
                  Parent Information
                </Text>
              </Space>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              height: "100%",
            }}
            bordered={false}
            headStyle={{ borderBottom: "1px solid #f0f0f0" }}
          >
            <Descriptions
              column={1}
              size="small"
              labelStyle={{
                fontWeight: "600",
                color: "#595959",
                width: "150px",
              }}
              contentStyle={{ fontWeight: "500" }}
            >
              <Descriptions.Item label="Father's Name">
                {student?.father_name}
              </Descriptions.Item>
              <Descriptions.Item label="Father's Phone">
                {student?.father_number}
              </Descriptions.Item>
              <Descriptions.Item label="Mother's Name">
                {student?.mother_name}
              </Descriptions.Item>
              <Descriptions.Item label="Mother's Phone">
                {student?.mother_phone_number}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Fee Particulars */}
      <Card
        title={
          <Space>
            <FileDoneOutlined style={{ color: "#1890ff" }} />
            <Text strong style={{ fontSize: "18px" }}>
              Fee Particulars
            </Text>
          </Space>
        }
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
        bordered={false}
        headStyle={{ borderBottom: "1px solid #f0f0f0" }}
        extra={
          <Text strong style={{ color: "#1890ff" }}>
            Payment Date: {dayjs(payment?.payment_date).format("DD MMM YYYY")}
          </Text>
        }
      >
        <Table
          dataSource={particulars}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
          style={{ borderRadius: "8px" }}
          columns={[
            {
              title: "Particular",
              dataIndex: "name",
              key: "name",
              render: (text, record: any) => (
                <Space>
                  <Text strong>{text.trim()}</Text>
                  {record?.is_carried_forward && (
                    <Tag color="orange" icon={<CreditCardOutlined />}>
                      Carried Forward
                    </Tag>
                  )}
                  {record?.is_add_on && (
                    <Tag color="purple" icon={<BankOutlined />}>
                      Add-on
                    </Tag>
                  )}
                </Space>
              ),
            },
            {
              title: "Due Month",
              dataIndex: "due_month",
              key: "due_month",
              render: (text) => (
                <Tag color="geekblue">
                  {text ? dayjs(text).format("MMM YYYY") : "-"}
                </Tag>
              ),
            },
            {
              title: "Type",
              dataIndex: "one_time",
              key: "type",
              render: (_, record: any) =>
                record?.one_time ? (
                  <Tag color="blue" icon={<IdcardOutlined />}>
                    One Time
                  </Tag>
                ) : (
                  <Tag color="green" icon={<CalendarOutlined />}>
                    Monthly
                  </Tag>
                ),
            },
            {
              title: "Amount",
              dataIndex: "amount",
              key: "amount",
              align: "right",
              render: (text) => <Text strong>৳{text.toLocaleString()}</Text>,
            },
            {
              title: "Paid",
              dataIndex: "paid_amount",
              key: "paid_amount",
              align: "right",
              render: (text) => (
                <Text type="success">৳{text.toLocaleString()}</Text>
              ),
            },
            {
              title: "Due",
              dataIndex: "due_amount",
              key: "due_amount",
              align: "right",
              render: (text) => (
                <Text type={text > 0 ? "danger" : "success"}>
                  ৳{text.toLocaleString()}
                </Text>
              ),
            },
          ]}
          summary={() => (
            <Table.Summary.Row
              style={{
                background: "#fafafa",
                fontWeight: "bold",
              }}
            >
              <Table.Summary.Cell index={0} colSpan={3}>
                <Text strong>Grand Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <Text strong>
                  ৳
                  {particulars
                    .reduce((sum: any, item: any) => sum + item.amount, 0)
                    .toLocaleString()}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right">
                <Text strong type="success">
                  ৳
                  {particulars
                    .reduce((sum: any, item: any) => sum + item.paid_amount, 0)
                    .toLocaleString()}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} align="right">
                <Text
                  strong
                  type={payment?.total_due > 0 ? "danger" : "success"}
                >
                  ৳
                  {particulars
                    .reduce((sum: any, item: any) => sum + item.due_amount, 0)
                    .toLocaleString()}
                </Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Card>

      {/* Subjects */}
      <Card
        title={
          <Space>
            <BookOutlined style={{ color: "#1890ff" }} />
            <Text strong style={{ fontSize: "18px" }}>
              Subjects
            </Text>
          </Space>
        }
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
        bordered={false}
        headStyle={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Row gutter={[16, 16]}>
          {admission?.subjects?.map((subject: any) => (
            <Col key={subject.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                size="small"
                style={{
                  textAlign: "center",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
                hoverable
              >
                <Text strong style={{ fontSize: "16px" }}>
                  {subject?.name}
                </Text>
                <div>
                  <Text type="secondary">{subject?.grade_level?.name}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default SingleCollectFee;

// import {
//   Card,
//   Descriptions,
//   Table,
//   Typography,
//   Divider,
//   Badge,
//   Row,
//   Col,
//   Tag,
//   Spin,
// } from "antd";
// import {
//   DollarCircleOutlined,
//   CalendarOutlined,
//   UserOutlined,
//   BookOutlined,
// } from "@ant-design/icons";
// import { useParams } from "react-router-dom";
// import { useGetCollectSingleFeesQuery } from "../api/collectFeeEndPoints";

// const { Title, Text } = Typography;

// const SingleCollectFee = () => {
//   const { collectFeeId } = useParams();
//   const { data: singleData, isLoading } = useGetCollectSingleFeesQuery(
//     Number(collectFeeId)
//   );

//   if (isLoading) return <Spin />;

//   const feeData = singleData?.data;
//   const student = feeData?.admission?.student;

//   return (
//     <Card
//       title={
//         <Title level={3} style={{ color: "#1890FF" }}>
//           🎓 Collect Fee Details
//         </Title>
//       }
//       bordered={false}
//       style={{
//         boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
//         background: "#F7F7F7",
//         borderRadius: 10,
//       }}
//     >
//       <Row gutter={[24, 24]}>
//         {/* Student Info Section */}
//         <Col xs={24} md={12}>
//           <Card
//             type="inner"
//             title={
//               <Title level={4} style={{ color: "#333" }}>
//                 <UserOutlined style={{ color: "#1890FF" }} /> Student
//                 Information
//               </Title>
//             }
//             bordered={false}
//             style={{
//               marginBottom: 16,
//               background: "#FFFFFF",
//               borderRadius: 8,
//               boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Descriptions column={1} size="small">
//               <Descriptions.Item label="Student Name">
//                 <Text strong>
//                   {student?.first_name} {student?.last_name}
//                 </Text>
//               </Descriptions.Item>
//               <Descriptions.Item label="Email">
//                 {student?.email}
//               </Descriptions.Item>
//               <Descriptions.Item label="Phone">
//                 {student?.phone_number}
//               </Descriptions.Item>
//               <Descriptions.Item label="DOB">
//                 {student?.date_of_birth}
//               </Descriptions.Item>
//               <Descriptions.Item label="Institution">
//                 {student?.user?.role?.institution?.name}
//               </Descriptions.Item>
//               <Descriptions.Item label="Enrollment Date">
//                 <CalendarOutlined /> {student?.enrollment_date}
//               </Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>

//         {/* Payment Info Section */}
//         <Col xs={24} md={12}>
//           <Card
//             type="inner"
//             title={
//               <Title level={4} style={{ color: "#333" }}>
//                 <DollarCircleOutlined style={{ color: "#1890FF" }} /> Payment
//                 Information
//               </Title>
//             }
//             bordered={false}
//             style={{
//               marginBottom: 16,
//               background: "#FFFFFF",
//               borderRadius: 8,
//               boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Descriptions column={1} size="small">
//               <Descriptions.Item label="Paid Amount">
//                 <Text strong style={{ color: "#1890FF" }}>
//                   ৳ {feeData?.paid_amount}
//                 </Text>
//               </Descriptions.Item>
//               <Descriptions.Item label="Payment Method">
//                 {feeData?.payment_method}
//               </Descriptions.Item>
//               <Descriptions.Item label="Payment Date">
//                 {feeData?.payment_date}
//               </Descriptions.Item>
//               <Descriptions.Item label="Fee Type">
//                 {feeData?.admission?.fee_type}
//               </Descriptions.Item>
//               <Descriptions.Item label="Discount Type">
//                 {feeData?.discount_type}
//               </Descriptions.Item>
//               <Descriptions.Item label="Discount Amount">
//                 ৳ {feeData?.discount_value}
//               </Descriptions.Item>
//               <Descriptions.Item label="Monthly Fee">
//                 ৳ {feeData?.admission?.monthly_fee}
//               </Descriptions.Item>
//               <Descriptions.Item label="One-Time Fee">
//                 ৳ {feeData?.admission?.one_time_fee}
//               </Descriptions.Item>
//               <Descriptions.Item label="Status">
//                 <Badge
//                   status={feeData?.status === "Paid" ? "success" : "error"}
//                   text={feeData?.status}
//                   style={{ fontWeight: "bold" }}
//                 />
//               </Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>
//       </Row>

//       <Divider />

//       {/* Subjects Table */}
//       <Card
//         type="inner"
//         title={
//           <Title level={4} style={{ color: "#333" }}>
//             <BookOutlined style={{ color: "#1890FF" }} /> Subjects
//           </Title>
//         }
//         bordered={false}
//         style={{ background: "#FFFFFF", borderRadius: 8 }}
//       >
//         <Table
//           dataSource={feeData?.admission?.subjects}
//           pagination={false}
//           size="small"
//           columns={[
//             { title: "Subject Name", dataIndex: "name", key: "name" },
//             { title: "Marks", dataIndex: "marks", key: "marks" },
//             {
//               title: "Class",
//               dataIndex: ["grade_level", "name"],
//               key: "grade_level",
//             },
//           ]}
//         />
//       </Card>

//       <Divider />

//       {/* Fees Table */}
//       <Card
//         type="inner"
//         title="Fee Details"
//         bordered={false}
//         style={{ background: "#FFFFFF", borderRadius: 8 }}
//       >
//         <Table
//           dataSource={feeData?.admission?.fees}
//           pagination={false}
//           size="small"
//           columns={[
//             { title: "Fee Name", dataIndex: "name", key: "name" },
//             { title: "Amount", dataIndex: "amount", key: "amount" },
//             {
//               title: "One-Time",
//               dataIndex: "one_time",
//               key: "one_time",
//               render: (oneTime) =>
//                 oneTime ? (
//                   <Tag color="purple">One Time</Tag>
//                 ) : (
//                   <Tag color="green">Regular</Tag>
//                 ),
//             },
//           ]}
//         />
//       </Card>

//       <Divider />

//       {/* Add-ons Table */}
//       <Card
//         type="inner"
//         title="Additional Fees"
//         bordered={false}
//         style={{ background: "#FFFFFF", borderRadius: 8 }}
//       >
//         <Table
//           dataSource={feeData?.add_ons}
//           pagination={false}
//           size="small"
//           columns={[
//             { title: "Name", dataIndex: "name", key: "name" },
//             { title: "Amount", dataIndex: "amount", key: "amount" },
//           ]}
//         />
//       </Card>
//     </Card>
//   );
// };

// export default SingleCollectFee;
