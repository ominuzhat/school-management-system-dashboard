import { Row, Col, Select } from "antd";
import { useCreateResultsMutation } from "../api/resultsEndPoints";
import { useGetExamQuery } from "../../api/examEndPoints";
import { Form } from "../../../../../common/CommonAnt";

const CreateResult = () => {
  const [create, { isLoading, isSuccess }] = useCreateResultsMutation();
  const { data: examData } = useGetExamQuery({});

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isSuccess={isSuccess} isLoading={isLoading}>
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item
              label="Select Exam"
              name="exam"
              rules={[{ required: true, message: "Please select Exam!" }]}
            >
              <Select placeholder="Select Exam" className="w-full">
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
    </div>
  );
};

export default CreateResult;
