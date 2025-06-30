import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Switch } from "antd";
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

  const [general, setGeneral] = useState<boolean>(true);
  const [group, setGroup] = useState<string | null>(null);

  useEffect(() => {
    if (singleData?.data) {
      const subjectData = singleData?.data as unknown as ISubjects;
      form.setFieldsValue({
        name: subjectData.name,
        grade_level: subjectData.grade_level?.id,
      });

      // Pre-fill general and group
      setGeneral(subjectData.general ?? true);
      setGroup(subjectData.group || null);
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    const updatedData = {
      ...values,
      general: general,
      group: general ? undefined : group || undefined,
    };

    updateClass({ id: record, data: updatedData });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Subjects Name" name="name">
          <Input placeholder="Enter Subjects Name" />
        </Form.Item>

        <Form.Item<ISubjects> label="Class" name="grade_level">
          <Select placeholder="Select Class" className="w-full">
            {Array.isArray(GetClassData?.data) &&
              GetClassData?.data?.map((data: any) => (
                <Select.Option key={data.id} value={data?.id}>
                  {data?.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label="General" valuePropName="checked">
          <Switch
            checked={general}
            onChange={(checked) => {
              setGeneral(checked);
              if (checked) {
                setGroup(null);
              }
            }}
          />
        </Form.Item>

        {!general && (
          <Form.Item label="Group">
            <Select
              placeholder="Select Group"
              value={group || undefined}
              onChange={(value) => setGroup(value)}
            >
              <Select.Option value="Science">Science</Select.Option>
              <Select.Option value="Commerce">Commerce</Select.Option>
              <Select.Option value="Arts">Arts</Select.Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Subject
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateSubjects;
