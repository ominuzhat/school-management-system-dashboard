import {
  Col,
  DatePicker,
  Input,
  Radio,
  Row,
  Select,
  Form as AntForm,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../../admission/api/admissionEndPoints";
import { useCreateLeaveMutation } from "../api/leaveEndPoints";

const CreateLeave = () => {
  const [form] = AntForm.useForm();
  const [create, { isLoading, isSuccess }] = useCreateLeaveMutation();
  const { data: admissionData } = useGetAdmissionQuery({});
  const leaveDuration = AntForm.useWatch("leave_duration", form);

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ leave_duration: "full_day" }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item label="Select Admission" name="admission">
              <Select placeholder="Select Admission" className="w-full">
                {admissionData?.data?.results?.map((admission: any) => (
                  <Select.Option key={admission.id} value={admission.id}>
                    {admission?.student?.first_name}{" "}
                    {admission?.student?.last_name} - {admission?.grade_level}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Select Leave Type" name="leave-type">
              <Select placeholder="Select Leave Type" className="w-full">
                <Select.Option value="emergency">Emergency Leave</Select.Option>
                <Select.Option value="functional">
                  Functional Leave
                </Select.Option>
                <Select.Option value="medical">medical Leave</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item
              label="Leave Duration"
              name="leave_duration"
              rules={[
                { required: true, message: "Leave Duration is required!" },
              ]}
            >
              <Radio.Group>
                <Radio value="half_day">Half Day</Radio>
                <Radio value="full_day">Full Day</Radio>
                <Radio value="multiple_days">Multiple Days</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[{ required: true, message: "Start Date is required!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {leaveDuration === "multiple_days" && (
            <Col lg={6}>
              <Form.Item
                label="End Date"
                name="end_date"
                rules={[{ required: true, message: "End Date is required!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          )}

          <Col lg={24}>
            <Form.Item label="Reason" name="reason">
              <Input.TextArea placeholder="Enter Reason" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateLeave;
