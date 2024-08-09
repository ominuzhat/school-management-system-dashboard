import { Col, Input, Modal, Row, Select } from "antd";
import { Form } from "../../../common/CommonAnt";
import { useCreateProductMutation } from "../api/productEndPoints";
import { TCreateProductTypes } from "../types/ProductTypes";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useGetCategoryQuery } from "../../Configuration/Category/api/CategoryEndPoints";

const CreateProduct = () => {
  const [create, { isLoading, isSuccess }] = useCreateProductMutation();
  const { data: categoryData } = useGetCategoryQuery({});

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
        value.forEach((file) => {
          if (file?.originFileObj) {
            formData.append(key, file.originFileObj);
          }
        });
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    create(formData);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={16}>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Category Name"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select a category">
                {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category?.id}>
                    {category?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Title"
              name="title"
              rules={[{ required: true, message: "Product Title!" }]}
            >
              <Input placeholder="Product Title." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Product Subtitle!" }]}
            >
              <Input placeholder="Product Subtitle." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Product Slug!" }]}
            >
              <Input placeholder="Product Slug." />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Price"
              name="price"
              rules={[{ required: true, message: "Product Price!" }]}
            >
              <Input placeholder="Product Price." type="number" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Live Link"
              name="live_link"
              rules={[{ required: true, message: "Product Live Link!" }]}
            >
              <Input placeholder="Product Live Link." type="text" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<TCreateProductTypes>
              label="Support For"
              name="support_for"
              rules={[{ required: true, message: "Product Support !" }]}
            >
              <Input placeholder="Product Support." type="number" />
            </Form.Item>
          </Col>
          <Col lg={16}>
            <Form.Item<TCreateProductTypes>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Product Description !" }]}
            >
              <TextArea rows={4} placeholder="Product Description." />
            </Form.Item>
          </Col>
          {/* <Col lg={24}>
            <Form.Item<TCreateProductTypes>
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

export default CreateProduct;
