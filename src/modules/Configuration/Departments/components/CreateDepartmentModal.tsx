import { Input } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";

const CreateDepartmentModal = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "restaurant_logo" &&
        Array.isArray(value) &&
        value[0]?.originFileObj
      ) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    create(formData);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={[]}
      >
        <Form.Item<any>
          label="Department Name"
          name="dueDate"
          rules={[{ required: true, message: "Input your Department Name!" }]}
        >
          <Input placeholder="Employee Department Name." />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateDepartmentModal;
