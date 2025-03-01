import { useEffect } from "react";
import { Form, Input, Button, TimePicker } from "antd";
import dayjs from "dayjs"; // Import dayjs

import {
  useGetSingleShiftQuery,
  useUpdateShiftMutation,
} from "../api/shiftEndPoints";

const { RangePicker } = TimePicker;

const UpdateShift = ({ record }: any) => {
  const [form] = Form.useForm();
  const format = "h:mm A"; // 12-hour format
  const { data: singleData } = useGetSingleShiftQuery(record);
  const [update, { isLoading }] = useUpdateShiftMutation();

  useEffect(() => {
    if (singleData?.data) {
      const shiftData = singleData?.data as any;

      // Convert 24-hour times to 12-hour format using Day.js
      const startTime12hr = dayjs(shiftData.start_time, "HH:mm:ss").format(
        format
      );
      const endTime12hr = dayjs(shiftData.end_time, "HH:mm:ss").format(format);

      form.setFieldsValue({
        name: shiftData.name,
        time_range: [
          dayjs(startTime12hr, format), // Convert to Day.js object
          dayjs(endTime12hr, format), // Convert to Day.js object
        ],
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    // Convert the time range values back to 24-hour format before submitting
    const startTime24hr = values.time_range[0].format("HH:mm:ss");
    const endTime24hr = values.time_range[1].format("HH:mm:ss");

    // Update the shift with 24-hour time values
    update({
      id: record,
      data: { ...values, start_time: startTime24hr, end_time: endTime24hr },
    });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Shift Name" name="name">
          <Input placeholder="Enter Shift Name" />
        </Form.Item>
        <Form.Item
          label="Shift Time"
          name="time_range"
          rules={[{ required: true, message: "Shift Time is required!" }]}
        >
          <RangePicker format={format} className="w-full" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Shift
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateShift;
