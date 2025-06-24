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
import { useCreateLeaveMutation } from "../api/leaveEndPoints";
import { debounce } from "lodash";
import { useState } from "react";
import dayjs from "dayjs";

const CreateLeave = () => {
  const [form] = AntForm.useForm();
  const [search, setSearch] = useState("");

  const [create, { isLoading, isSuccess }] = useCreateLeaveMutation();
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
  });
  const leaveDuration = AntForm.useWatch("leave_duration", form);

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      ...(values.end_date && {
        end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      }),
    };
    create(formattedValues);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ leave_duration: "full_day", is_approved: true }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item label="Select Admission" name="admission">
              <Select
                placeholder="Select Admission"
                className="w-full"
                allowClear
                showSearch
                onSearch={debounce(setSearch, 500)}
                filterOption={false}
                loading={isFetching}
                notFoundContent={
                  Array?.isArray(admissionData?.data?.results) &&
                  admissionData?.data?.results?.length === 0
                    ? "No Admission Student found"
                    : null
                }
              >
                {admissionData?.data?.results?.map((admission: any) => (
                  <Select.Option key={admission.id} value={admission.id}>
                    {admission?.student?.first_name}{" "}
                    {admission?.student?.last_name} - {admission?.grade_level}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item label="Select Leave Type" name="leave-type">
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
          <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
            <Form.Item
              label="Status"
              name="is_approved"
              valuePropName="checked"
              rules={[{ required: true, message: "Status is required!" }]}
            >
              <Switch
                checkedChildren="Approved"
                unCheckedChildren="Not Approved"
              />
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
                <Radio value="H">Half Day</Radio>
                <Radio value="F">Full Day</Radio>
                <Radio value="M">Multiple Days</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[{ required: true, message: "Start Date is required!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD" // Optional: Display format in the input
              />
            </Form.Item>
          </Col>
          {leaveDuration === "M" && (
            <Col lg={6}>
              <Form.Item
                label="End Date"
                name="end_date"
                rules={[{ required: true, message: "End Date is required!" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD" // Optional: Display format in the input
                />
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
