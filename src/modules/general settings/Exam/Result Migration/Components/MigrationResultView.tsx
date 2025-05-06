import { useParams } from "react-router-dom";
import { useGetSingleResultMigrationQuery } from "../api/resultMigrationEndPoints";
import {
  Card,
  Descriptions,
  Table,
  Tag,
  Typography,
  Divider,
  Row,
  Col,
  Spin,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const MigrationResultView = () => {
  const { roleId } = useParams();
  const { data, isLoading } = useGetSingleResultMigrationQuery<any>(
    Number(roleId)
  );

  if (isLoading)
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      />
    );

  const student = data?.data?.admission?.student;
  const admission = data?.data?.admission;
  const exam = data?.data?.results?.[0]?.exam;
  const result = data?.data?.results?.[0];

  const subjectColumns = [
    {
      title: "Subject",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      render: (marks: number) =>
        `${marks}/${
          admission?.subjects?.find((s: any) => s.name === marks)?.marks || 100
        }`,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade: string) => (
        <Tag color={grade === "F" ? "red" : "green"}>{grade}</Tag>
      ),
    },
  ];

  const marksColumns = [
    {
      title: "Component",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Marks",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Student Information Card */}
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            <UserOutlined /> Student Information
          </Title>
        }
        style={{ marginBottom: "20px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Name">
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
            </Descriptions>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Roll Number">
                <Tag color="blue">{admission?.roll}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Registration No.">
                {admission?.registration_number}
              </Descriptions.Item>
              <Descriptions.Item label="Admission Date">
                {dayjs(admission?.admission_date).format("DD MMM YYYY")}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Class">
                <Tag icon={<BookOutlined />}>{admission?.grade_level}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Shift">
                {admission?.shift?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Session">
                {admission?.session?.name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Exam Information Card */}
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            <CalendarOutlined /> Exam Information
          </Title>
        }
        style={{ marginBottom: "20px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Exam Name">
                {exam?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Term">
                {data?.term?.name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Start Date">
                {dayjs(exam?.start_date).format("DD MMM YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {dayjs(exam?.end_date).format("DD MMM YYYY")}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Result Summary Card */}
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            <IdcardOutlined /> Result Summary
          </Title>
        }
        style={{ marginBottom: "20px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Total Marks">
                <Text strong>
                  {result?.total_marks}/{result?.total_exam_mark}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Percentage">
                <Tag color="blue">{result?.total_marks_percentage}%</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Descriptions column={1}>
              <Descriptions.Item label="Final Grade">
                <Tag
                  color={result?.grade === "F" ? "red" : "green"}
                  style={{ fontSize: "1.2rem" }}
                >
                  {result?.grade}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={result?.is_passed ? "green" : "red"}>
                  {result?.is_passed ? "Passed" : "Failed"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Subject-wise Marks */}
      <Card
        title={
          <Title level={4} style={{ margin: 0 }}>
            <BookOutlined /> Subject-wise Performance
          </Title>
        }
        style={{ marginBottom: "20px" }}
      >
        <Table
          columns={subjectColumns}
          dataSource={admission?.subjects?.map((subject: any) => ({
            key: subject.id,
            name: subject.name,
            marks:
              result?.marks?.find((m: any) => m.subject === subject.name)
                ?.total_marks || 0,
            grade:
              result?.marks?.find((m: any) => m.subject === subject.name)
                ?.grade || "-",
          }))}
          pagination={false}
          size="middle"
        />
      </Card>

      {/* Detailed Marks Breakdown */}
      {result?.marks?.map((mark: any, index: number) => (
        <Card
          key={index}
          title={
            <Title level={5} style={{ margin: 0 }}>
              {mark.subject} Detailed Marks
            </Title>
          }
          style={{ marginBottom: "20px" }}
        >
          <Table
            columns={marksColumns}
            dataSource={[
              { key: "1", type: "MCQ Marks", value: mark.mcq_marks },
              { key: "2", type: "Written Marks", value: mark.written_marks },
              { key: "3", type: "Total Marks", value: mark.total_marks },
              {
                key: "4",
                type: "Contribution Mark",
                value: mark.contribution_mark,
              },
              {
                key: "5",
                type: "Percentage",
                value: `${mark.contribution_mark_percentage}%`,
              },
            ]}
            pagination={false}
            size="small"
          />
          {mark.comment && (
            <>
              <Divider />
              <Text strong>Teacher's Comment:</Text>
              <p>{mark.comment}</p>
            </>
          )}
        </Card>
      ))}

      <Divider />

      <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
        Result generated on{" "}
        {dayjs(data?.created_at).format("DD MMM YYYY hh:mm A")}
      </Text>
    </div>
  );
};

export default MigrationResultView;
