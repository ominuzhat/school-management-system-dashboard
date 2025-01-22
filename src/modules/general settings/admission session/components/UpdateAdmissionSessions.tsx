import { Button, Form, Input } from "antd";
import {
  useGetSingleCAdmissionSessionQuery,
  useUpdateAdmissionSessionMutation,
} from "../api/admissionSessionEndPoints";
import { IAdmissionSession } from "../type/admissionSessionType";
import { useEffect } from "react";

const UpdateAdmissionSessions = ({ record }: any) => {
  const [form] = Form.useForm();

  const [update, { isLoading }] = useUpdateAdmissionSessionMutation();
  const { data: singleData } = useGetSingleCAdmissionSessionQuery(record);

  useEffect(() => {
    if (singleData?.data) {
      const subjectData = singleData?.data as unknown as IAdmissionSession;
      form.setFieldsValue({
        name: subjectData.name,
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
