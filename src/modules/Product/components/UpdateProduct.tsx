import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Form as AntForm,
  Button,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  useSingleProductItemQuery,
  useUpdateProductMutation,
} from "../api/productEndPoints";
import { useGetCategoryQuery } from "../../Configuration/Category/api/CategoryEndPoints";

interface Props {
  record: any;
}

const UpdateProduct: React.FC<Props> = React.memo(({ record }) => {
  const { data: singleProduct } = useSingleProductItemQuery({ id: record?.id });

  const { data: categoryData } = useGetCategoryQuery({});
  const [update, { isLoading }] = useUpdateProductMutation();
  const [form] = AntForm.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (singleProduct) {
      form.setFieldsValue({
        category: singleProduct.data.category?.id || "",
        title: singleProduct.data.title || "",
        subtitle: singleProduct.data.subtitle || "",
        slug: singleProduct.data.slug || "",
        price: singleProduct.data.price || "",
        live_link: singleProduct.data.live_link || "",
        support_for: singleProduct.data.support_for || "",
        description: singleProduct.data.description || "",
        images:
          singleProduct.data.images?.map(
            (image: { id: any; image: string }) => ({
              uid: image.id,
              url: image.image,
              thumbUrl: image.image,
              name: `Image-${image.id}`, // Optional: Set a name for each image
            })
          ) || [],
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

  const onFinish = (values: any): void => {
    const formData: any = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file?.originFileObj) {
            formData.append(key, file.originFileObj);
          }
        });
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    update({ id: record?.id, data: formData });
  };

  return (
    <div>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col lg={8}>
            <AntForm.Item label="Category Name" name="category">
              <Select placeholder="Select a category">
                {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Title" name="title">
              <Input placeholder="Product Title." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Subtitle" name="subtitle">
              <Input placeholder="Product Subtitle." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Slug" name="slug">
              <Input placeholder="Product Slug." />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Price" name="price">
              <Input placeholder="Product Price." type="number" />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Live Link" name="live_link">
              <Input placeholder="Product Live Link." type="text" />
            </AntForm.Item>
          </Col>
          <Col lg={8}>
            <AntForm.Item label="Support For" name="support_for">
              <Input placeholder="Product Support." type="number" />
            </AntForm.Item>
          </Col>
          <Col lg={16}>
            <AntForm.Item label="Description" name="description">
              <TextArea rows={4} placeholder="Product Description." />
            </AntForm.Item>
          </Col>

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
          </AntForm.Item>

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

export default UpdateProduct;
