import { useEffect } from "react";
import { Form, Input, Button } from "antd";
import dayjs from "dayjs";

import {
  useGetSingleShiftQuery,
  useUpdateShiftMutation,
} from "../api/shiftEndPoints";

const UpdateShift = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: singleData } = useGetSingleShiftQuery(record);
  const [update, { isLoading }] = useUpdateShiftMutation();

  useEffect(() => {
    if (singleData?.data) {
      const shiftData = singleData?.data as any;

      form.setFieldsValue({
        name: shiftData.name,
        flexible: shiftData.flexible,
        start_time: dayjs(shiftData.start_time, "HH:mm").format("HH:mm:ss"),
        end_time: dayjs(shiftData.end_time, "HH:mm").format("HH:mm:ss"),
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    update({
      id: record,
      data: {
        ...values,
        start_time: dayjs(values.start_time, "HH:mm").format("HH:mm:ss"),
        end_time: dayjs(values.end_time, "HH:mm").format("HH:mm:ss"),
      },
    });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Shift Name" name="name">
          <Input placeholder="Enter Shift Name" />
        </Form.Item>

        <Form.Item label="Shift Started Time" name="start_time">
          <input
            type="time"
            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
          ></input>
        </Form.Item>

        <Form.Item label="Shift Ended Time" name="end_time">
          <input
            type="time"
            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
          ></input>
        </Form.Item>

        <Form.Item label="Time In Flexibility" name="flexible">
          <Input placeholder="Enter Time In Flexibility" type="number" />
        </Form.Item>

        {/* 
        <Form.Item
          label="Shift Time"
          name="time_range"
          rules={[{ required: true, message: "Shift Time is required!" }]}
        >
          <RangePicker format={format} className="w-full" />
        </Form.Item> */}

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
