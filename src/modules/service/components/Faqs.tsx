import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";

const FaqForm = () => {
  return (
    <div>
      <Form.List name="faqs">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="flex items-center justify-center">
                <Row gutter={[5, 6]} justify="center">
                  <Col lg={10}>
                    <Form.Item
                      {...restField}
                      label="Question"
                      name={[name, "question"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the question!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter question" />
                    </Form.Item>
                  </Col>

                  <Col lg={10}>
                    <Form.Item
                      {...restField}
                      label="Answer"
                      name={[name, "answer"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the answer!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter answer" />
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

export default FaqForm;
