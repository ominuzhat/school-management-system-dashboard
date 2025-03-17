import { useParams } from "react-router-dom";
import { useGetSingleResultsQuery } from "../api/resultsEndPoints";
import { Card, Row, Col, Typography, Divider, Table, Spin, Badge } from "antd";

const { Title, Text } = Typography;

const ResultView = () => {
  const { resultId } = useParams();
  const { data: singleData } = useGetSingleResultsQuery<any>(Number(resultId));

  const result = singleData?.data;

  if (!result) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const columns: any = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      align: "center",
    },
    {
      title: "MCQ Marks",
      dataIndex: "mcq_marks",
      key: "mcq_marks",
      align: "center",
    },
    {
      title: "Written Marks",
      dataIndex: "written_marks",
      key: "written_marks",
      align: "center",
    },
    {
      title: "Total Marks",
      dataIndex: "total_marks",
      key: "total_marks",
      align: "center",
      render: (text: number) => <Text strong>{text}</Text>,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      align: "center",
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <Card className="rounded-lg shadow-xl p-8 bg-white">
        <Title
          level={2}
          className="text-center text-blue-700 font-semibold mb-6"
        >
          📜 Student Result Details
        </Title>

        {/* Student Information */}
        <Card className="rounded-lg shadow-md border border-blue-200 bg-blue-50 mb-6">
          <Title level={4} className="text-gray-800 mb-4">
            🎓 Student Information
          </Title>
          <Divider className="my-2" />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Name:</Text>{" "}
              <Text>
                {result.admission.student.first_name}{" "}
                {result.admission.student.last_name}
              </Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Roll:</Text> <Text>{result.admission.roll}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Admission Date:</Text>{" "}
              <Text>{result.admission.admission_date}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Grade Level:</Text>{" "}
              <Text>{result.admission.grade_level}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Contact:</Text>{" "}
              <Text>{result.admission.student.contact_phone_number}</Text>
            </Col>
          </Row>
        </Card>

        {/* Exam Information */}
        <Card className="rounded-lg shadow-md border border-purple-200 bg-purple-50 mb-6">
          <Title level={4} className="text-gray-800 mb-4">
            📚 Exam Information
          </Title>
          <Divider className="my-2" />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Exam Name:</Text> <Text>{result.exam.name}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Session:</Text>{" "}
              <Text>{result.exam.session.name}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Term:</Text> <Text>{result.exam.term.name}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Start Date:</Text>{" "}
              <Text>{result.exam.start_date}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>End Date:</Text> <Text>{result.exam.end_date}</Text>
            </Col>
          </Row>
        </Card>

        {/* Result Summary */}
        <Card className="rounded-lg shadow-md border border-green-200 bg-green-50 mb-6">
          <Title level={4} className="text-gray-800 mb-4">
            📊 Result Summary
          </Title>
          <Divider className="my-2" />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Total Marks:</Text> <Text>{result.total_marks}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Contribution Marks:</Text>{" "}
              <Text>{result.contribution_marks}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Grade:</Text> <Text>{result.grade}</Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Text strong>Status:</Text>{" "}
              <Badge
                count={result.is_passed ? "Passed" : "Failed"}
                style={{
                  backgroundColor: result.is_passed ? "#52c41a" : "#ff4d4f",
                }}
              />
            </Col>
          </Row>
        </Card>

        {/* Marks Table */}
        <Card className="rounded-lg shadow-md border border-gray-200 bg-white">
          <Title level={4} className="text-gray-800 mb-4">
            📑 Subject-wise Marks
          </Title>
          <Divider className="my-2" />
          <Table
            columns={columns}
            dataSource={result.marks}
            rowKey="subject"
            pagination={false}
            bordered
            className="rounded-lg"
          />
        </Card>
      </Card>
    </div>
  );
};

export default ResultView;
