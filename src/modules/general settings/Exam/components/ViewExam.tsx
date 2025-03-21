import { useParams } from "react-router-dom";
import { useGetSingleExamQuery } from "../api/examEndPoints";
import { Card, Typography, Table, Row, Col, Spin, Tag } from "antd";

const { Title, Text } = Typography;

const ViewExam = () => {
  const { examId } = useParams();
  const { data: singleData, isLoading } = useGetSingleExamQuery(Number(examId));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const exam = singleData?.data as any;

  const columns = [
    { title: "Exam Date", dataIndex: "exam_date", key: "exam_date" },
    { title: "Start Time", dataIndex: "start_time", key: "start_time" },
    { title: "End Time", dataIndex: "end_time", key: "end_time" },
    { title: "MCQ Marks", dataIndex: "mcq_marks", key: "mcq_marks" },
    {
      title: "Written Marks",
      dataIndex: "written_marks",
      key: "written_marks",
    },
    { title: "Total Marks", dataIndex: "total_marks", key: "total_marks" },
    {
      title: "Contribution Marks",
      dataIndex: "contribution_marks",
      key: "contribution_marks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passing_marks",
      key: "passing_marks",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <Title level={2} className="text-blue-600">
          {exam?.name} - {exam?.session?.name}
        </Title>
        <Text type="secondary" className="text-gray-600">
          Term: {exam?.term?.name}
        </Text>
      </div>

      {/* Exam Details Card */}
      <Card bordered={false} className="shadow-lg rounded-lg mb-8">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <div className="space-y-4">
              <div>
                <Text strong className="text-gray-700">
                  Grade Level:
                </Text>{" "}
                <Tag color="blue">
                  {exam?.grade_level.map((s: any) => s.name).join(", ")}
                  {/* {exam?.grade_level?.name} */}
                </Tag>
              </div>
              <div>
                <Text strong className="text-gray-700">
                  Section:
                </Text>{" "}
                <Tag color="green">
                  {exam?.section.map((s: any) => s.name).join(", ")}
                </Tag>
              </div>
              <div>
                <Text strong className="text-gray-700">
                  Start Date:
                </Text>{" "}
                <Text className="text-gray-600">{exam?.start_date}</Text>
              </div>
              <div>
                <Text strong className="text-gray-700">
                  End Date:
                </Text>{" "}
                <Text className="text-gray-600">{exam?.end_date}</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="space-y-4">
              <div>
                <Text strong className="text-gray-700">
                  Class Score Contribution:
                </Text>{" "}
                <Tag
                  color={
                    exam?.class_score_exam_score_contribution ? "green" : "red"
                  }
                >
                  {exam?.class_score_exam_score_contribution ? "Yes" : "No"}
                </Tag>
              </div>
              <div>
                <Text strong className="text-gray-700">
                  Comment:
                </Text>{" "}
                <Text className="text-gray-600">
                  {exam?.comment || "No comments"}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Exam Timetable Section */}
      <Card bordered={false} className="shadow-lg rounded-lg">
        <Title level={4} className="text-blue-600 mb-4">
          Exam Timetable
        </Title>
        <Table
          columns={columns}
          dataSource={exam?.timetables}
          rowKey="id"
          pagination={false}
          className="rounded-lg"
          bordered
        />
      </Card>
    </div>
  );
};

export default ViewExam;
