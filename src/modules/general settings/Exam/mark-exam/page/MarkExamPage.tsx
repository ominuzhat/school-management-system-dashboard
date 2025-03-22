import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Input,
  InputNumber,
  Table,
  Typography,
} from "antd";
import { useState, useEffect } from "react";
import { useGetExamQuery } from "../../api/examEndPoints";
import { Form } from "../../../../../common/CommonAnt";
import {
  useCreateExamMarkMutation,
  useGetSingleExamMarksQuery,
} from "../api/markExamEndPoints";

const { Title } = Typography;

const MarkExamPage = () => {
  const [form] = AntForm.useForm();
  const exam = AntForm.useWatch("exam", form);

  const [create, { isLoading, isSuccess }] = useCreateExamMarkMutation();
  const { data: examData } = useGetExamQuery({});
  const { data: examDetails } = useGetSingleExamMarksQuery<any>(Number(exam), {
    skip: !exam,
  });

  const [studentData, setStudentData] = useState<{
    [key: string]: { mcq?: number; written?: number; comment?: string };
  }>({});

  useEffect(() => {
    if (examDetails?.data?.records) {
      const initialData: { [key: string]: any } = {};

      examDetails?.data?.records?.forEach((student: any) => {
        student?.subjects?.forEach((subject: any) => {
          initialData[`${student.id}-${subject.id}`] = {
            mcq: subject.mcq_marks_obtained || 0,
            written: subject.written_marks_obtained || 0,
            comment: subject.comment || "",
          };
        });
      });

      setStudentData(initialData);
    }
  }, [examDetails]);

  const handleInputChange = (
    studentId: string,
    subjectId: string,
    field: "mcq" | "written" | "comment",
    value: any
  ) => {
    setStudentData((prevData) => ({
      ...prevData,
      [`${studentId}-${subjectId}`]: {
        ...prevData[`${studentId}-${subjectId}`],
        [field]: value,
      },
    }));
  };

  const onFinish = (values: any): void => {
    const formattedResults = Object.entries(studentData).map(([key, value]) => {
      const [studentId, subjectId] = key.split("-");

      return {
        exam: values.exam,
        admission: Number(studentId),
        subject: Number(subjectId),
        mcq_marks_obtained: value.mcq || 0,
        written_marks_obtained: value.written || 0,
        comment: value.comment || "", // Ensure comment is passed properly
      };
    });

    create(formattedResults);
  };

  const columns: any = [
    {
      title: "Roll",
      dataIndex: "roll",
      key: "roll",
      align: "center",
      width: 100,
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
      width: 200,
    },
    {
      title: "Class",
      dataIndex: "gradeLevel",
      key: "gradeLevel",
      align: "center",
      width: 200,
      render: (title: any) => title || "N/A",
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
      align: "center",
      width: 200,
    },
    {
      title: "MCQ Marks",
      dataIndex: "mcqMarks",
      key: "mcqMarks",
      align: "center",
      width: 150,
      render: (text: any, record: any) => (
        <InputNumber
          placeholder="MCQ Marks"
          value={
            studentData[`${record.studentId}-${record.subjectId}`]?.mcq ??
            (record.mcq_marks_obtained || 0)
          }
          onChange={(value) =>
            handleInputChange(record.studentId, record.subjectId, "mcq", value)
          }
          style={{ width: "100%" }}
          min={0}
          max={100}
        />
      ),
    },
    {
      title: "Written Marks",
      dataIndex: "writtenMarks",
      key: "writtenMarks",
      align: "center",
      width: 150,
      render: (text: any, record: any) => (
        <InputNumber
          placeholder="Written Marks"
          value={
            studentData[`${record.studentId}-${record.subjectId}`]?.written ??
            (record.written_marks_obtained || 0)
          }
          onChange={(value) =>
            handleInputChange(
              record.studentId,
              record.subjectId,
              "written",
              value
            )
          }
          style={{ width: "100%" }}
          min={0}
          max={100}
        />
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      width: 200,
      render: (text: any, record: any) => (
        <Input
          placeholder="Enter Comment"
          value={
            studentData[`${record.studentId}-${record.subjectId}`]?.comment ??
            (record.comment || "")
          }
          onChange={(e) =>
            handleInputChange(
              record.studentId,
              record.subjectId,
              "comment",
              e.target.value
            )
          }
          style={{ width: "100%" }}
        />
      ),
    },
  ];

  const dataSource = examDetails?.data?.records?.flatMap((student: any) => {
    return student?.subjects?.map((subject: any) => ({
      key: `${student.id}-${subject.id}`,
      roll: student?.roll,
      studentName: `${student?.first_name} ${student?.last_name}`,
      studentId: student?.id,
      gradeLevel: student?.grade_level?.name,
      subjectId: subject?.id,
      subjectName: subject?.name,
      mcq_marks_obtained: subject.mcq_marks_obtained || 0,
      written_marks_obtained: subject.written_marks_obtained || 0,
      comment: subject.comment || "",
    }));
  });

  return (
    <div className="p-6 ">
      <Card
        title={
          <Title level={3} className="text-center pt-6">
            Exam Marks Entry
          </Title>
        }
        className="rounded-lg shadow-xl border-0"
        headStyle={{ borderBottom: "none" }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          isLoading={isLoading}
          isSuccess={isSuccess}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Select Exam"
                name="exam"
                rules={[{ required: true, message: "Exam is required!" }]}
              >
                <Select
                  placeholder="Select Exam Name"
                  className="w-full"
                  allowClear
                  showSearch
                  dropdownStyle={{ borderRadius: "8px" }}
                >
                  {Array.isArray(examData?.data) &&
                    examData?.data?.map((exam: any) => (
                      <Select.Option key={exam.id} value={exam.id}>
                        {exam?.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {exam && (
            <Table
              columns={columns}
              dataSource={dataSource}
              rowKey="key"
              pagination={false}
              bordered
              className="mt-6 rounded-lg shadow-sm"
              scroll={{ x: true }}
              rowClassName={() => "hover:bg-gray-50 transition-all"}
            />
          )}
        </Form>
      </Card>
    </div>
  );
};

export default MarkExamPage;
