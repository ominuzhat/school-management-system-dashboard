import { useEffect } from "react";
import { Col, Row, Form, Input, Button, InputNumber } from "antd";
import {
  useGetSingleExamHallQuery,
  useUpdateExamHallMutation,
} from "../api/examHallEndPoints";
import { IGetExamHall } from "../Type/examHallType";

const UpdateExamHall = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: singleData } = useGetSingleExamHallQuery(record);
  const [updateExamHall, { isLoading }] = useUpdateExamHallMutation();

  useEffect(() => {
    if (singleData?.data) {
      const examHallData = singleData?.data as unknown as IGetExamHall;
      form.setFieldsValue({
        name: examHallData.name,
        description: examHallData.description,
        capacity: examHallData.capacity,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    updateExamHall({ id: record, data: values });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Exam Hall Name"
              name="name"
              rules={[
                { required: true, message: "Exam Hall Name is required!" },
              ]}
            >
              <Input placeholder="Enter Exam Hall Name" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item
              label="Exam Hall Capacity"
              name="capacity"
              rules={[
                { required: true, message: "Exam Hall Capacity is required!" },
              ]}
            >
              <InputNumber
                placeholder="Enter Exam Hall Capacity"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col lg={24} xs={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>

          <Col lg={24} xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Update Exam Hall
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateExamHall;
