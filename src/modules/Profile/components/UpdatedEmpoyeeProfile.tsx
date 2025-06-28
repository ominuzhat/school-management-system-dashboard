import { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useUpdateProfileMutation } from "../api/profileEndpoint";

const UpdateEmployeeProfile = ({
  data,
  onSubmitSuccess,
}: {
  data: any;
  onSubmitSuccess: () => void;
}) => {
  const [create, { isLoading }] = useUpdateProfileMutation({});

  const [form] = Form.useForm();

  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    const formattedData = {
      username: values.username,
      employee: {
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
      },
    };

    try {
      await create(formattedData).unwrap();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        username: data.username || "",
        first_name: data.teacher?.first_name || "",
        last_name: data.teacher?.last_name || "",
        phone_number: data.teacher?.phone_number || "",
      });
    }
  }, [data, form]);

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item<any> label="User Name" name="username">
          <Input size="large" placeholder="user name" disabled />
        </Form.Item>
        <Form.Item<any> label="First Name" name="first_name">
          <Input size="large" placeholder="First name" />
        </Form.Item>
        <Form.Item<any> label="Last Name" name="last_name">
          <Input size="large" placeholder="Last name" />
        </Form.Item>
        <Form.Item<any> label="Phone" name="phone_number">
          <Input size="large" placeholder="Phone Number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateEmployeeProfile;
