import {
  Card,
  Col,
  Input,
  Row,
  Form as AntForm,
  InputNumber,
  Select,
  Button,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Form } from "../../../../../common/CommonAnt";
import {
  useCreateGradeMarkMutation,
  useGetGradeMarkQuery,
} from "../api/gradeMarkEndPoints";
import { useEffect } from "react";

type GradeForm = {
  grades: {
    grade: string;
    mark_from: number;
    mark_upto: number;
    status: string;
  }[];
};

const GradeCriteria = () => {
  const [form] = AntForm.useForm();

  const { data: gradeMark } = useGetGradeMarkQuery({});
  const [create, { isLoading, isSuccess }] = useCreateGradeMarkMutation();

  useEffect(() => {
    if (gradeMark?.data) {
      const formattedData =
        Array.isArray(gradeMark?.data) &&
        gradeMark?.data.map((data: any) => ({
          id: data.id,
          grade: data.grade,
          mark_from: data.mark_from,
          mark_upto: data.mark_upto,
          status: data.status,
        }));

      form.setFieldsValue({ grades: formattedData });
    }
  }, [form, gradeMark?.data]);

  const onFinish = (values: any): void => {
    create(values.grades);
  };
  return (
    <Card className="rounded-lg shadow-lg p-6">
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ grades: [{}] }}
      >
        <AntForm.List name="grades">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={[16, 16]}
                  align="middle"
                  className="w-full"
                >
                  <Col xs={24} sm={12} lg={5}>
                    <Form.Item
                      {...restField}
                      label="Grade"
                      name={[name, "grade"] as unknown as keyof GradeForm}
                      rules={[
                        { required: true, message: "Grade is required!" },
                      ]}
                    >
                      <Input placeholder="Enter Grade" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={5}>
                    <Form.Item
                      {...restField}
                      label="Mark From"
                      name={[name, "mark_from"] as unknown as keyof GradeForm}
                      rules={[
                        { required: true, message: "Mark From is required!" },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Mark From"
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={5}>
                    <Form.Item
                      {...restField}
                      label="Mark Upto"
                      name={[name, "mark_upto"] as unknown as keyof GradeForm}
                      rules={[
                        { required: true, message: "Mark Upto is required!" },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter Mark Upto"
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={5}>
                    <Form.Item
                      {...restField}
                      label="Status"
                      name={[name, "status"] as unknown as keyof GradeForm}
                      rules={[
                        { required: true, message: "Status is required!" },
                      ]}
                    >
                      <Select placeholder="Select Status">
                        <Select.Option value="PASS">PASS</Select.Option>
                        <Select.Option value="FAIL">FAIL</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={4}>
                    <Button
                      type="dashed"
                      danger
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                    />
                  </Col>
                </Row>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="mt-4"
              >
                Add Grade
              </Button>
            </>
          )}
        </AntForm.List>
      </Form>
    </Card>
  );
};

export default GradeCriteria;
