import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Switch } from "antd";

const MultipleFeesItemForm = () => {
  return (
    <div>
      <Form.List name="fees">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[16, 16]} align="middle">
                {/* Fee Name Field */}
                <Col span={9}>
                  <Form.Item
                    {...restField}
                    label="Name"
                    name={[name, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the fee name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter fee name" />
                  </Form.Item>
                </Col>

                {/* Amount Field */}
                <Col span={9}>
                  <Form.Item
                    {...restField}
                    label="Amount"
                    name={[name, "amount"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the amount!",
                      },
                      {
                        type: "number",
                        min: 1,
                        message: "Amount must be greater than zero!",
                        transform: (value) => Number(value),
                      },
                    ]}
                  >
                    <Input placeholder="Enter amount" type="number" />
                  </Form.Item>
                </Col>

                {/* One-Time Fee Field */}
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    label="One Time"
                    name={[name, "one_time"]}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                {/* Remove Button */}
                <Col span={2} className="flex justify-end ">
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}

            {/* Add New Fee Button */}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Fee
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default MultipleFeesItemForm;
