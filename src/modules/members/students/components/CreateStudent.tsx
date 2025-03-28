import {
  Badge,
  Card,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Switch,
  Form as AntForm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useEffect, useState } from "react";
import { useCreateStudentMutation } from "../api/studentEndPoints";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../../../common/Password/input";
import { phoneValidator } from "../../../../utilities/validator";
import GenderSelect, {
  ReligionSelect,
} from "../../../../common/commonField/commonFeild";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [create, { isLoading, isSuccess }] = useCreateStudentMutation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [form] = AntForm.useForm();

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const canLogin = AntForm.useWatch("can_login", form);

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    const phoneFields = [
      "contact_phone_number",
      "phone_number",
      "mother_phone_number",
      "local_guardian_phone_number",
      "father_number",
    ];

    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return; // Skip empty values (prevents pushing empty data)
      }

      if (key === "image") {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((file) => {
            if (file?.originFileObj && file.originFileObj instanceof File) {
              formData.append(key, file.originFileObj);
            }
          });
        }
      } else if (key === "date_of_birth") {
        formData.append(key, dayjs(value as any).format("YYYY-MM-DD"));
      } else if (phoneFields.includes(key) && value) {
        // Add "880" prefix ONLY IF value exists
        const phoneNumber = value.toString().trim();
        if (phoneNumber) {
          formData.append(key, `880${phoneNumber}`);
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    const user = {
      username: values.username,
      password: values.password,
    };

    formData.append("user", JSON.stringify(user));

    create(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/students");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          is_active: true,
          can_login: true,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Badge.Ribbon text="Student Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card>
                      <Form.Item
                        label="Picture "
                        name="image"
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

                      {canLogin === true && (
                        <>
                          {" "}
                          <Col lg={8}>
                            <Form.Item<any> label="Username" name="username">
                              <Input placeholder="Username." />
                            </Form.Item>
                          </Col>
                          <Col lg={8}>
                            <PasswordInput isRequired={true} />
                          </Col>
                        </>
                      )}

                      <Col lg={8}>
                        <Form.Item
                          label="Can LogIn"
                          name="can_login"
                          valuePropName="checked"
                          rules={[
                            {
                              required: true,
                              message: "Can LogIn is required!",
                            },
                          ]}
                        >
                          <Switch
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                          />
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
            <Badge.Ribbon text="Contact Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={12}>
                    <Form.Item<any>
                      label="Mobile No for SMS"
                      name="contact_phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Enter Mobile No for SMS",
                        },
                        { validator: phoneValidator },
                      ]}
                    >
                      <Input
                        addonBefore="880"
                        type="tel"
                        placeholder="Enter Mobile Number"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12}>
                    <Form.Item<any>
                      label="Relation Name"
                      name="contact_phone_number_relation"
                    >
                      <Input placeholder="Relation Name" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col lg={24}>
            <Badge.Ribbon text="Other Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={4}>
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
                  <Col lg={4}>
                    <GenderSelect />
                  </Col>
                  <Col lg={4}>
                    <ReligionSelect />
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any>
                      label="Phone Number"
                      name="phone_number"
                      rules={[{ validator: phoneValidator }]}
                    >
                      <Input
                        addonBefore="880"
                        placeholder="Enter Mobile Number"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any> label="Nationality" name="nationality">
                      <Input placeholder="Nationality" />
                    </Form.Item>
                  </Col>
                  <Col lg={4}>
                    <Form.Item<any> label="Email" name="email">
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col lg={12}>
                    <Form.Item<any>
                      label="Present Address"
                      name="present_address"
                    >
                      <Input placeholder="Present Address" />
                    </Form.Item>
                  </Col>
                  <Col lg={12}>
                    <Form.Item<any>
                      label="Permanent Address"
                      name="permanent_address"
                    >
                      <Input placeholder="Permanent Address" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col span={24}>
            <Badge.Ribbon text="Father Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Father Name"
                      name="father_name"
                      rules={[{ required: true, message: "Father Name!" }]}
                    >
                      <Input placeholder="Enter Father Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item label="Father Email" name="father_email">
                      <Input placeholder="Enter Father Email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Phone Number"
                      name="father_number"
                      rules={[{ validator: phoneValidator }]}
                    >
                      <Input
                        addonBefore="880"
                        placeholder="Enter Father Phone Number"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Father Profession"
                      name="father_profession"
                    >
                      <Input placeholder="Enter Father Profession" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Father Designation"
                      name="father_designation"
                    >
                      <Input placeholder="Enter Father Designation" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Education Qualification"
                      name="father_education_qualification"
                    >
                      <Input placeholder="Enter Education Qualification" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>

          <Col span={24}>
            <Badge.Ribbon text="Mother Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Mother Name"
                      name="mother_name"
                      rules={[{ required: true, message: "Mother Name!" }]}
                    >
                      <Input placeholder="Enter Mother Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item label="Mother Email" name="mother_email">
                      <Input placeholder="Enter Mother Email" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Phone Number"
                      name="mother_phone_number"
                      rules={[{ validator: phoneValidator }]}
                    >
                      <Input
                        addonBefore="880"
                        placeholder="Enter Phone Number"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Mother Profession"
                      name="mother_profession"
                    >
                      <Input placeholder="Enter Mother Profession" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Mother Designation"
                      name="mother_designation"
                    >
                      <Input placeholder="Enter Mother Designation" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                    <Form.Item
                      label="Education Qualification"
                      name="mother_education_qualification"
                    >
                      <Input placeholder="Enter Education Qualification" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>

          <Col lg={24}>
            <Badge.Ribbon text="Local Guardian Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Local Guardian Name"
                      name="local_guardian_name"
                    >
                      <Input placeholder="Local Guardian Name." />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Local Guardian Email"
                      name="local_guardian_email"
                    >
                      <Input placeholder="Local Guardian Email" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Local Guardian Phone Number"
                      name="local_guardian_phone_number"
                      rules={[{ validator: phoneValidator }]}
                    >
                      <Input
                        addonBefore="880"
                        placeholder="Local Guardian Phone Number"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Local Guardian Relation"
                      name="local_guardian_relation"
                    >
                      <Input placeholder="Local Guardian Relation" />
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

export default CreateStudent;
