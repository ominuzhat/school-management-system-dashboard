import { Input, Form as AntForm, Switch } from "antd";

import { useEffect } from "react";
import dayjs from "dayjs";
import {
  useGetSingleScheduleQuery,
  useUpdateScheduleMutation,
} from "../api/scheduleEndPoints";
import { Form } from "../../../../../common/CommonAnt";

const UpdateLeave = ({ record }: { record: any }) => {
  const [form] = AntForm.useForm();
  const { data: singleData } = useGetSingleScheduleQuery(record);
  const [update, { isLoading, isSuccess }] = useUpdateScheduleMutation();

  useEffect(() => {
    if (singleData?.data) {
      const shiftData = singleData?.data as any;

      form.setFieldsValue({
        name: shiftData.name,
        flexible: shiftData.flexible,
        is_active: shiftData.is_active,
        start_time: dayjs(shiftData.start_time, "HH:mm").format("HH:mm:ss"),
        end_time: dayjs(shiftData.end_time, "HH:mm").format("HH:mm:ss"),
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

        <Form.Item label="Time In Flexibility (In Minutes)" name="flexible">
          <Input
            placeholder="Enter Time In Flexibility (In Minutes)"
            type="number"
          />
        </Form.Item>

        <Form.Item label="Status" name="is_active" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateLeave;
