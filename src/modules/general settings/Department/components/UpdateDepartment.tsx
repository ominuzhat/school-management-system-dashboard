import { Button, Form, Input } from "antd";
import {
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../api/departmentEndPoints";
import { useEffect } from "react";
import { IGetDepartment } from "../types/departmentType";

const UpdateDepartments = ({ record }: any) => {
  const [form] = Form.useForm();

  const [update, { isLoading }] = useUpdateDepartmentMutation();
  const { data: singleData } = useGetSingleDepartmentQuery(Number(record?.id));

  useEffect(() => {
    if (singleData?.data) {
      const subjectData = singleData?.data as unknown as IGetDepartment;
      form.setFieldsValue({
        name: subjectData.name,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    update({ id: record?.id, data: values });
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter Department Name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Department
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateDepartments;
