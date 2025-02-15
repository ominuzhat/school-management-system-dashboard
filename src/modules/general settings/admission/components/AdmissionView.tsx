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
} from "antd";
import { ISingleAdmission } from "../type/admissionType";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";

const { Title, Text } = Typography;

const AdmissionView = () => {
  const { admissionId } = useParams();
  const { data: singleAdmissionData, isLoading } = useGetSingleAdmissionQuery(
    Number(admissionId)
  );

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const singleAdmission = singleAdmissionData?.data;

  if (
    !singleAdmission ||
    !("id" in singleAdmission) ||
    !("student" in singleAdmission)
  ) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        Error: Admission data not found
      </div>
    );
  }

  const {
    id,
    student,
    subjects = [],
    admission_date,
    fee_type,
    registration_number,
    previous_registration_number,

    one_time_fee,
    monthly_fee,
    session,
  }: ISingleAdmission = singleAdmission;

  const subjectColumns = [
    {
      title: "Subject Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
    },
    {
      title: "Class",
      dataIndex: ["grade_level", "name"],
      key: "grade_level",
    },
    {
      title: "Description",
      dataIndex: ["grade_level", "description"],
      key: "description",
    },
  ];
  const formattedFee = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <div className="pb-5">
        <BreadCrumb />
      </div>

      <Card
        style={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🎓 Admission Details
        </Title>
        <Card
          // title="🎓 Admission Details"
          // bordered={false}
          className="shadow-md rounded-lg"
        >
          <Descriptions
            bordered
            size="middle"
            layout="vertical"
            column={{ xs: 1, sm: 2, lg: 3 }}
          >
            <Descriptions.Item label="Admission ID">{id}</Descriptions.Item>
            <Descriptions.Item label="Admission Date">
              {admission_date}
            </Descriptions.Item>
            <Descriptions.Item label="Fee Type">
              <Tag color="blue">{fee_type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Registration Number">
              {registration_number}
            </Descriptions.Item>
            <Descriptions.Item label="Previous Registration Number">
              {previous_registration_number || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="One-Time Fee">
              <Tag color="green">{formattedFee(one_time_fee)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Monthly Fee">
              <Tag color="volcano">{formattedFee(monthly_fee)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Session">
              {session?.name}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Divider style={{ margin: "40px 0", fontSize: "18px" }}>
          Student & Institution Details
        </Divider>

        {/* Student & Institution Details */}
        <Row gutter={[24, 24]}>
          {/* Student Details */}
          <Col xs={24} md={12}>
            <Card
              title={
                <Text strong style={{ fontSize: "16px" }}>
                  Student Details
                </Text>
              }
              bordered
              style={{ backgroundColor: "#fafafa", borderRadius: "8px" }}
            >
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="Full Name">
                  {student?.first_name} {student?.last_name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {student?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {student?.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Enrollment Date">
                  {new Date(student?.enrollment_date).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  {student?.user?.role?.name}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Institution Details */}
          <Col xs={24} md={12}>
            <Card
              title={
                <Text strong style={{ fontSize: "16px" }}>
                  Institution Details
                </Text>
              }
              bordered
              style={{ backgroundColor: "#fafafa", borderRadius: "8px" }}
            >
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="Institution Name">
                  {student?.user?.role?.institution?.name}
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  {student?.user?.role?.institution?.city}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Email">
                  {student?.user?.role?.institution?.contact_email}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {student?.user?.role?.institution?.is_active ? (
                    <Tag color="green">Active</Tag>
                  ) : (
                    <Tag color="red">Inactive</Tag>
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        {/* Subjects */}
        <Card
          title="Subjects"
          bordered
          style={{ marginTop: "30px", borderRadius: "8px" }}
        >
          <Table
            dataSource={subjects}
            columns={subjectColumns}
            rowKey="id"
            pagination={false}
            bordered
          />
        </Card>
      </Card>
    </div>
  );
};

export default AdmissionView;
