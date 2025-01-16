import { Badge, Card, Col, DatePicker, Input, Modal, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useState } from "react";
import moment from "moment";
import { useCreateStudentMutation } from "../api/studentEndPoints";

const CreateStudent = () => {
  const [create, { isLoading, isSuccess }] = useCreateStudentMutation();
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
          // Handle the images array specifically
          value.forEach((file) => {
            if (file?.originFileObj) {
              formData.append(key, file.originFileObj);
            }
          });
        } else if (typeof value[0] === "object" && value[0] !== null) {
          // Handle faqs or other objects in arrays
          value.forEach((item, index) => {
            formData.append(`${key}[${index}][question]`, item.question);
            formData.append(`${key}[${index}][answer]`, item.answer);
          });
        } else {
          // Handle keyPoints or other arrays of strings
          value.forEach((item) => {
            formData.append(key, item);
          });
        }
      } else if (value instanceof File || value instanceof Blob) {
        // If the value is a file or blob
        formData.append(key, value);
      } else {
        // For regular string/number values
        formData.append(key, value as string | Blob);
      }
    });

    console.log("ascfasd", values);

    create(formData);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Badge.Ribbon text="Student Information" placement="start">
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
                          label="Select Class"
                          name="registration"
                          rules={[{ required: true, message: "Select Class" }]}
                        >
                          <Select placeholder="Select Class" className="w-full">
                            {/* {categoryData?.data?.map((category) => (
                    <Select.Option key={category.id} value={category?.id}>
                        {category?.name}
                    </Select.Option>
                    ))} */}

                            <Select.Option value={1}>1</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Date of Admission"
                          name="enrollment_date"
                          rules={[
                            { required: true, message: "Date of Admission" },
                          ]}
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
                          label="Mobile No for SMS/WhatsApp"
                          name="phone_number"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your mobile number",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Mobile Number" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Discount In Fee"
                          name="registration"
                          rules={[
                            { required: true, message: "Discount In Fee" },
                          ]}
                        >
                          <Input placeholder="In %" />
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
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item<any>
                      label="Student Birth ID / NID"
                      name="registration"
                    >
                      <Input placeholder="Student Birth ID / NID" />
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

export default CreateStudent;
