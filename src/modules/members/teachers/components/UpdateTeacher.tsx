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
  Typography,
  Divider,
  Checkbox,
} from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";

import { Form } from "../../../../common/CommonAnt";
import {
  useGetSingleSTeacherQuery,
  useUpdateTeacherMutation,
} from "../api/teachersEndPoints";
import dayjs from "dayjs";
import PasswordInput from "../../../../common/Password/input";
import { phoneValidator } from "../../../../utilities/validator";
import GenderSelect, {
  BloodGroupSelect,
  ReligionSelect,
} from "../../../../common/commonField/commonFeild";
import { useGetClassesBigListQuery } from "../../../general settings/classes/api/classesEndPoints";

interface Props {
  record: any;
}

const UpdateTeacher: React.FC<Props> = React.memo(({ record }) => {
  const [form] = AntForm.useForm();
  const { data: singleTeacher } = useGetSingleSTeacherQuery(record?.id);

  const { data: classData } = useGetClassesBigListQuery<any>({});
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [update, { isLoading }] = useUpdateTeacherMutation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (singleTeacher) {
      const phoneNumber = singleTeacher?.data?.phone_number?.startsWith("880")
        ? singleTeacher.data.phone_number.substring(3)
        : singleTeacher?.data?.phone_number;

      // Extract subject IDs from the subjects array
      const subjectSpecializationIds =
        singleTeacher?.data?.subject_specializations?.map(
          (subject: any) => subject.id
        ) || [];
      const subjectIds =
        singleTeacher?.data?.subjects?.map((subject: any) => subject.id) || [];

      // Update the selectedSubjects state
      setSelectedSubjects(subjectIds);

      const initialImages =
        singleTeacher?.data?.image &&
        typeof singleTeacher?.data?.image === "string"
          ? [
              {
                uid: "-1",
                url: singleTeacher?.data?.image,
                thumbUrl: singleTeacher?.data?.image,
                name: "Profile Image",
              },
            ]
          : [];

      form.setFieldsValue({
        ...singleTeacher.data,
        username: singleTeacher?.data?.user?.username,
        hire_date: dayjs(singleTeacher?.data?.hire_date),
        date_of_birth: dayjs(singleTeacher?.data?.date_of_birth),
        subject_specialization: subjectSpecializationIds,
        subjects: subjectIds,
        image: initialImages,
        phone_number: phoneNumber,
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
      if (key === "image") {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((file) => {
            if (file?.originFileObj && file.originFileObj instanceof File) {
              formData.append(key, file.originFileObj);
            }
          });
        }
      } else if (key === "hire_date" && value) {
        const formattedDate = dayjs(value as any).format("YYYY-MM-DD");
        formData.append(key, formattedDate);
      } else if (key === "phone_number") {
        formData.append(key, `880${value}`);
      } else if (key === "date_of_birth" && value) {
        const formattedDate = dayjs(value as any).format("YYYY-MM-DD");
        formData.append(key, formattedDate);
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    // Append selected subjects
    selectedSubjects.forEach((subjectId: number) => {
      formData.append("subjects", subjectId.toString());
    });

    update({ id: record?.id, data: formData });
  };

  // Group subjects by class

  // console.log(groupedSubjects);

  const handleSubjectChange = (subjectId: number, checked: boolean) => {
    setSelectedSubjects((prev) =>
      checked ? [...prev, subjectId] : prev.filter((id) => id !== subjectId)
    );
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} isLoading={isLoading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Badge.Ribbon text="Teacher Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}>
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
                  <Col xs={24} sm={24} md={16} lg={18} xl={18} xxl={18}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item<any> label="First Name" name="first_name">
                          <Input placeholder="First Name." />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item<any> label="Last Name" name="last_name">
                          <Input placeholder="Last Name." />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item<any> label="Email" name="email">
                          <Input placeholder="Email" />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item<any> label="Hire Date" name="hire_date">
                          <DatePicker
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item<any>
                          label="Phone Number"
                          name="phone_number"
                          rules={[{ validator: phoneValidator }]}
                        >
                          <Input
                            addonBefore="+088"
                            placeholder="Enter Phone Number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item<any> label="Base Salary" name="base_salary">
                          <Input placeholder="Base Salary." type="number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Username" name="username">
                          <Input placeholder="Username." disabled />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                        <PasswordInput isRequired={false} />
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
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

          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Badge.Ribbon text="Other Information" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
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
                        disabledDate={(current) =>
                          current && current > dayjs().endOf("day")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <Form.Item<any>
                      label="Teacher Birth ID / NID"
                      name="national_id"
                    >
                      <Input placeholder="Teacher Birth ID / NID" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <Form.Item<any>
                      label="Father / Husband Name"
                      name="father_or_husband_name"
                    >
                      <Input placeholder="Father / Husband Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <Form.Item<any>
                      label="Education Qualification"
                      name="education"
                    >
                      <Input placeholder="Education" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <Form.Item<any> label="Experience" name="experience">
                      <Input placeholder="Experience" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <GenderSelect />
                  </Col>

                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <ReligionSelect />
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <BloodGroupSelect />
                  </Col>

                  {/* <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                    <Form.Item
                      label="Subject Specialization"
                      name="subject_specialization"
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        showSearch
                        style={{ width: "100%" }}
                        placeholder={
                          subjectLoading
                            ? "Loading Subjects..."
                            : "Please Select Specialization"
                        }
                        options={
                          subjectData?.data?.results?.map(
                            (subjectItem: any) => ({
                              label: `${subjectItem.name} (${subjectItem?.grade_level?.name})`,
                              value: subjectItem.id,
                            })
                          ) || []
                        }
                      />
                    </Form.Item>
                  </Col> */}
                  <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={6}>
                    <Form.Item<any> label="Address" name="home_address">
                      <Input placeholder="Address" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Badge.Ribbon text="Subjects Permissions" placement="start">
              <Card style={{ paddingTop: "20px" }}>
                <Typography.Title level={5} style={{ marginBottom: 24 }}>
                  Select subjects you teach:
                </Typography.Title>

                {classData?.data?.map((classInfo: any) => (
                  <Card key={classInfo.classId}>
                    <Typography.Title level={5} style={{ marginBottom: 8 }}>
                      {classInfo.name}
                    </Typography.Title>
                    <Divider style={{ marginTop: 0, marginBottom: 12 }} />

                    <Row gutter={[16, 16]}>
                      {classInfo.subjects.map((subject: any) => (
                        <Col
                          key={subject.id}
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          xl={6}
                          xxl={4}
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleSubjectChange(subject.id, e.target.checked)
                            }
                            checked={selectedSubjects.includes(subject.id)}
                          >
                            {subject.name}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                ))}
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default UpdateTeacher;
