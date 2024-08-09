import { Col, Input, Modal, Row } from "antd";
import { Form } from "../../../common/CommonAnt";

import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useCreateServiceMutation } from "../api/serviceEndpoints";
import { TServiceDataTypes } from "../types/serviceTypes";
import KeyPoint from "./KeyPoint";
import FaqForm from "./Faqs";

const CreateService = () => {
  const [create, { isLoading, isSuccess }] = useCreateServiceMutation();

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

    // Use create(formData) or another method to handle the form submission
    create(formData);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ keyPoints: [""], faqs: [{}] }}
      >
        <Row gutter={16}>
          <Col lg={8}>
            <Form.Item<TServiceDataTypes>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Product Title!" }]}
            >
              <Input placeholder="Product Title." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TServiceDataTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Product Subtitle!" }]}
            >
              <Input placeholder="Product Subtitle." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TServiceDataTypes>
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Product Slug!" }]}
            >
              <Input placeholder="Product Slug." />
            </Form.Item>
          </Col>

          <Col lg={6}>
            <Form.Item<TServiceDataTypes>
              label="Icon"
              name="icon"
              rules={[{ required: true, message: "Product Icon !" }]}
            >
              <Input placeholder="Product Icon." type="text" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <KeyPoint />
          </Col>
          <Col lg={8}>
            <FaqForm />
          </Col>

          <Col lg={16}>
            <Form.Item<TServiceDataTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Product Description !" }]}
            >
              <TextArea rows={4} placeholder="Product Description." />
            </Form.Item>
          </Col>
          {/* <Col lg={24}>
            <Form.Item<TServiceDataTypes>
              label="Images"
              name="images"
              rules={[{ required: true, message: "Product Images !" }]}
            >
              <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                accept=".png,.jpeg,.doc"
                onChange={handleChange}
                beforeUpload={(file) => {
                  // Handle file upload here if needed
                  // For example, you can add validation or processing here
                  return false; // Prevent the default upload behavior
                }}
              >
                {fileList.length >= 20 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col> */}

          <Form.Item
            label="Product Images"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            rules={[{ required: true, message: "Product Images !" }]}
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
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
      </Form>
    </div>
  );
};

export default CreateService;
