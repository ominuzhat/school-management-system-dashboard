import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  HarmonyOSOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  CustomTimePicker,
  DatePickerWithOptionalToday,
} from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Dayjs } from "dayjs";

const CreateFlight = () => {
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
                title={`Flight Info : ${field.name + 1}`}
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
                    <Form.Item<any> label="From" name={[field.name, "name"]}>
                      <Select
                        showSearch
                        placeholder="From"
                        filterOption={(input, option: any) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: (
                              <p>
                                <ManOutlined /> Male{" "}
                              </p>
                            ),
                          },
                          {
                            value: "2",
                            label: (
                              <p>
                                <WomanOutlined /> Female
                              </p>
                            ),
                          },
                          {
                            value: "3",
                            label: (
                              <p>
                                <HarmonyOSOutlined /> Others{" "}
                              </p>
                            ),
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item<any> label="To" name={[field.name, "name"]}>
                      <Select
                        showSearch
                        placeholder="To"
                        filterOption={(input, option: any) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "1",
                            label: (
                              <p>
                                <ManOutlined /> Male{" "}
                              </p>
                            ),
                          },
                          {
                            value: "2",
                            label: (
                              <p>
                                <WomanOutlined /> Female
                              </p>
                            ),
                          },
                          {
                            value: "3",
                            label: (
                              <p>
                                <HarmonyOSOutlined /> Others{" "}
                              </p>
                            ),
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item label="Airline" name={[field.name, "name"]}>
                      <Select
                        placeholder="Select Airline"
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
                    <Form.Item label="Flight No" name={[field.name, "name"]}>
                      <Input placeholder="Flight No" type="number" />
                    </Form.Item>
                  </Col>

                  <Col span={24} lg={6}>
                    <Form.Item label="Fly Date" name={[field.name, "name"]}>
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
                      label="Departure Time"
                      name={[field.name, "departureTime"]}
                    >
                      <CustomTimePicker
                        useDefaultTime={false}
                        onChangeTime={(
                          _time: Dayjs | null,
                          timeString: string
                        ) => {
                          console.log(
                            "Selected Time with Default: ",
                            timeString
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                    <Form.Item
                      label="Arrival Time"
                      name={[field.name, "departureTime"]}
                    >
                      <CustomTimePicker
                        useDefaultTime={false}
                        onChangeTime={(
                          _time: Dayjs | null,
                          timeString: string
                        ) => {
                          console.log(
                            "Selected Time with Default: ",
                            timeString
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

export default CreateFlight;
