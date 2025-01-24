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
  Space,
  Spin,
} from "antd";
import { ISingleAdmission } from "../type/admissionType";

const { Title, Text } = Typography;

const AdmissionView = () => {
  const { admissionId } = useParams();
  const { data: singleAdmissionData, isLoading } = useGetSingleAdmissionQuery(
    Number(admissionId)
  );
  if (isLoading) {
    return <Spin />;
  }

  const singleAdmission = singleAdmissionData?.data;

  if (
    !singleAdmission ||
    !("id" in singleAdmission) ||
    !("student" in singleAdmission)
  ) {
    return <div>Error: Admission data not found</div>;
  }

  const {
    id,
    student,
    subjects = [],
    admission_date,
    fee_type,
    registration_number,
    previous_registration_number,
    discount_type,
    discount_value,
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

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Admission Details
        </Title>

        <Descriptions bordered layout="vertical" size="middle">
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
            {previous_registration_number}
          </Descriptions.Item>
          <Descriptions.Item label="One Time Fee">
            ৳{one_time_fee}
          </Descriptions.Item>
          <Descriptions.Item label="Monthly Fee">
            ৳{monthly_fee}
          </Descriptions.Item>
          <Descriptions.Item label="Discount">
            {discount_type} - {discount_value}%
          </Descriptions.Item>
          <Descriptions.Item label="Session">{session?.name}</Descriptions.Item>
        </Descriptions>

        <Divider style={{ margin: "30px 0" }}>Details</Divider>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card
              title={
                <Space>
                  <Text strong style={{ fontSize: "16px" }}>
                    Student Details
                  </Text>
                  <Tag color="green">Active</Tag>
                </Space>
              }
              bordered
              style={{ backgroundColor: "#f9f9f9" }}
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
                <Descriptions.Item label="Institution">
                  {student?.user?.role?.institution?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Institution Code">
                  {student?.user?.role?.institution?.code}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title={
                <Space>
                  <Text strong style={{ fontSize: "16px" }}>
                    Institution Details
                  </Text>
                  {student?.user?.role?.institution?.is_active ? (
                    <Tag color="green">Active</Tag>
                  ) : (
                    <Tag color="red">Inactive</Tag>
                  )}
                </Space>
              }
              bordered
              style={{ backgroundColor: "#f9f9f9" }}
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

        <Card title="Subjects" bordered style={{ marginTop: "30px" }}>
          <Table
            dataSource={subjects}
            columns={subjectColumns}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </Card>
    </div>
  );
};

export default AdmissionView;
