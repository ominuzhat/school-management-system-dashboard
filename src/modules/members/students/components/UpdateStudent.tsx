import {
  Col,
  Input,
  Modal,
  Row,
  Form as AntForm,
  Button,
  Upload,
  Badge,
  Card,
  Select,
  DatePicker,
} from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  useSingleServiceItemQuery,
  useUpdateServiceMutation,
} from "../../../service/api/serviceEndpoints";
import { Form } from "../../../../common/CommonAnt";
import moment from "moment";

interface Props {
  record: any;
}

const UpdateStudent: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleProduct } = useSingleServiceItemQuery({ id: record?.id });

  const [update, { isLoading }] = useUpdateServiceMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [originalImages, setOriginalImages] = useState<any[]>([]);
  const [addImages, setAddImages] = useState<File[]>([]);
  const [deleteImages, setDeleteImages] = useState<number[]>([]);

  console.log("asdasd", deleteImages);

  useEffect(() => {
    if (singleProduct) {
      const initialImages =
        singleProduct.data.images?.map((image: { id: any; image: string }) => ({
          uid: image.id,
          url: image.image,
          thumbUrl: image.image,
          name: `Image-${image.id}`,
        })) || [];
      setOriginalImages(initialImages);
      form.setFieldsValue({
        name: singleProduct.data.name || "name",
        subtitle: singleProduct.data.subtitle || "",
        slug: singleProduct.data.slug || "",
        Icon: singleProduct.data.icon || "",
        faqs: singleProduct.data.faqs || "",
        keyPoints: singleProduct.data.keyPoints || "",
        description: singleProduct.data.description || "",
        images: initialImages,
      });
    }
  }, [singleProduct, form]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleImageChange = ({ fileList }: any) => {
    // Compare with original images to detect new or removed images
    const newImages = fileList.filter(
      (file: any) => !originalImages.some((img) => img.uid === file.uid)
    );

    const removedImages = originalImages.filter(
      (img) => !fileList.some((file: any) => file.uid === img.uid)
    );

    setAddImages(newImages.map((file: any) => file.originFileObj));
    setDeleteImages(removedImages.map((img) => img.uid));
  };

  const onFinish = (values: any): void => {
    const formData: any = new FormData();
    const deleteImages: string[] = [];
    const addImages: any[] = [];

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "images") {
          value.forEach((file) => {
            if (file?.originFileObj) {
              addImages.push(file.originFileObj);
            } else {
              deleteImages.push(file.uid);
            }
          });
        } else if (key === "keyPoints") {
          value.forEach((item: string) => {
            formData.append(key, item);
          });
        } else if (key === "faqs") {
          value.forEach(
            (
              item: { id: number; question: string; answer: string },
              index: number
            ) => {
              formData.append(`${key}[${index}][id]`, item.id.toString());
              formData.append(`${key}[${index}][question]`, item.question);
              formData.append(`${key}[${index}][answer]`, item.answer);
            }
          );
        }
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    // Append addImages and deleteImages to formData
    addImages.forEach((file) => formData.append("addImages", file));

    // Append each deleteImage separately
    deleteImages.forEach((imageId) => {
      formData.append("deleteImages[]", imageId);
    });

    console.log("name", formData);

    // Perform the update
    update({ id: record?.id, data: formData });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
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
                        <Form.Item<any> label="Student Name" name="name">
                          <Input placeholder="Student Name." />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Last Registration"
                          name="registration"
                        >
                          <Input placeholder="Last Registration" />
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Select Class"
                          name="registration"
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
                          name="registration"
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
                          name="registration"
                        >
                          <Input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            maxLength={11}
                            pattern="[0-9]*"
                          />{" "}
                        </Form.Item>
                      </Col>
                      <Col lg={8}>
                        <Form.Item<any>
                          label="Discount In Fee"
                          name="registration"
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

        {/* <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
       
      </Form> */}
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </div>
  );
});

export default UpdateStudent;
