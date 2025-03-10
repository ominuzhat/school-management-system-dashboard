import { Card, Col, Row, Select, Form as AntForm } from "antd";
import {
  useGetExamQuery,
  useGetSingleExamQuery,
} from "../../api/examEndPoints";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateExamMarkMutation } from "../api/markExamEndPoints";

const MarkExamPage = () => {
  const [form] = AntForm.useForm();
  const exam = AntForm.useWatch("exam", form);

  const [create, { isLoading, isSuccess }] = useCreateExamMarkMutation();
  const { data: examData } = useGetExamQuery({});

//   const { data: exaDetails } = useGetSingleExamQuery(exam && Number(exam));

//   console.log("exam", examData);

  const onFinish = (values: any): void => {
    const results = {
      name: values.name,
      session: values.session,
      grade_level: values.grade_level,
    };

    create(results);
  };

  return (
    <div>
      <Card title="Exam Receipts">
        <Card className="rounded-lg shadow-lg p-6">
          <Form
            form={form}
            onFinish={onFinish}
            isLoading={isLoading}
            isSuccess={isSuccess}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Form.Item
                  label="Select Exam Name"
                  name="exam"
                  rules={[{ required: true, message: "Exam  is required!" }]}
                >
                  <Select
                    placeholder="Select Exam Name"
                    className="w-full"
                    allowClear
                    showSearch
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
          </Form>
        </Card>
      </Card>
    </div>
  );
};

export default MarkExamPage;
