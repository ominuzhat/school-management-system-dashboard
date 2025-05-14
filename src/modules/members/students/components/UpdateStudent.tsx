import {
  Col,
  Input,
  Modal,
  Row,
  Form as AntForm,
  Upload,
  Badge,
  Card,
  DatePicker,
  Switch,
  Avatar,
} from "antd";
import { useState, useEffect } from "react";
import { Form } from "../../../../common/CommonAnt";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "../api/studentEndPoints";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { phoneValidator } from "../../../../utilities/validator";
import GenderSelect, {
  ReligionSelect,
} from "../../../../common/commonField/commonFeild";

const UpdateStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const { data: singleStudent } = useGetSingleStudentQuery(Number(studentId));
  const [update, { isLoading, isSuccess }] = useUpdateStudentMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageFileList, setImageFileList] = useState<any>([]);

  // const [originalImages, setOriginalImages] = useState<any[]>([]);

  const phoneFields = [
    "contact_phone_number",
    "phone_number",
    "mother_phone_number",
    "local_guardian_phone_number",
    "father_number",
  ];

  console.log(singleStudent?.data);
  useEffect(() => {
    if (singleStudent) {
      const data = { ...singleStudent.data };

      Object.keys(data).forEach((key) => {
        if (data[key] === null) {
          data[key] = "";
        }
      });

      phoneFields.forEach((field) => {
        if (data[field]?.startsWith("880")) {
          data[field] = data[field].slice(3);
        }
      });

      const hasImage = typeof data.image === "string" && data.image !== "";

      const initialImages = hasImage
        ? [
            {
              uid: "-1",
              url: data.image,
              thumbUrl: data.image,
              name: "Profile Image",
            },
          ]
        : [];

      setImageFileList(initialImages);

      form.setFieldsValue({
        ...data,
        username: data?.user?.username || "",
        date_of_birth: data?.date_of_birth
          ? dayjs(data?.date_of_birth)
          : undefined,
        image: initialImages,
      });
    }

    if (isSuccess) {
      navigate("/students");
    }
  }, [form, isSuccess, navigate, singleStudent]);

  const handleImageChange = ({ fileList }: any) => {
    setImageFileList(fileList);
  };

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleCancel = () => setPreviewVisible(false);

  const onFinish = (values: any) => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "image") {
          value.forEach((file) => {
            if (file?.originFileObj && file.originFileObj instanceof File) {
              formData.append(key, file.originFileObj);
            }
          });
        } else {
          value.forEach((item) => {
            formData.append(key, item);
          });
        }
      } else if (key === "date_of_birth" && value) {
        const formattedDate = dayjs(value as any).format("YYYY-MM-DD");
        formData.append(key, formattedDate);
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (phoneFields.includes(key)) {
        formData.append(key, `880${value}`);
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    update({ id: Number(studentId), data: formData });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} isLoading={isLoading}>
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Badge.Ribbon text="Student Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card>
                      <Form.Item
                        label="Picture"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                          if (Array.isArray(e)) {
                            return e;
                          }
                          return e?.fileList;
                        }}
                      >
                        {/* <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          listType="picture-card"
                          onPreview={handlePreview}
                          showUploadList={{ showRemoveIcon: true }}
                        >
                          <PlusOutlined />
                        </Upload> */}
                        <Upload
                          listType="picture-card"
                          fileList={imageFileList}
                          onChange={handleImageChange}
                          onPreview={handlePreview}
                          showUploadList={{ showRemoveIcon: true }}
                          beforeUpload={() => false}
                        >
                          {imageFileList.length === 0 && (
                            <Avatar
                              shape="square"
                              size={104}
                              src="/public/no-image.png"
                            />
                          )}
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
                        <Form.Item<any> label="First Name" name="first_name">
                          <Input placeholder="First Name." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any> label="Last Name" name="last_name">
                          <Input placeholder="Last Name." />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item
                          label="Can LogIn"
                          name="can_login"
                          valuePropName="checked"
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
                      rules={[{ validator: phoneValidator }]}
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
                    <Form.Item<any> label="Email" name="email">
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col lg={5}>
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
                  <Col lg={5}>
                    <Form.Item<any> label="Date of Birth" name="date_of_birth">
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
                  <Col lg={5}>
                    <GenderSelect />
                  </Col>
                  <Col lg={5}>
                    <ReligionSelect />
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
          <Col lg={24}>
            <Badge.Ribbon text="Father Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={8}>
                    <Form.Item<any> label="Father Name" name="father_name">
                      <Input placeholder="Father Name." />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item<any>
                      label="Phone Number"
                      name="father_number"
                      rules={[{ validator: phoneValidator }]}
                    >
                      <Input addonBefore="880" placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item<any>
                      label="Father Profession"
                      name="father_profession"
                    >
                      <Input placeholder="Father Profession" />
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
                  <Col lg={8}>
                    <Form.Item<any> label="Mother Name" name="mother_name">
                      <Input placeholder="Mother Name." />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item<any>
                      label="Phone Number"
                      name="mother_phone_number"
                      rules={[{ validator: phoneValidator }]}
                    >
                      <Input addonBefore="880" placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item<any>
                      label="Mother Profession"
                      name="mother_profession"
                    >
                      <Input placeholder="Mother Profession" />
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
                  <Col lg={8}>
                    <Form.Item<any>
                      label="Local Guardian Name"
                      name="local_guardian_name"
                    >
                      <Input placeholder="Local Guardian Name." />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
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
                  <Col lg={8}>
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
export default UpdateStudent;
