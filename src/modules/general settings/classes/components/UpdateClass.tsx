import { useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  useGetSingleClassesQuery,
  useUpdateClassesMutation,
} from "../api/classesEndPoints";

const UpdateClass = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: singleData } = useGetSingleClassesQuery(record);
  const [updateClass, { isLoading }] = useUpdateClassesMutation();

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        name: singleData.data.name,
        description: singleData.data.description,
        class_teacher: singleData.data.class_teacher,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    updateClass({ id: record, data: values });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Class Name" name="name">
          <Input placeholder="Enter Class Name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter Description" rows={4} />
        </Form.Item>

        <Form.Item label="Select Class Teacher" name="class_teacher">
          <Select placeholder="Select Class Teacher">
            <Select.Option value={null}>None</Select.Option>
            <Select.Option value={1}>Teacher 1</Select.Option>
            <Select.Option value={2}>Teacher 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Class
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateClass;
