import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Switch,
  Upload,
  Modal,
  Divider,
  Typography,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { phoneValidator } from "../../../../../utilities/validator";
import GenderSelect, {
  ReligionSelect,
} from "../../../../../common/commonField/commonFeild";

const { Item } = Form;
const { Title } = Typography;

const CreateStudentInformation = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Color constants
  const cardHeaderBg = "#f0f7ff";
  const activeSwitchColor = "#1890ff";
  const dividerColor = "#f0f0f0";
  const primaryButtonColor = "#1890ff";
  // const errorColor = "#ff4d4f";

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Here you would typically call your API
      console.log("Form values:", values);
      message.success("Student information saved successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to save student information");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Photo</div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          is_active: true,
          can_login: true,
        }}
        layout="vertical"
      >
        {/* Student Information Section */}
        <Card
          title={
            <Title level={4} className="m-0 text-gray-800">
              Basic Details
            </Title>
          }
          headStyle={{ background: cardHeaderBg }}
          className="mb-6 shadow-sm hover:shadow-md transition-all"
          bordered={false}
        >
          <Row gutter={[24, 16]}>
            {/* Profile Picture */}
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <Item
                label="Profile Picture"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  { required: true, message: "Profile picture is required" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  maxCount={1}
                  onPreview={handlePreview}
                  className="avatar-uploader"
                  accept="image/*"
                >
                  {uploadButton}
                </Upload>
              </Item>
              <Modal
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="preview"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>

            {/* Student Details */}
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                  <Item
                    label="First Name"
                    name="first_name"
                    rules={[
                      { required: true, message: "First name is required" },
                    ]}
                  >
                    <Input placeholder="First name" className="w-full" />
                  </Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                  <Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                      { required: true, message: "Last name is required" },
                    ]}
                  >
                    <Input placeholder="Last name" className="w-full" />
                  </Item>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                  <GenderSelect />
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                  <ReligionSelect />
                </Col>

                <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                  <Item
                    label="Date of Birth"
                    name="date_of_birth"
                    rules={[
                      { required: true, message: "Date of birth is required" },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                      disabledDate={(current) => current > dayjs().endOf("day")}
                    />
                  </Item>
                </Col>

                <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                  <Item
                    label="Can Login"
                    name="can_login"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      style={{ backgroundColor: activeSwitchColor }}
                    />
                  </Item>
                </Col>

                <Col xs={24} sm={12} md={4} lg={4} xl={4}>
                  <Item label="Status" name="is_active" valuePropName="checked">
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="Inactive"
                      style={{ backgroundColor: activeSwitchColor }}
                    />
                  </Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* Contact Information Section */}
        <Card
          title={
            <Title level={4} className="m-0 text-gray-800">
              Contact Details
            </Title>
          }
          headStyle={{ background: cardHeaderBg }}
          className="mb-6 shadow-sm hover:shadow-md transition-all"
          bordered={false}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Item
                label="Mobile No for SMS"
                name="contact_phone_number"
                rules={[
                  { required: true, message: "Mobile number is required" },
                  { validator: phoneValidator },
                ]}
              >
                <Input
                  addonBefore="+880"
                  placeholder="1XXXXXXXXX"
                  className="w-full"
                />
              </Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Item
                label="Relation Name"
                name="contact_phone_number_relation"
                rules={[{ required: true, message: "Relation is required" }]}
              >
                <Input placeholder="Relation to student" className="w-full" />
              </Item>
            </Col>
          </Row>
        </Card>

        {/* Other Information Section */}
        <Card
          title={
            <Title level={4} className="m-0 text-gray-800">
              Additional Details
            </Title>
          }
          headStyle={{ background: cardHeaderBg }}
          className="mb-6 shadow-sm hover:shadow-md transition-all"
          bordered={false}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Item
                label="Email"
                name="email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="student@example.com" className="w-full" />
              </Item>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6} xl={12}>
              <Item
                label="Phone Number"
                name="phone_number"
                rules={[{ validator: phoneValidator }]}
              >
                <Input
                  addonBefore="+880"
                  placeholder="1XXXXXXXXX"
                  className="w-full"
                />
              </Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Item label="Present Address" name="present_address">
                <Input.TextArea
                  placeholder="Current address"
                  rows={2}
                  showCount
                  maxLength={200}
                />
              </Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Item label="Permanent Address" name="permanent_address">
                <Input.TextArea
                  placeholder="Permanent address"
                  rows={2}
                  showCount
                  maxLength={200}
                />
              </Item>
            </Col>
          </Row>
        </Card>

        {/* Parent Information Sections */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              title={
                <Title level={4} className="m-0 text-gray-800">
                  Father's Details
                </Title>
              }
              headStyle={{ background: cardHeaderBg }}
              className="mb-6 shadow-sm hover:shadow-md transition-all"
              bordered={false}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Item
                    label="Father's Name"
                    name="father_name"
                    rules={[
                      { required: true, message: "Father's name is required" },
                    ]}
                  >
                    <Input
                      placeholder="Father's full name"
                      className="w-full"
                    />
                  </Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Item
                    label="Phone Number"
                    name="father_number"
                    rules={[
                      {
                        required: true,
                        message: "Father's phone number is required",
                      },
                      { validator: phoneValidator },
                    ]}
                  >
                    <Input
                      addonBefore="+880"
                      placeholder="1XXXXXXXXX"
                      className="w-full"
                    />
                  </Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Item
                    label="Profession"
                    name="father_profession"
                    rules={[
                      { required: true, message: "Profession is required" },
                    ]}
                  >
                    <Input
                      placeholder="Father's profession"
                      className="w-full"
                    />
                  </Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              title={
                <Title level={4} className="m-0 text-gray-800">
                  Mother's Details
                </Title>
              }
              headStyle={{ background: cardHeaderBg }}
              className="mb-6 shadow-sm hover:shadow-md transition-all"
              bordered={false}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Item
                    label="Mother's Name"
                    name="mother_name"
                    rules={[
                      { required: true, message: "Mother's name is required" },
                    ]}
                  >
                    <Input
                      placeholder="Mother's full name"
                      className="w-full"
                    />
                  </Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Item
                    label="Phone Number"
                    name="mother_phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Mother's phone number is required",
                      },
                      { validator: phoneValidator },
                    ]}
                  >
                    <Input
                      addonBefore="+880"
                      placeholder="1XXXXXXXXX"
                      className="w-full"
                    />
                  </Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Item
                    label="Profession"
                    name="mother_profession"
                    rules={[
                      { required: true, message: "Profession is required" },
                    ]}
                  >
                    <Input
                      placeholder="Mother's profession"
                      className="w-full"
                    />
                  </Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Guardian Information Section */}
        <Card
          title={
            <Title level={4} className="m-0 text-gray-800">
              Guardian Details
            </Title>
          }
          headStyle={{ background: cardHeaderBg }}
          className="shadow-sm hover:shadow-md transition-all"
          bordered={false}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Item
                label="Guardian Name"
                name="local_guardian_name"
                rules={[
                  { required: true, message: "Guardian name is required" },
                ]}
              >
                <Input placeholder="Guardian's full name" className="w-full" />
              </Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Item
                label="Phone Number"
                name="local_guardian_phone_number"
                rules={[
                  { required: true, message: "Phone number is required" },
                  { validator: phoneValidator },
                ]}
              >
                <Input
                  addonBefore="+880"
                  placeholder="1XXXXXXXXX"
                  className="w-full"
                />
              </Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Item
                label="Relation"
                name="local_guardian_relation"
                rules={[{ required: true, message: "Relation is required" }]}
              >
                <Input
                  placeholder="Relationship to student"
                  className="w-full"
                />
              </Item>
            </Col>
          </Row>
        </Card>

        {/* Form Submission */}
        <Divider style={{ borderColor: dividerColor }} />
        <Row justify="end" className="mt-6">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{
                backgroundColor: primaryButtonColor,
                width: 150,
                height: 40,
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateStudentInformation;
