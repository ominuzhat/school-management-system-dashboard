import {
  Col,
  DatePicker,
  Input,
  Radio,
  Row,
  Select,
  Form as AntForm,
  Switch,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../../admission/api/admissionEndPoints";
import {
  useGetSingleLeaveQuery,
  useUpdateLeaveMutation,
} from "../api/leaveEndPoints";
import { useEffect } from "react";
import { IGetLeave } from "../types/leaveTypes";
import dayjs from "dayjs";

const UpdateLeave = ({ record }: { record: any }) => {
  const [form] = AntForm.useForm();
  const { data: singleData } = useGetSingleLeaveQuery(record);
  const [update, { isLoading, isSuccess }] = useUpdateLeaveMutation();
  const { data: admissionData } = useGetAdmissionQuery({});
  const leaveDuration = AntForm.useWatch("leave_duration", form);

  useEffect(() => {
    if (singleData?.data) {
      const leaveData = singleData?.data as unknown as IGetLeave;
      form.setFieldsValue({
        name: leaveData.name,
        admission: leaveData.admission?.id,
        leave_type: leaveData.leave_type,
        is_approved: leaveData.is_approved,
        leave_duration: leaveData.duration,
        start_date: leaveData.start_date ? dayjs(leaveData.start_date) : null,
        end_date: leaveData.end_date ? dayjs(leaveData.end_date) : null,
        reason: leaveData.reason || "",
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      ...(values.end_date && {
        end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      }),
    };
    update({ id: record, data: formattedValues });
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
            <Form.Item label="Select Leave Type" name="leave_type">
              <Select placeholder="Select Leave Type" className="w-full">
                <Select.Option value="Emergency">Emergency Leave</Select.Option>
                <Select.Option value="Functional">
                  Functional Leave
                </Select.Option>
                <Select.Option value="Medical">medical Leave</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Leave Duration" name="leave_duration">
              <Radio.Group>
                <Radio value="H">Half Day</Radio>
                <Radio value="F">Full Day</Radio>
                <Radio value="M">Multiple Days</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
            <Form.Item
              label="Status"
              name="is_approved"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Approved"
                unCheckedChildren="Not Approved"
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item label="Start Date" name="start_date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {leaveDuration === "M" && (
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

export default UpdateLeave;
