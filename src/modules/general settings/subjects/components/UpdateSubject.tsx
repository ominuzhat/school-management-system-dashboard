import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Switch, notification } from "antd";
import {
  useGetSingleSubjectsQuery,
  useUpdateSubjectsMutation,
} from "../api/subjectsEndPoints";
import { ISubjects } from "../type/subjectsType";

const UpdateSubjects = ({ record }: any) => {
  const [form] = Form.useForm();
  // const { data: GetClassData } = useGetClassesQuery({});
  const { data: singleData } = useGetSingleSubjectsQuery(record);
  const [updateClass, { isLoading }] = useUpdateSubjectsMutation();

  const [general, setGeneral] = useState<boolean>(true);
  const [group, setGroup] = useState<string | null>(null);

  useEffect(() => {
    if (singleData?.data) {
      const subjectData: any = singleData?.data as unknown as ISubjects;
      form.setFieldsValue({
        name: subjectData.name,
        grade_level: subjectData.grade_level?.id,
      });

      // ✅ Pre-fill switches and group type
      if (subjectData.group_type?.toLowerCase() === "general") {
        setGeneral(true);
        setGroup(null);
      } else {
        setGeneral(false);
        setGroup(subjectData.group_type?.toLowerCase() || null);
      }
    }
  }, [singleData, form]);

  const onFinish = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        grade_level: values.grade_level,
        group_type: general ? "general" : group,
      };

      await updateClass({ id: record, data: payload }).unwrap();

      notification.success({
        message: "Success",
        description: "Subject updated successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update subject",
      });
    }
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Subject Name" name="name">
          <Input placeholder="Enter Subject Name" />
        </Form.Item>

        {/* <Form.Item<ISubjects> label="Class" name="grade_level">
          <Select placeholder="Select Class" className="w-full">
            {Array.isArray(GetClassData?.data) &&
              GetClassData?.data?.map((data: any) => (
                <Select.Option key={data.id} value={data?.id}>
                  {data?.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item> */}

        <Form.Item label="General" valuePropName="checked">
          <Switch
            checked={general}
            onChange={(checked) => {
              setGeneral(checked);
              if (checked) setGroup(null);
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
              <Select.Option value="science">Science</Select.Option>
              <Select.Option value="commerce">Commerce</Select.Option>
              <Select.Option value="arts">Arts</Select.Option>
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
