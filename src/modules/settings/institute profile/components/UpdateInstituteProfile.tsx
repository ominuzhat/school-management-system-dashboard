import React, { useEffect, useState } from "react";
import {
  Col,
  Form as AntForm,
  Input,
  Row,
  Button,
  Badge,
  Card,
  Form,
  Modal,
  DatePicker,
  Select,
} from "antd";

import {
  IInstituteProfile,
  IInstituteProfileWrapper,
} from "../type/InstituteProfile";
import { useUpdateInstituteProfileMutation } from "../api/instituteProfileEndPoint";
import Upload from "antd/es/upload/Upload";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetAdmissionSessionQuery } from "../../../general settings/admission session/api/admissionSessionEndPoints";

interface Props {
  record: IInstituteProfileWrapper;
}

const { Option } = Select;
const UpdateInstituteProfile: React.FC<Props> = ({ record }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [form] = AntForm.useForm();
  const { data: sessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });
  const [update, { isLoading }] = useUpdateInstituteProfileMutation();

  useEffect(() => {
    if (record?.data) {
      form.setFieldsValue({
        name: record?.data?.name || "",
        prefix: record?.data?.prefix || "",
        address: record?.data?.address || "",
        contact_email: record?.data?.contact_email || "",
        phone_number: record?.data?.phone_number || "",
        institution_type: record?.data?.institution_type || "",
        website_url: record?.data?.website_url || "",
        founder: record?.data?.founder || "",
        description: record?.data?.description || "",
        facebook_url: record?.data?.facebook_url || "",
        twitter_url: record?.data?.twitter_url || "",
        linkedin_url: record?.data?.linkedin_url || "",
        city: record?.data?.city || "",
        campus_size: record?.data?.campus_size || "",
        num_students: record?.data?.num_students || "",
        accreditations: record?.data?.accreditations || "",
        ownership_type: record?.data?.ownership_type || "",
        latitude: record?.data?.latitude || "",
        longitude: record?.data?.longitude || "",
        current_session: record?.data?.current_session?.id || "",
        weekend_days: record?.data?.weekend_days || [],
        established_date: record?.data?.established_date
          ? dayjs(record?.data?.established_date)
          : null,
      });
    }
  }, [record, form]);

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
      if (key === "logo") {
        if (Array.isArray(value) && value[0]?.originFileObj) {
          formData.append("logo", value[0]?.originFileObj);
        }
      } else if (key === "established_date" && value) {
        if (typeof value === "string" || typeof value === "number") {
          const formattedDate = new Date(value).toISOString().split("T")[0];
          formData.append(key, formattedDate);
        }
      } else if (key === "weekend_days" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    update({ data: formData });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Badge.Ribbon text="Basic Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card>
                      <Form.Item
                        label="Institution Logo "
                        name="logo"
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
                          defaultFileList={
                            record?.data?.logo
                              ? [
                                  {
                                    uid: "-1",
                                    name: "logo",
                                    status: "done",
                                    url: record?.data?.logo,
                                  },
                                ]
                              : []
                          }
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
                        <Form.Item<IInstituteProfile>
                          label="Institution Name"
                          name="name"
                        >
                          <Input placeholder="Institution Name." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile>
                          label="Address"
                          name="address"
                        >
                          <Input placeholder="Address" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile> label="City" name="city">
                          <Input placeholder="City" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile>
                          label="Contact Email"
                          name="contact_email"
                        >
                          <Input type="email" placeholder="Contact Email" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile>
                          label="Mobile No."
                          name="phone_number"
                        >
                          <Input placeholder="Enter Mobile Number" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile>
                          label="Established Date"
                          name="established_date"
                        >
                          <DatePicker
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile>
                          label="Institution Type"
                          name="institution_type"
                        >
                          <Select placeholder="Select institution type">
                            <Option value="University">University</Option>
                            <Option value="College">College</Option>
                            <Option value="Coaching">Coaching</Option>
                            <Option value="School">School</Option>
                            <Option value="Research Institute">
                              Research Institute
                            </Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<IInstituteProfile>
                          label="Session"
                          name="current_session"
                        >
                          <Select
                            className="w-full"
                            placeholder="Session"
                            allowClear
                          >
                            {Array.isArray(sessionData?.data) &&
                              sessionData?.data?.map((data: any) => (
                                <Option key={data.id} value={data.id}>
                                  {data.name}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col lg={8}>
                        <Form.Item name="weekend_days" label="Weekend Days">
                          <Select
                            mode="multiple"
                            placeholder="Select weekend days"
                          >
                            <Option value="sunday">Sunday</Option>
                            <Option value="monday">Monday</Option>
                            <Option value="tuesday">Tuesday</Option>
                            <Option value="wednesday">Wednesday</Option>
                            <Option value="thursday">Thursday</Option>
                            <Option value="friday">Friday</Option>
                            <Option value="saturday">Saturday</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col lg={24}>
            <Badge.Ribbon text="Social Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Website URL"
                      name="website_url"
                    >
                      <Input placeholder="https://www.codecanvascreation.com/" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Facebook URL"
                      name="facebook_url"
                    >
                      <Input placeholder="https://www.codecanvascreation.com/" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Twiter URL"
                      name="twitter_url"
                    >
                      <Input placeholder="https://www.codecanvascreation.com/" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="linkedin URL"
                      name="linkedin_url"
                    >
                      <Input placeholder="https://www.codecanvascreation.com/" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col lg={24}>
            <Badge.Ribbon text="Additional Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Founder"
                      name="founder"
                    >
                      <Input placeholder="Founder." />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Description"
                      name="description"
                    >
                      <Input placeholder="Description." />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Campus Size"
                      name="campus_size"
                    >
                      <Input placeholder="Campus Size" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Num Of Students"
                      name="num_students"
                    >
                      <Input placeholder="Num Of Students" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Accreditations"
                      name="accreditations"
                    >
                      <Input placeholder="Accreditations" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Ownership Type"
                      name="ownership_type"
                    >
                      <Select placeholder="Select Ownership type">
                        <Option value="Public">Public</Option>
                        <Option value="Private">Private</Option>
                        <Option value="Non-profit">Non Profit</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Latitude"
                      name="latitude"
                    >
                      <Input placeholder="Latitude" />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<IInstituteProfile>
                      label="Longitude"
                      name="longitude"
                    >
                      <Input placeholder="Longitude" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
        <br />
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </React.Fragment>
  );
};

export default UpdateInstituteProfile;
