import { Button, Form, Input, Select } from "antd";
import {
  useGetSingleCAdmissionSessionQuery,
  useUpdateAdmissionSessionMutation,
} from "../api/admissionSessionEndPoints";
import { IAdmissionSession } from "../type/admissionSessionType";
import { useEffect } from "react";
const { Option } = Select;

const UpdateAdmissionSessions = ({ record }: any) => {
  const [form] = Form.useForm();

  const [update, { isLoading }] = useUpdateAdmissionSessionMutation();
  const { data: singleData } = useGetSingleCAdmissionSessionQuery(record);

  useEffect(() => {
    if (singleData?.data) {
      const subjectData = singleData?.data as unknown as IAdmissionSession;
      form.setFieldsValue({
        name: subjectData.name,
        status: subjectData.status,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    update({ id: record, data: values });
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Admission Session Name" name="name">
          <Input placeholder="Enter Admission Session Name" />
        </Form.Item>

        <Form.Item<IAdmissionSession> label="Session Status" name="status">
          <Select placeholder="Select status">
            <Option value="open">Open</Option>
            <Option value="closed">Closed</Option>
            <Option value="on_hold">On Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Admission Session
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateAdmissionSessions;
