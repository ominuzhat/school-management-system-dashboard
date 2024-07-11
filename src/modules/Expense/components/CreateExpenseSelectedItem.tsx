import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";

const CreateExpenseSelectedItem: React.FC = () => (
  <div>
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              //   style={{
              //     display: "flex",
              //     marginBottom: 8,
              //     border: "2px solid red",
              //   }}
              // align="baseline"
              className="flex items-center justify-center"
            >
              <Row gutter={16} justify="center">
                <Col>
                  <Form.Item
                    label="Head"
                    {...restField}
                    name={[name, "first"]}
                    rules={[{ required: true, message: "Missing Head" }]}
                  >
                    <Input placeholder="Head" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Amount"
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing amount" }]}
                  >
                    <Input placeholder="amount" />
                  </Form.Item>
                </Col>
                <Col>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Expense
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </div>
);

export default CreateExpenseSelectedItem;
