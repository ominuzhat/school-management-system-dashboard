import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";

const KeyPoint = () => {
  return (
    <div>
      <Form.List name="keyPoints">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="flex items-center justify-center">
                <Row gutter={[5, 6]} justify="center">
                  <Col lg={22}>
                    <Form.Item
                      label="KeyPoints"
                      {...restField}
                      name={name}
                      rules={[
                        {
                          required: true,
                          message: "Please enter a key point!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter key point" />
                    </Form.Item>
                  </Col>

                  <Col lg={2}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
                <Col>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    ></Button>
                  </Form.Item>
                </Col>
              </Space>
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default KeyPoint;
