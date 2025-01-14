import { Badge, Card, Col, DatePicker, Input, Modal, Row, Select } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Upload } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useState } from "react";
import moment from "moment";
import { ICreateTeacher } from "../types/teacherType";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
} from "../../../../utilities/validator";
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

    const teacherData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      hire_date: dayjs(values.hire_date).format("YYYY-MM-DD"),
      user: {
        password: values.password,
        username: values.username,
      },
    };

    // Object.entries(values).forEach(([key, value]) => {
    //   if (Array.isArray(value)) {
    //     if (key === "images") {
    //       // Handle the images array specifically
    //       value.forEach((file) => {
    //         if (file?.originFileObj) {
    //           formData.append(key, file.originFileObj);
    //         }
    //       });
    //     } else if (typeof value[0] === "object" && value[0] !== null) {
    //       // Handle faqs or other objects in arrays
    //       value.forEach((item, index) => {
    //         formData.append(`${key}[${index}][question]`, item.question);
    //         formData.append(`${key}[${index}][answer]`, item.answer);
    //       });
    //     } else {
    //       // Handle keyPoints or other arrays of strings
    //       value.forEach((item) => {
    //         formData.append(key, item);
    //       });
    //     }
    //   } else if (value instanceof File || value instanceof Blob) {
    //     // If the value is a file or blob
    //     formData.append(key, value);
    //   } else {
    //     // For regular string/number values
    //     formData.append(key, value as string | Blob);
    //   }
    // });

    console.log("ascfasd", teacherData);

    create(teacherData);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ keyPoints: [""], faqs: [{}] }}
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
                        <Form.Item<ICreateTeacher>
                          label="First Name"
                          name="first_name"
                          rules={[{ required: true, message: "First Name!" }]}
                        >
                          <Input placeholder="First Name." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<ICreateTeacher>
                          label="Last Name"
                          name="last_name"
                          rules={[{ required: true, message: "Last Name!" }]}
                        >
                          <Input placeholder="Last Name." />
                        </Form.Item>
                      </Col>{" "}
                      <Col lg={8}>
                        <Form.Item<any>
                          label="User Name"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your user name",
                            },
                          ]}
                        >
                          <Input type="text" placeholder="Enter User Name" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Password",
                            },
                          ]}
                        >
                          <Input.Password
                            placeholder="Enter password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<ICreateTeacher>
                          label="Email"
                          name="email"
                          rules={[
                            { required: true, message: "Email" },
                            { validator: emailValidator },
                          ]}
                        >
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<ICreateTeacher>
                          label="Hire Date"
                          name="hire_date"
                          rules={[{ required: true, message: "Hire Date" }]}
                        >
                          <DatePicker
                            placeholder="Select Date"
                            defaultValue={moment()}
                            format="YYYY-MM-DD"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Mobile No. for SMS/WhatsApp"
                          name="phone_number"
                          rules={[
                            {
                              required: false,
                              message: "Please enter your mobile number",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Enter Mobile Number"
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
                    <Form.Item<any> label="Date of Birth" name="dof">
                      <DatePicker
                        placeholder="Select Date"
                        format="YYYY-MM-DD"
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Teacher's Birth ID / NID"
                      name="registration"
                    >
                      <Input placeholder="Teacher's Birth ID / NID" />
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
        </Row>
      </Form>
    </div>
  );
};

export default CreateTeacher;
