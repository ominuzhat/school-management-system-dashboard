import {
  Card,
  Col,
  Input,
  Row,
  Form as AntForm,
  Typography,
  Tooltip,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useEffect } from "react";
import {
  useCreateFailMarkMutation,
  useGetFailMarkQuery,
} from "../api/failCriteriaEndPoints";

const { Text } = Typography;



const FailCriteria = () => {
  const [form] = AntForm.useForm();
  const { data: gradeMark } = useGetFailMarkQuery<any>({});
  const [create, { isLoading, isSuccess }] = useCreateFailMarkMutation();

  useEffect(() => {
    if (gradeMark?.data) {
      form.setFieldsValue({
        overall: gradeMark?.data?.overall,
        subject: gradeMark?.data?.subject,
        min_subject: gradeMark?.data?.min_subject,
      });
    }
  }, [form, gradeMark?.data]);

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <Card className="rounded-lg shadow-lg p-8 bg-gray-50 border border-gray-200">
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[24, 24]} align="middle">
          {/* Overall Percentage Field */}
          <Col xs={24} md={8}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Text strong className="block text-gray-700 mb-2">
                A student will be marked as{" "}
                <span className="text-red-500">FAILED</span> if he or she
                obtains
              </Text>
              <Form.Item
                label={
                  <Text strong className="text-gray-600">
                    Overall Percentage{" "}
                    <Tooltip title="The overall percentage below which the student will be marked as failed.">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full ml-2 text-xs">
                        ?
                      </span>
                    </Tooltip>
                  </Text>
                }
                name="overall"
                rules={[
                  {
                    required: true,
                    message: "Overall percentage is required!",
                  },
                ]}
              >
                <Input placeholder="e.g., 40" className="rounded-lg" />
              </Form.Item>
            </div>
          </Col>

          {/* Subject Percentage Field */}
          <Col xs={24} md={8}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Text strong className="block text-gray-700 mb-2 text-center">
                OR if he or she obtains a{" "}
                <span className="font-bold">Subject percentage</span> equal to
                or below
              </Text>
              <Form.Item
                label={
                  <Text strong className="text-gray-600">
                    Subject Percentage{" "}
                    <Tooltip title="The percentage below which a student is considered failed in a subject.">
                      <span className="bg-purple-500 text-white px-2 py-1 rounded-full ml-2 text-xs">
                        ?
                      </span>
                    </Tooltip>
                  </Text>
                }
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Subject percentage is required!",
                  },
                ]}
              >
                <Input placeholder="e.g., 33" className="rounded-lg" />
              </Form.Item>
            </div>
          </Col>

          {/* Minimum Subjects Field */}
          <Col xs={24} md={8}>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Text strong className="block text-gray-700 mb-2 text-right">
                in at least{" "}
                <span className="font-bold">this many subjects</span>
              </Text>
              <Form.Item
                label={
                  <Text strong className="text-gray-600">
                    No. of Subjects{" "}
                    <Tooltip title="The minimum number of subjects a student must fail to be considered failed overall.">
                      <span className="bg-indigo-500 text-white px-2 py-1 rounded-full ml-2 text-xs">
                        ?
                      </span>
                    </Tooltip>
                  </Text>
                }
                name="min_subject"
                rules={[
                  {
                    required: true,
                    message: "Minimum subject count is required!",
                  },
                ]}
              >
                <Input placeholder="e.g., 1" className="rounded-lg" />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FailCriteria;
