import { useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  useGetSingleClassesQuery,
  useUpdateClassesMutation,
} from "../api/classesEndPoints";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";

const UpdateClass = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: singleData } = useGetSingleClassesQuery(record);
  const [updateClass, { isLoading }] = useUpdateClassesMutation();
  const { data: teacherData } = useGetTeacherQuery({});

  console.log(singleData?.data);

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        name: singleData.data.name,
        description: singleData.data.description,
        class_teacher: singleData.data.class_teacher?.id,
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
          <Select placeholder="Select Class Teacher" className="w-full">
            {teacherData?.data?.results?.map((teacher: any) => (
              <Select.Option key={teacher.id} value={teacher.id}>
                {teacher?.first_name}
              </Select.Option>
            ))}
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
