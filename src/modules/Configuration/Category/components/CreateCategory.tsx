import React from "react";
import { Col, Input, Row } from "antd";
import { TCreateCategoryTypes } from "../types/CategoryTypes";
import { Form } from "../../../../common/CommonAnt";
import { useCreateCategoryMutation } from "../api/CategoryEndPoints";

const CreateCategory = () => {
  const [create, { isLoading, isSuccess }] = useCreateCategoryMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[10, 10]}>
          <Col span={24} lg={24}>
            <Form.Item<TCreateCategoryTypes>
              label="name"
              name="name"
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default CreateCategory;
