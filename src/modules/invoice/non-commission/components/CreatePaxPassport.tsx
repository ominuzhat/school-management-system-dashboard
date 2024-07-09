import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CommonCustomAddDropdown from "../../../../common/commonCustomAddDropdown/CommonCustomAddDropdown";
import { useState } from "react";
import { DatePickerWithOptionalToday } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";

const CreatePaxPassport = () => {
  const [items, setItems] = useState(["jack", "lucy"]);

  const handleAddItem = (item: string) => {
    setItems([...items, item]);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="w-full">
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: "flex",
              rowGap: 16,
              flexDirection: "column",
            }}
            className="w-full"
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`Pax & Passport Details : ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Row className="w-full" gutter={[8, 16]}>
                  <Col span={24} lg={6}>
                    <Form.Item<any>
                      label="Passport No."
                      name={[field.name, "name"]}
                    >
                      <CommonCustomAddDropdown
                        options={items}
                        onAddItem={handleAddItem}
                        placeholder="Select Passport"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item<any> label="Name" name={[field.name, "name"]}>
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item label="Pax Type" name={[field.name, "name"]}>
                      <Select
                        placeholder="Select Pax Type"
                        // defaultValue="lucy"
                        onChange={handleChange}
                        options={[
                          { value: "adult", label: "Adult" },
                          { value: "child", label: "Child" },
                          { value: "infant", label: "Infant" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item label="Contact No" name={[field.name, "name"]}>
                      <Input
                        addonBefore="+088"
                        placeholder="Contact No."
                        type="number
                      "
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item label="Email" name={[field.name, "name"]}>
                      <Input placeholder="Email" type="email" />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item
                      label="Date of birth"
                      name={[field.name, "name"]}
                    >
                      <DatePickerWithOptionalToday
                        showToday={false}
                        onChange={(date, dateString) => {
                          console.log(
                            "Parent component received date change:",
                            date,
                            dateString
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item
                      label="Date of issue"
                      name={[field.name, "name"]}
                    >
                      <DatePickerWithOptionalToday
                        showToday={false}
                        onChange={(date, dateString) => {
                          console.log(
                            "Parent component received date change:",
                            date,
                            dateString
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item
                      label="Date of expire"
                      name={[field.name, "name"]}
                    >
                      <DatePickerWithOptionalToday
                        showToday={false}
                        onChange={(date, dateString) => {
                          console.log(
                            "Parent component received date change:",
                            date,
                            dateString
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Form.Item label="List">
                  <Form.List name={[field.name, "list"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "first"]}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, "second"]}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item> */}
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default CreatePaxPassport;
