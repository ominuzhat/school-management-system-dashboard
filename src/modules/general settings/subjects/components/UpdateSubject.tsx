import { useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  useGetSingleSubjectsQuery,
  useUpdateSubjectsMutation,
} from "../api/subjectsEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { ISubjects } from "../type/subjectsType";

const UpdateSubjects = ({ record }: any) => {
  const [form] = Form.useForm();
  const { data: GetClassData } = useGetClassesQuery({});
  const { data: singleData } = useGetSingleSubjectsQuery(record);
  const [updateClass, { isLoading }] = useUpdateSubjectsMutation();

  useEffect(() => {
    if (singleData?.data) {
      const subjectData = singleData?.data as unknown as ISubjects;
      form.setFieldsValue({
        name: subjectData.name,
        marks: subjectData.marks,
        grade_level: subjectData.grade_level?.id,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    updateClass({ id: record, data: values });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Subjects Name" name="name">
          <Input placeholder="Enter Subjects Name" />
        </Form.Item>

        <Form.Item label="Mark" name="marks">
          <Input placeholder="Enter Mark" />
        </Form.Item>

        <Form.Item<ISubjects> label="Class " name="grade_level">
          <Select placeholder="Select Class" className="w-full">
            {Array.isArray(GetClassData?.data) &&
              GetClassData?.data?.map((data: any, index) => (
                <Select.Option key={index} value={data?.id}>
                  {data?.name}
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

export default UpdateSubjects;
