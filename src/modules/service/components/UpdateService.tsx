import { Col, Input, Modal, Row, Form as AntForm, Button, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  useSingleServiceItemQuery,
  useUpdateServiceMutation,
} from "../api/serviceEndpoints";
import { TServiceDataTypes } from "../types/serviceTypes";
import KeyPoint from "./KeyPoint";
import FaqForm from "./Faqs";
import UpdateKeyPoint from "./UpdateKeyPoints";

interface Props {
  record: any;
}

const UpdateService: React.FC<Props> = React.memo(({ record }) => {
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
        title: singleProduct.data.title || "",
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

    // Perform the update
    update({ id: record?.id, data: formData });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col lg={8}>
            <AntForm.Item<TServiceDataTypes> label="Title" name="title">
              <Input placeholder="Product Title." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item<TServiceDataTypes> label="Subtitle" name="subtitle">
              <Input placeholder="Product Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item<TServiceDataTypes> label="Slug" name="slug">
              <Input placeholder="Product Slug." />
            </AntForm.Item>
          </Col>

          <Col lg={6}>
            <AntForm.Item<TServiceDataTypes> label="Icon" name="icon">
              <Input placeholder="Product Icon." type="text" />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <KeyPoint />
          </Col>
          <Col lg={8}>
            <FaqForm />
          </Col>

          <Col lg={16}>
            <AntForm.Item<TServiceDataTypes>
              label="Description"
              name="description"
            >
              <TextArea rows={4} placeholder="Product Description." />
            </AntForm.Item>
          </Col>

          <Col lg={16}>
            <AntForm.Item
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
                onChange={handleImageChange}
                showUploadList={{ showRemoveIcon: true }}
              >
                <PlusOutlined />
              </Upload>
            </AntForm.Item>
          </Col>

          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </div>
  );
});

export default UpdateService;
