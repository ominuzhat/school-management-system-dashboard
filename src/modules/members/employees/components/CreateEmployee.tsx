import {
  Badge,
  Card,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useState } from "react";
import { useCreateEmployeeMutation } from "../api/employeeEndPoints";
import { useGetRolePermissionQuery } from "../../../settings/role & permission/api/rolePermissionEndPoints";
import { useGetDepartmentQuery } from "../../../general settings/Department/api/departmentEndPoints";
import dayjs from "dayjs";

const CreateEmployee = () => {
  const [create, { isLoading, isSuccess }] = useCreateEmployeeMutation();
  const { data: roleData } = useGetRolePermissionQuery({});
  const { data: departmentData } = useGetDepartmentQuery({});

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "images") {
          value.forEach((file) => {
            if (file?.originFileObj) {
              formData.append(key, file.originFileObj);
            }
          });
        } else {
          value.forEach((item) => {
            formData.append(key, item);
          });
        }
      } else if (key === "hire_date" && value) {
        const formattedDate = dayjs(value as any).format("YYYY-MM-DD");
        formData.append(key, formattedDate);
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    const user = {
      username: values.username,
      password: values.password,
      role: values.role,
    };

    formData.append("user", JSON.stringify(user) as any);

    create(formData);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          hire_date: dayjs(),
          is_active: true,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Badge.Ribbon text="Employee Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card>
                      <Form.Item
                        label="Picture"
                        name="picture"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                          if (Array.isArray(e)) {
                            return e;
                          }
                          return e?.fileList;
                        }}
                      >
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          listType="picture-card"
                          onPreview={handlePreview}
                          showUploadList={{ showRemoveIcon: true }}
                        >
                          <PlusOutlined />
                        </Upload>
                      </Form.Item>
                      <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>
                    </Card>
                  </Col>
                  <Col span={18}>
                    <Row gutter={[16, 16]}>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="First Name"
                          name="first_name"
                          rules={[{ required: true, message: "First Name!" }]}
                        >
                          <Input placeholder="First Name." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Last Name"
                          name="last_name"
                          rules={[{ required: true, message: "Last Name!" }]}
                        >
                          <Input placeholder="Last Name." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Email"
                          name="email"
                          rules={[{ required: true, message: "Email" }]}
                        >
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item<any>
                          label="Hire Date"
                          name="hire_date"
                          rules={[{ required: true, message: "Hire Date" }]}
                        >
                          <DatePicker
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Phone Number"
                          name="phone_number"
                          rules={[{ required: true, message: "Phone Number" }]}
                        >
                          <Input placeholder="Phone Number" type="tel" />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item<any>
                          label="Position"
                          name="position"
                          rules={[{ required: true, message: "Position" }]}
                        >
                          <Input placeholder="Position" />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item<any>
                          label="Department"
                          name="department"
                          rules={[{ required: true, message: "Department" }]}
                        >
                          <Select placeholder="Select Department">
                            {Array.isArray(departmentData?.data) &&
                              departmentData?.data?.map((department: any) => (
                                <Select.Option
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item<any>
                          label="Role"
                          name="role"
                          rules={[{ required: true, message: "Role!" }]}
                        >
                          <Select placeholder="Select Role">
                            {Array.isArray(roleData?.data) &&
                              roleData?.data
                                .filter(
                                  (role: any) =>
                                    role.name !== "Student" &&
                                    role.name !== "Teacher"
                                )
                                .map((role: any) => (
                                  <Select.Option key={role.id} value={role.id}>
                                    {role.name}
                                  </Select.Option>
                                ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item<any>
                          label="Base Salary"
                          name="base_salary"
                          rules={[{ required: true, message: "Base Salary!" }]}
                        >
                          <Input placeholder="Base Salary." type="number" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Username"
                          name="username"
                          rules={[{ required: true, message: "Username!" }]}
                        >
                          <Input placeholder="Username." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Password"
                          name="password"
                          rules={[{ required: true, message: "Password!" }]}
                        >
                          <Input.Password placeholder="Password." />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item
                          label="Status"
                          name="is_active"
                          valuePropName="checked"
                          initialValue={true}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateEmployee;
