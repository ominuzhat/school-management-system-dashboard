/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import {
  useGetSingleExamQuery,
  useLazyGetSingleExamWithGradeLevelPdfQuery,
} from "../api/examEndPoints";
import {
  Card,
  Typography,
  Table,
  Row,
  Col,
  Spin,
  Tag,
  Tabs,
  Avatar,
  Badge,
  Collapse,
  Button,
} from "antd";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  FileTextOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const ViewExam = () => {
  const { examId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [getSingleExamPdf, { data: singleExamPdf }] =
    useLazyGetSingleExamWithGradeLevelPdfQuery();
  const { data: singleData, isLoading } = useGetSingleExamQuery<any>(
    examId ? { examId: Number(examId) } : skipToken
  );

  useEffect(() => {
    if (singleExamPdf) {
      const url = URL.createObjectURL(singleExamPdf);
      setPdfUrl(url);
      window.open(url, "_blank");
    }
  }, [singleExamPdf]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleForm = (id: number) => {
    if (examId) {
      getSingleExamPdf({ id: Number(examId), grade_level: id });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const exam = singleData?.data;

  // Group timetables by grade level
  const gradeLevelTimetables = exam?.grade_level_structure?.map(
    (grade: any) => {
      const gradeTimetables = exam?.timetables?.filter(
        (timetable: any) => timetable.grade_level.id === grade.id
      );
      return {
        ...grade,
        timetables: gradeTimetables || [],
      };
    }
  );

  const timetableColumns = [
    {
      title: "Date & Time",
      key: "datetime",
      render: (record: any) => (
        <div>
          <div>
            <CalendarOutlined /> {dayjs(record.exam_date).format("DD MMM YYYY")}
          </div>
          <div className="text-sm text-gray-500">
            <ClockCircleOutlined />{" "}
            {dayjs(record.start_time, "HH:mm").format("hh:mm A")} -{" "}
            {dayjs(record.end_time, "HH:mm").format("hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      title: "Subject",
      key: "subject",
      render: (record: any) => (
        <div>
          <div className="font-medium">
            <BookOutlined /> {record.subject.name}
          </div>
          <div className="text-sm text-gray-500">
            {record.subject.group_type_display}
          </div>
        </div>
      ),
    },
    {
      title: "Marks",
      key: "marks",
      render: (record: any) => (
        <div className="space-y-1">
          <div>
            <Text strong>MCQ:</Text> {record.mcq_marks}
          </div>
          <div>
            <Text strong>Written:</Text> {record.written_marks}
          </div>
          <div>
            <Text strong>Total:</Text> {record.total_marks}
          </div>
          {record.contribution_marks && (
            <div>
              <Text strong>Contribution:</Text> {record.contribution_marks}
            </div>
          )}
        </div>
      ),
    },
  ];

  const renderStudentSubjects = (subjects: any[]) => {
    return (
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <Tag key={subject.id} color="blue">
            {subject.name} ({subject.group_type_display})
          </Tag>
        ))}
      </div>
    );
  };

  const renderStudentDetails = (student: any) => {
    return (
      <div className="space-y-2">
        <div>
          <Text strong>Email:</Text> {student.email}
        </div>
        <div>
          <Text strong>Phone:</Text> {student.phone_number}
        </div>
        <div>
          <Text strong>Current Grade:</Text> {student.current_grade_level.name}
        </div>
        <div>
          <Text strong>Current Section:</Text> {student.current_section.name}
        </div>
        <div>
          <Text strong>Current Shift:</Text> {student.current_shift.name}
        </div>
      </div>
    );
  };

  const renderAdmissionCard = (admission: any) => {
    return (
      <Card
        key={admission.id}
        className="mb-4 shadow-sm"
        title={
          <div className="flex items-center">
            <Avatar
              src={admission.student.image}
              icon={<UserOutlined />}
              className="mr-3"
            />
            <div>
              <div className="font-medium">
                {admission.student.first_name} {admission.student.last_name}
              </div>
              <div className="text-sm text-gray-500">
                Roll: {admission.roll} | Reg: {admission.registration_number}
              </div>
            </div>
          </div>
        }
        extra={
          <Tag color="orange" icon={<CheckCircleOutlined />}>
            {admission.status}
          </Tag>
        }
      >
        <Collapse bordered={false} ghost>
          <Panel header="Subjects" key="1">
            {renderStudentSubjects(admission.subjects)}
          </Panel>
          <Panel header="Student Details" key="2">
            {renderStudentDetails(admission.student)}
          </Panel>
        </Collapse>
      </Card>
    );
  };

  const renderGradeTimetable = (grade: any) => {
    return (
      <div className="mb-6">
        <Table
          columns={timetableColumns}
          dataSource={grade.timetables}
          rowKey="id"
          pagination={false}
          className="rounded-lg"
          bordered
          title={() => (
            <div className="flex items-center">
              <TeamOutlined className="mr-2" />
              <Text strong>Class {grade.name} Timetable</Text>
            </div>
          )}
        />
      </div>
    );
  };

  const renderGradeStructure = (grade: any) => {
    return (
      <div key={grade.id} className="mb-6">
        {grade.shifts.length > 0 ? (
          <div className="space-y-4">
            {grade.shifts.map((shift: any) => (
              <Card
                key={shift.id}
                size="small"
                title={
                  <span>
                    <ClockCircleOutlined className="mr-2" />
                    {shift.name} Shift
                  </span>
                }
                className="shadow-sm"
              >
                {shift.sections.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {shift.sections.map((section: any) => (
                      <Tag key={section.id} color="green">
                        Section {section.name}
                      </Tag>
                    ))}
                  </div>
                ) : (
                  <Text type="secondary">No sections assigned</Text>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Text type="secondary">No shifts assigned for this grade</Text>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-6">
        <Title level={2} className="text-blue-600 mb-1">
          {exam?.name}
        </Title>
        <div className="flex justify-center gap-4">
          <Tag color="purple" icon={<CalendarOutlined />}>
            Session: {exam?.session?.name}
          </Tag>
          <Tag color="orange" icon={<FileTextOutlined />}>
            Term: {exam?.term?.name}
          </Tag>
          <Tag color={exam?.session?.status === "open" ? "green" : "red"}>
            {exam?.session?.status?.toUpperCase()}
          </Tag>
        </div>
      </div>

      {/* Exam Details Cards */}
      <Card bordered={false} className="shadow-md rounded-lg mb-6">
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12} md={8}>
            <div className="space-y-3">
              <div>
                <Text strong className="text-gray-700 block">
                  Exam Name:
                </Text>
                <Text className="text-lg font-medium">{exam?.name}</Text>
              </div>
              <div>
                <Text strong className="text-gray-700 block">
                  Date Range:
                </Text>
                <div className="flex items-center gap-2">
                  {dayjs(exam?.start_date).format("DD MMM YYYY")}
                  <span>to</span>
                  {dayjs(exam?.end_date).format("DD MMM YYYY")}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className="space-y-3">
              <div>
                <Text strong className="text-gray-700 block">
                  Comment:
                </Text>
                <Text className={exam?.comment ? "" : "text-gray-400"}>
                  {exam?.comment || "No comments added"}
                </Text>
              </div>
              <div>
                <Text strong className="text-gray-700 block">
                  Created Date:
                </Text>
                <Text>{dayjs(exam?.created_at).format("DD MMM YYYY")}</Text>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <div className="space-y-3">
              <Text strong className="text-gray-700 block">
                Class:
              </Text>
              <div className="flex flex-wrap gap-2">
                {exam.grade_level_structure.map((grade: any) => (
                  <Tag color="geekblue">{grade.name}</Tag>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content Tabs - Grade Level Tabs */}
      <Tabs defaultActiveKey="1" className="shadow-lg rounded-lg">
        {gradeLevelTimetables?.map((grade: any) => (
          <TabPane
            tab={
              <div className="flex items-center justify-between gap-5">
                <span>
                  <SolutionOutlined />
                  Class {grade.name}
                </span>
                <Button
                  title={`Download Routine for Class ${grade.name}`}
                  size="small"
                  type="default"
                  style={{
                    color: "#c20a0a",
                    // background: "#3892E3",
                    border: "1px solid gray",
                  }}
                  onClick={() => handleForm(grade.id)}
                >
                  <FaFilePdf />
                </Button>
              </div>
            }
            key={`grade-${grade.id}`}
          >
            <Tabs defaultActiveKey="timetable" type="card">
              <TabPane tab="Timetable" key="timetable">
                {renderGradeTimetable(grade)}
              </TabPane>
              <TabPane tab="Assign Section" key="structure">
                {renderGradeStructure(grade)}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    Unassigned Students{" "}
                    <Badge count={grade.admissions?.length || 0} />
                  </span>
                }
                key="students"
              >
                <div className="space-y-4">
                  {grade.admissions?.length > 0 ? (
                    grade.admissions.map((admission: any) =>
                      renderAdmissionCard(admission)
                    )
                  ) : (
                    <Card>
                      <Text type="secondary">
                        No unassigned students for this grade
                      </Text>
                    </Card>
                  )}
                </div>
              </TabPane>
            </Tabs>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ViewExam;
