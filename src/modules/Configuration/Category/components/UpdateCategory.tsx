import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button } from "antd";
import { useUpdateCategoryMutation } from "../api/CategoryEndPoints";
import {
  TCategoryDataTypes,
  TCreateCategoryTypes,
} from "../types/CategoryTypes";

interface Props {
  record: TCategoryDataTypes;
}

const UpdateCategory: React.FC<Props> = ({ record }) => {
  const [update, { isLoading }] = useUpdateCategoryMutation();
  const [form] = AntForm.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: record?.name });
  }, [record, form]);

  const onFinish = (values: TCategoryDataTypes): void => {
    update({ id: record.id, data: values });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <AntForm.Item<TCreateCategoryTypes>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" />
            </AntForm.Item>
          </Col>
        </Row>
        <Col>
          <AntForm.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </AntForm.Item>
        </Col>
      </AntForm>
    </React.Fragment>
  );
};

export default UpdateCategory;
