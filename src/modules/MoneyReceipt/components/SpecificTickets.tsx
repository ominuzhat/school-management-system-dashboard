import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";

const SpecificTicket: React.FC = () => (
  <div>
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={[10, 16]} justify={"center"} key={key}>
              <Col lg={3}>
                <Form.Item
                  label="Ticket No."
                  {...restField}
                  name={[name, "first"]}
                >
                  <Select
                    showSearch
                    placeholder="Ticket No."
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      { value: "overall", label: "Over All" },
                      {
                        value: "advance-payment",
                        label: "Advance Payment",
                      },
                      {
                        value: "specific-invoice",
                        label: "Specific Invoice",
                      },
                      {
                        value: "specific-ticket",
                        label: "Specific Tickets",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={3}>
                <Form.Item
                  label="Net Total"
                  {...restField}
                  name={[name, "last"]}
                >
                  <Input placeholder="Net Total" />
                </Form.Item>
              </Col>
              <Col lg={3}>
                <Form.Item label="Paid" {...restField} name={[name, "last"]}>
                  <Input placeholder="Paid" />
                </Form.Item>
              </Col>
              <Col lg={3}>
                <Form.Item label="Due" {...restField} name={[name, "last"]}>
                  <Input placeholder="Due" />
                </Form.Item>
              </Col>
              <Col lg={3}>
                <Form.Item
                  label="Amount"
                  {...restField}
                  name={[name, "last"]}
                  rules={[{ required: true, message: "Input your Amount!" }]}
                >
                  <Input placeholder="Amount" />
                </Form.Item>
              </Col>

              <Col>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Col>

              <Col className="flex items-center pt-5">
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  ></Button>
                </Form.Item>
              </Col>
            </Row>
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

export default SpecificTicket;
