import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Input,
  InputNumber,
  Button,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import {
  useGetExamQuery,
  useGetSingleExamQuery,
} from "../../api/examEndPoints";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateExamMarkMutation } from "../api/markExamEndPoints";

const { Title, Text } = Typography;

const MarkExamPage = () => {
  const [form] = AntForm.useForm();
  const exam = AntForm.useWatch("exam", form);

  const [create, { isLoading, isSuccess }] = useCreateExamMarkMutation();
  const { data: examData } = useGetExamQuery({});
  const { data: examDetails } = useGetSingleExamQuery<any>(
    exam && Number(exam)
  );

  const [marks, setMarks] = useState<{ [key: string]: any }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const handleMarksChange = (
    studentId: string,
    subjectId: string,
    field: string,
    value: any
  ) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [`${studentId}-${subjectId}-${field}`]: value,
    }));
  };

  const handleCommentChange = (
    studentId: string,
    subjectId: string,
    value: string
  ) => {
    setComments((prevComments) => ({
      ...prevComments,
      [`${studentId}-${subjectId}`]: value,
    }));
  };

  const onFinish = (values: any): void => {
    const results = {
      name: values.name,
      session: values.session,
      grade_level: values.grade_level,
      marks: marks,
      comments: comments,
    };

    create(results);
  };

  // Table columns definition
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
          value={marks[`${record.studentId}-${record.subjectId}-mcq`] || ""}
          onChange={(value) =>
            handleMarksChange(record.studentId, record.subjectId, "mcq", value)
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
          value={marks[`${record.studentId}-${record.subjectId}-written`] || ""}
          onChange={(value) =>
            handleMarksChange(
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
          value={comments[`${record.studentId}-${record.subjectId}`] || ""}
          onChange={(e) =>
            handleCommentChange(
              record.studentId,
              record.subjectId,
              e.target.value
            )
          }
          style={{ width: "100%" }}
        />
      ),
    },
  ];

  const dataSource = examDetails?.data?.assigned_admissions
    ?.map((data: any) => {
      return data.subjects?.map((sub: any) => ({
        key: `${data.id}-${sub.id}`,
        roll: data.roll,
        studentName: `${data.student?.first_name} ${data.student?.last_name}`,
        studentId: data.id,
        subjectId: sub.id,
        subjectName: sub.name,
      }));
    })
    .flat();

  return (
    <div className="p-6 ">
      <Card
        title={
          <Title level={3} className="text-center text-blue-800">
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

          <Row justify="center" className="mt-6">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                className="bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Submit Marks
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default MarkExamPage;
