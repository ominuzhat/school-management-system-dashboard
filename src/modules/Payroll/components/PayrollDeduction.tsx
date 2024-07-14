import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space } from "antd";

const PayrollDeduction = () => {
  return (
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
                className="flex items-center justify-center  "
              >
                <Row gutter={[5, 6]} justify="center">
                  <Col lg={10}>
                    <Form.Item
                      label="Deductions Amount"
                      {...restField}
                      name={[name, "first"]}
                    >
                      <Input placeholder="Deductions Amount" />
                    </Form.Item>
                  </Col>
                  <Col lg={10}>
                    <Form.Item
                      label="Deductions Reasons"
                      {...restField}
                      name={[name, "last"]}
                    >
                      <Input placeholder="Deductions Reasons" />
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
            {/* <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Expense
              </Button>
            </Form.Item> */}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default PayrollDeduction;
