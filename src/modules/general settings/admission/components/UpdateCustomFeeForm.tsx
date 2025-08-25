/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Switch,
  Divider,
  Tabs,
  Typography,
} from "antd";
import dayjs from "dayjs";

const { Text } = Typography;
const { TabPane } = Tabs;

const UpdateCustomFeeForm = () => {
  const form = Form.useFormInstance();
  const [activeKey, setActiveKey] = useState("active");

  // Get all custom fees from the form
  const customFees = Form.useWatch("customFees", form) || [];

  // Filter fees based on active status
  const activeFees = customFees.filter(
    (fee: { is_active: boolean }) => fee?.is_active !== false
  );
  const inactiveFees = customFees.filter(
    (fee: { is_active: boolean }) => fee?.is_active === false
  );

  return (
    <div>
      <Text strong className="block mb-4">
        Custom Fee Structure
      </Text>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab={`Active Fees (${activeFees.length})`} key="active">
          <Form.List name="customFees">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  // Get the current value of effective_from for this field
                  const effectiveFromValue = form.getFieldValue([
                    "customFees",
                    name,
                    "effective_from",
                  ]);

                  // Get the active status for this field
                  const isActive =
                    form.getFieldValue(["customFees", name, "is_active"]) !==
                    false;

                  // Only render active fees in this tab
                  if (!isActive) return null;

                  return (
                    <div key={key} className="mb-6">
                      <Row gutter={[16, 16]} align="middle">
                        {/* Fee Name */}
                        <Col xs={24} sm={24} md={10} lg={8} xl={6}>
                          <Form.Item
                            {...restField}
                            label="Fee Name"
                            name={[name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter fee name",
                              },
                              {
                                max: 50,
                                message: "Maximum 50 characters allowed",
                              },
                            ]}
                          >
                            <Input placeholder="e.g., Admission Fee, Tuition Fee" />
                          </Form.Item>
                        </Col>

                        {/* Amount */}
                        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            label="Amount (৳)"
                            name={[name, "amount"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter amount",
                              },
                              {
                                type: "number",
                                min: 1,
                                message: "Amount must be at least ৳1",
                                transform: (value) => Number(value),
                              },
                            ]}
                          >
                            <Input type="number" placeholder="0.00" />
                          </Form.Item>
                        </Col>

                        {/* Effective From */}
                        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            label="Effective From"
                            name={[name, "effective_from"]}
                            rules={[
                              { required: true, message: "Please select date" },
                            ]}
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              picker="month"
                              disabled={!!effectiveFromValue}
                              // disabledDate={(current) =>
                              //   current && current < dayjs().startOf("month")
                              // }
                            />
                          </Form.Item>
                        </Col>

                        {/* One-Time Fee */}
                        <Col xs={12} sm={12} md={4} lg={2} xl={2}>
                          <Form.Item
                            {...restField}
                            label="One-Time"
                            name={[name, "one_time"]}
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>
                        </Col>

                        {/* Active Status */}
                        <Col xs={12} sm={12} md={4} lg={2} xl={2}>
                          <Form.Item
                            {...restField}
                            label="Active"
                            name={[name, "is_active"]}
                            valuePropName="checked"
                          >
                            <Switch
                              defaultChecked={true}
                              onChange={(checked) => {
                                if (!checked) {
                                  // When deactivating, switch to inactive tab
                                  setTimeout(
                                    () => setActiveKey("inactive"),
                                    300
                                  );
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>

                        {/* Remove Button */}
                        <Col xs={12} sm={12} md={4} lg={2} xl={2}>
                          <Button
                            type="text"
                            danger
                            onClick={() => remove(name)}
                            icon={<MinusCircleOutlined />}
                            className="float-right"
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                      <Divider className="my-2" />
                    </div>
                  );
                })}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        name: "",
                        amount: 0,
                        one_time: false,
                        is_active: true,
                        effective_from: dayjs().format("YYYY-MM-DD"),
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Fee Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </TabPane>

        <TabPane tab={`Inactive Fees (${inactiveFees.length})`} key="inactive">
          <Form.List name="customFees">
            {(fields, { remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  // Get the active status for this field
                  const isActive =
                    form.getFieldValue(["customFees", name, "is_active"]) !==
                    false;

                  // Only render inactive fees in this tab
                  if (isActive) return null;

                  return (
                    <div key={key} className="mb-6">
                      <Row gutter={[16, 16]} align="middle">
                        {/* Fee Name */}
                        <Col xs={24} sm={24} md={10} lg={8} xl={6}>
                          <Form.Item
                            {...restField}
                            label="Fee Name"
                            name={[name, "name"]}
                          >
                            <Input
                              placeholder="e.g., Admission Fee, Tuition Fee"
                              disabled
                            />
                          </Form.Item>
                        </Col>

                        {/* Amount */}
                        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            label="Amount (৳)"
                            name={[name, "amount"]}
                          >
                            <Input type="number" placeholder="0.00" disabled />
                          </Form.Item>
                        </Col>

                        {/* Effective From */}
                        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            label="Effective From"
                            name={[name, "effective_from"]}
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              picker="month"
                              disabled
                            />
                          </Form.Item>
                        </Col>

                        {/* One-Time Fee */}
                        <Col xs={12} sm={12} md={4} lg={2} xl={2}>
                          <Form.Item
                            {...restField}
                            label="One-Time"
                            name={[name, "one_time"]}
                            valuePropName="checked"
                          >
                            <Switch disabled />
                          </Form.Item>
                        </Col>

                        {/* Active Status */}
                        <Col xs={12} sm={12} md={4} lg={2} xl={2}>
                          <Form.Item
                            {...restField}
                            label="Active"
                            name={[name, "is_active"]}
                            valuePropName="checked"
                          >
                            <Switch
                              onChange={(checked) => {
                                if (checked) {
                                  // When activating, switch to active tab
                                  setTimeout(() => setActiveKey("active"), 300);
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>

                        {/* Remove Button */}
                        <Col xs={12} sm={12} md={4} lg={2} xl={2}>
                          <Button
                            type="text"
                            danger
                            disabled
                            onClick={() => remove(name)}
                            icon={<MinusCircleOutlined />}
                            className="float-right"
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                      <Divider className="my-2" />
                    </div>
                  );
                })}

                {inactiveFees.length === 0 && (
                  <div className="text-center p-8 text-gray-400">
                    No inactive fees
                  </div>
                )}
              </>
            )}
          </Form.List>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateCustomFeeForm;
