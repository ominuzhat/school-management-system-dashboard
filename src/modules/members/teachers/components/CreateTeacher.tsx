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
import { useCreateTeacherMutation } from "../api/teachersEndPoints";
import dayjs from "dayjs";

const CreateTeacher = () => {
  const [create, { isLoading, isSuccess }] = useCreateTeacherMutation();
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
      } else if (key === "date_of_birth" && value) {
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
            <Badge.Ribbon text="Teacher Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card>
                      <Form.Item
                        label="Picture "
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
                          label="Mobile No for SMS/WhatsApp"
                          name="phone_number"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your mobile number",
                            },
                          ]}
                        >
                          <Input
                            addonBefore="+088"
                            placeholder="Enter Mobile Number"
                          />
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
                          rules={[
                            { required: true, message: "Status is required!" },
                          ]}
                        >
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
          <Col lg={24}>
            <Badge.Ribbon text="Other Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Date of Birth"
                      name="date_of_birth"
                      rules={[
                        {
                          required: true,
                          message: "Date of Birth is required!",
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="Select Date"
                        format="YYYY-MM-DD"
                        className="w-full"
                        disabledDate={(current) => {
                          return current && current > dayjs().endOf("day");
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Teacher Birth ID / NID"
                      name="registration"
                    >
                      <Input placeholder="Teacher Birth ID / NID" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any> label="Gender" name="gender">
                      <Select placeholder="Gender" className="w-full">
                        <Select.Option value={"male"}>Male</Select.Option>
                        <Select.Option value={"female"}>Female</Select.Option>
                        <Select.Option value={"other"}>other</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Institution Name"
                      name="institution_name"
                    >
                      <Input placeholder="Institution Name." />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any> label="Religion" name="religion">
                      <Input placeholder="Religion" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any> label="Blood Group" name="blood_group">
                      <Select
                        placeholder="Select Blood Group"
                        className="w-full"
                      >
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (group) => (
                            <Select.Option key={group} value={group}>
                              {group}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any> label="Address" name="address">
                      <Input placeholder="Address" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col lg={24}>
            <Badge.Ribbon text="Father Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
                    <Form.Item<any> label="Father Name" name="name">
                      <Input placeholder="Father Name." />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Mobile No. "
                      name="mobile_no"
                      rules={[
                        {
                          pattern: /^[0-9]{11}$/,
                          message:
                            "Please enter a valid 10-digit mobile number",
                        },
                      ]}
                    >
                      <Input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        maxLength={11}
                        pattern="[0-9]*"
                      />{" "}
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any> label="Father NID" name="f_nid">
                      <Input placeholder="Father NID" />
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any> label="Occupation" name="occupation">
                      <Input placeholder="Occupation" />
                    </Form.Item>
                  </Col>

                  <Col lg={4}>
                    <Form.Item<any> label="Income" name="income">
                      <Input placeholder="Income" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>

          <Col lg={24}>
            <Badge.Ribbon text="Mother Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
                    <Form.Item<any> label="Father Name" name="name">
                      <Input placeholder="Father Name." />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Mobile No. "
                      name="mobile_no"
                      rules={[
                        {
                          pattern: /^[0-9]{11}$/,
                          message:
                            "Please enter a valid 10-digit mobile number",
                        },
                      ]}
                    >
                      <Input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        maxLength={11}
                        pattern="[0-9]*"
                      />{" "}
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any> label="Mother NID" name="m_nid">
                      <Input placeholder="Mother NID" />
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any> label="Occupation" name="occupation">
                      <Input placeholder="Occupation" />
                    </Form.Item>
                  </Col>

                  <Col lg={4}>
                    <Form.Item<any> label="Income" name="income">
                      <Input placeholder="Income" />
                    </Form.Item>
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

export default CreateTeacher;
