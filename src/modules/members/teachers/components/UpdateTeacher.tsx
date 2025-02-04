import {
  Col,
  Input,
  Modal,
  Row,
  Form as AntForm,
  Upload,
  Badge,
  Card,
  Select,
  DatePicker,
  Switch,
} from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";

import { Form } from "../../../../common/CommonAnt";
import {
  useGetSingleSTeacherQuery,
  useUpdateTeacherMutation,
} from "../api/teachersEndPoints";
import dayjs from "dayjs";

interface Props {
  record: any;
}

const UpdateTeacher: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleTeacher } = useGetSingleSTeacherQuery(record?.id);

  const [update, { isLoading }] = useUpdateTeacherMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [originalImages, setOriginalImages] = useState<any[]>([]);
  console.log(originalImages);

  useEffect(() => {
    if (singleTeacher) {
      const initialImages =
        singleTeacher.data?.images?.map(
          (image: { id: any; image: string }) => ({
            uid: image.id,
            url: image.image,
            thumbUrl: image.image,
            name: `Image-${image.id}`,
          })
        ) || [];
      setOriginalImages(initialImages);
      form.setFieldsValue({
        ...singleTeacher.data,
        username: singleTeacher?.data?.user?.username,
        hire_date: dayjs(singleTeacher?.data?.hire_date),
        date_of_birth: dayjs(singleTeacher?.data?.date_of_birth),
        picture: initialImages,
      });
    }
  }, [form, singleTeacher]);

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
        if (key === "picture") {
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

    // update(formData);
    update({ id: record?.id, data: formData });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
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
                        <Form.Item<any> label="Email" name="email">
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item<any> label="Hire Date" name="hire_date">
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
                        >
                          <Input placeholder="Enter Mobile Number" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any> label="Base Salary" name="base_salary">
                          <Input placeholder="Base Salary." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Username" name="username">
                          <Input placeholder="Username." disabled />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item label="Password" name="password">
                          <Input.Password placeholder="Password." />
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
            <Badge.Ribbon text="Other Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
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
                        <Select.Option value={"other"}>Other</Select.Option>
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
        </Row>
      </Form>
    </div>
  );
});

export default UpdateTeacher;
