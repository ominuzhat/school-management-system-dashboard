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
  Form as AntForm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useEffect, useState } from "react";
import {
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../api/employeeEndPoints";
import { useGetRolePermissionQuery } from "../../../settings/role & permission/api/rolePermissionEndPoints";
import { useGetDepartmentQuery } from "../../../general settings/Department/api/departmentEndPoints";
import dayjs from "dayjs";

const UpdateEmployee = ({ records }: any) => {
  const [update, { isLoading, isSuccess }] = useUpdateEmployeeMutation();
  const { data: roleData } = useGetRolePermissionQuery({});
  const { data: departmentData } = useGetDepartmentQuery({});
  const [form] = AntForm.useForm();
  const { data: singleEmployeeData } = useGetSingleEmployeeQuery(records?.id);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [originalImages, setOriginalImages] = useState<any[]>([]);

  console.log(originalImages);

  useEffect(() => {
    if (singleEmployeeData?.data) {
      const initialImages =
        singleEmployeeData.data?.images?.map(
          (image: { id: any; image: string }) => ({
            uid: image.id,
            url: image.image,
            thumbUrl: image.image,
            name: `Image-${image.id}`,
          })
        ) || [];

      setOriginalImages(initialImages);

      form.setFieldsValue({
        ...singleEmployeeData.data,
        hire_date: dayjs(singleEmployeeData.data.hire_date),
        username: singleEmployeeData.data?.user?.username,
        role: singleEmployeeData.data?.user?.role?.id,
        department: singleEmployeeData.data?.department?.id,
        images: initialImages,
      });
    }
  }, [form, singleEmployeeData]);

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

    update({ id: records?.id, data: formData });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          //   first_name: singleEmployeeData?.data?.first_name || "",
          last_name: singleEmployeeData?.data?.last_name || "",
          email: singleEmployeeData?.data?.email || "",
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
                        name="images"
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
                          maxCount={20}
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
                        <Form.Item label="First Name" name="first_name">
                          <Input placeholder="First Name" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Last Name" name="last_name">
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Email" name="email">
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item label="Hire Date" name="hire_date">
                          <DatePicker
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Phone Number" name="phone_number">
                          <Input placeholder="Enter Phone Number" />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item label="Base Salary" name="base_salary">
                          <Input placeholder="Base Salary" type="number" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Position" name="position">
                          <Input placeholder="Position" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Department" name="department">
                          <Select placeholder="Select Department">
                            {Array.isArray(departmentData?.data) &&
                              departmentData?.data?.map((dept: any) => (
                                <Select.Option key={dept.id} value={dept.id}>
                                  {dept.name}
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Role" name="role">
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
                        <Form.Item label="Username" name="username">
                          <Input placeholder="Username" disabled />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any> label="Password" name="password">
                          <Input.Password placeholder="Password." />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item label="Status" name="is_active">
                          <Switch
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                          />
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

export default UpdateEmployee;
