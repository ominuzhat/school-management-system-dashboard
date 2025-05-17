import { useParams } from "react-router-dom";
import { useGetSingleAdmissionQuery } from "../api/admissionEndPoints";
import {
  Card,
  Row,
  Col,
  Typography,
  Table,
  Tag,
  Descriptions,
  Divider,
  Spin,
  Avatar,
  Badge,
  Statistic,
  Space,
  Collapse,
  Tabs,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  IdcardOutlined,
  BookOutlined,
  BankOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { capitalize } from "../../../../common/capitalize/Capitalize";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const AdmissionView = () => {
  const { admissionId } = useParams();
  const { data: singleAdmissionData, isLoading } =
    useGetSingleAdmissionQuery<any>(Number(admissionId));

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const singleAdmission = singleAdmissionData?.data;

  if (!singleAdmission || !("id" in singleAdmission)) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        Error: Admission data not found
      </div>
    );
  }

  const {
    student,
    subjects = [],
    admission_date,
    fee_type,
    registration_number,
    previous_registration_number,
    roll,
    one_time_fee,
    monthly_fee,
    session,
    grade_level,
    shift,
    section,
    due_amount,
    total_paid_amount,
    status,
    attendance_percent,
    total_present,
    total_absent,
  } = singleAdmission;

  const subjectColumns = [
    {
      title: "Subject",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Class",
      dataIndex: ["grade_level", "name"],
      key: "grade_level",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Status",
      key: "status",
      render: () => <Badge status="success" text="Active" />,
    },
  ];

  const formattedFee = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 2,
    }).format(amount);

  const getStatusTag = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Approved
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Pending
          </Tag>
        );
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  return (
    <div className="admission-view-container">
      <div className="page-header">
        <BreadCrumb />
        <Title level={2} className="page-title">
          Admission Details
        </Title>
      </div>

      <div className="admission-content">
        {/* Summary Cards Row */}
        <Row gutter={[16, 16]} className="summary-cards">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="summary-card" hoverable>
              <Statistic
                title="Admission Date"
                value={admission_date}
                prefix={<CalendarOutlined />}
                valueStyle={{ fontSize: 16 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="summary-card" hoverable>
              <Statistic
                title="Registration No"
                value={registration_number}
                prefix={<IdcardOutlined />}
                valueStyle={{ fontSize: 16 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="summary-card" hoverable>
              <Statistic
                title="One-Time Fee"
                value={formattedFee(one_time_fee)}
                prefix={<DollarOutlined />}
                valueStyle={{ fontSize: 16, color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="summary-card" hoverable>
              <Statistic
                title="Monthly Fee"
                value={formattedFee(monthly_fee)}
                prefix={<DollarOutlined />}
                valueStyle={{ fontSize: 16, color: "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="main-content">
          {/* Left Column */}
          <Col xs={24} lg={16}>
            <Tabs defaultActiveKey="1" className="detail-tabs">
              <TabPane tab="Admission Information" key="1">
                <Card className="detail-card">
                  <Descriptions
                    bordered
                    column={{ xs: 1, sm: 2 }}
                    size="middle"
                    labelStyle={{ fontWeight: 600 }}
                  >
                    <Descriptions.Item label="Fee Type">
                      <Tag color={fee_type === "class" ? "geekblue" : "purple"}>
                        {capitalize(fee_type)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Previous Registration">
                      {previous_registration_number || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Session">
                      <Text strong>{session?.name}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Class">
                      <Text strong>{grade_level}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Section">
                      <Text strong>{section?.name}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Shift">
                      <Text strong>{shift?.name}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Roll Number">
                      <Text strong>{roll}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      {getStatusTag(status)}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card title="Financial Summary" className="detail-card">
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Statistic
                        title="Total Due"
                        value={formattedFee(due_amount)}
                        valueStyle={{ color: "#cf1322" }}
                      />
                    </Col>
                    <Col xs={24} sm={12}>
                      <Statistic
                        title="Total Paid"
                        value={formattedFee(total_paid_amount)}
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Col>
                  </Row>
                </Card>

                <Card title="Attendance Summary" className="detail-card">
                  <Row gutter={16}>
                    <Col xs={24} sm={8}>
                      <Statistic
                        title="Attendance %"
                        value={attendance_percent}
                        suffix="%"
                      />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Statistic title="Present" value={total_present} />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Statistic title="Absent" value={total_absent} />
                    </Col>
                  </Row>
                </Card>
              </TabPane>

              <TabPane tab="Subjects" key="2">
                <Card className="detail-card">
                  <Table
                    dataSource={subjects}
                    columns={subjectColumns}
                    rowKey="id"
                    pagination={false}
                    bordered
                    size="middle"
                  />
                </Card>
              </TabPane>
            </Tabs>
          </Col>

          {/* Right Column - Student Profile */}
          <Col xs={24} lg={8}>
            <Card className="profile-card">
              <div className="profile-header">
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  src={student?.image}
                  className="profile-avatar"
                />
                <Title level={4} className="profile-name">
                  {student?.first_name} {student?.last_name}
                </Title>
                <Text type="secondary" className="profile-role">
                  {student?.user?.role?.name}
                </Text>
              </div>

              <Divider />

              <Descriptions column={1} size="small">
                <Descriptions.Item
                  label={
                    <Space>
                      <MailOutlined /> Email
                    </Space>
                  }
                >
                  <Text>{student?.email || "N/A"}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <PhoneOutlined /> Phone
                    </Space>
                  }
                >
                  <Text>{student?.phone_number || "N/A"}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <BookOutlined /> Gender
                    </Space>
                  }
                >
                  <Text>{student?.gender || "N/A"}</Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined /> Date of Birth
                    </Space>
                  }
                >
                  <Text>{student?.date_of_birth || "N/A"}</Text>
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Title level={5} className="section-title">
                <BankOutlined /> Institution Details
              </Title>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Name">
                  <Text>{student?.user?.role?.institution?.name || "N/A"}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  <Text>{student?.user?.role?.institution?.city || "N/A"}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Contact Email">
                  <Text>
                    {student?.user?.role?.institution?.contact_email || "N/A"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {student?.user?.role?.institution?.is_active ? (
                    <Tag color="green">Active</Tag>
                  ) : (
                    <Tag color="red">Inactive</Tag>
                  )}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Title level={5} className="section-title">
                Parent Information
              </Title>
              <Collapse ghost>
                <Panel header="Father's Details" key="1">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Name">
                      <Text>{student?.father_name || "N/A"}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      <Text>{student?.father_number || "N/A"}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Profession">
                      <Text>{student?.father_profession || "N/A"}</Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Panel>
                <Panel header="Mother's Details" key="2">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Name">
                      <Text>{student?.mother_name || "N/A"}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      <Text>{student?.mother_phone_number || "N/A"}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Profession">
                      <Text>{student?.mother_profession || "N/A"}</Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Panel>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdmissionView;
