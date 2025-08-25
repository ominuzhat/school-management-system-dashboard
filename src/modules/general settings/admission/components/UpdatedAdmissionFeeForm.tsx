import { useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Switch,
  Divider,
  Typography,
  Button,
  DatePicker,
  Tabs,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;
const { TabPane } = Tabs;

const UpdatedAdmissionFeeForm = () => {
  const [activeKey, setActiveKey] = useState("active");
  const fees = Form.useWatch("fees");

  // Filter fees based on active status
  const activeFees =
    fees?.filter((fee: { is_active: any }) => fee?.is_active) || [];
  const inactiveFees =
    fees?.filter((fee: { is_active: any }) => !fee?.is_active) || [];

  return (
    <div>
      <Text strong className="block mb-4">
        Fee Structure
      </Text>

      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab={`Active Fees (${activeFees.length})`} key="active">
          <Form.List name="fees">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => {
                  const isActive = fees?.[index]?.is_active ?? true;

                  // Only render active fees in this tab
                  if (!isActive) return null;

                  return (
                    <div key={key} className="mb-4">
                      <Row gutter={[16, 16]} align="middle">
                        {/* Fee Name */}
                        <Col xs={24} sm={24} md={10} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            label="Fee Name"
                          >
                            <Input
                              placeholder="Fee name"
                              disabled={!isActive}
                            />
                          </Form.Item>
                        </Col>

                        {/* Amount */}
                        <Col xs={24} sm={24} md={8} lg={4} xl={4}>
                          <Form.Item
                            {...restField}
                            name={[name, "amount"]}
                            label="Amount (৳)"
                          >
                            <Input
                              type="number"
                              placeholder="0.00"
                              disabled={!isActive}
                            />
                          </Form.Item>
                        </Col>

                        {/* One-Time */}
                        <Col xs={24} sm={24} md={4} lg={3} xl={3}>
                          <Form.Item
                            {...restField}
                            name={[name, "one_time"]}
                            label="One-Time"
                            valuePropName="checked"
                          >
                            <Switch disabled={!isActive} />
                          </Form.Item>
                        </Col>

                        {/* Effective From */}
                        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, "effective_from"]}
                            label="Effective From"
                            getValueProps={(value) => ({
                              value: value ? dayjs(value) : null,
                            })}
                          >
                            <DatePicker
                              picker="month"
                              disabled={!isActive}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>

                        {/* Status Toggle */}
                        <Col xs={12} sm={12} md={4} lg={3} xl={3}>
                          <Form.Item
                            {...restField}
                            name={[name, "is_active"]}
                            label="Active"
                            valuePropName="checked"
                          >
                            <Switch
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
                        <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                            className="text-red-500 mt-6"
                          />
                        </Col>
                      </Row>

                      {index < fields.length - 1 && (
                        <Divider className="my-2" />
                      )}
                    </div>
                  );
                })}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add(
                        {
                          name: "",
                          amount: 0,
                          one_time: false,
                          is_active: true,
                          effective_from: dayjs().format("YYYY-MM-DD"),
                        },
                        activeFees.length
                      )
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Fee
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </TabPane>

        <TabPane tab={`Inactive Fees (${inactiveFees.length})`} key="inactive">
          <Form.List name="fees">
            {(fields) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => {
                  const isActive = fees?.[index]?.is_active ?? true;

                  // Only render inactive fees in this tab
                  if (isActive) return null;

                  return (
                    <div key={key} className="mb-4">
                      <Row gutter={[16, 16]} align="middle">
                        {/* Fee Name */}
                        <Col xs={24} sm={24} md={10} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            label="Fee Name"
                          >
                            <Input
                              placeholder="Fee name"
                              disabled={!isActive}
                            />
                          </Form.Item>
                        </Col>

                        {/* Amount */}
                        <Col xs={24} sm={24} md={8} lg={4} xl={4}>
                          <Form.Item
                            {...restField}
                            name={[name, "amount"]}
                            label="Amount (৳)"
                          >
                            <Input
                              type="number"
                              placeholder="0.00"
                              disabled={!isActive}
                            />
                          </Form.Item>
                        </Col>

                        {/* One-Time */}
                        <Col xs={24} sm={24} md={4} lg={3} xl={3}>
                          <Form.Item
                            {...restField}
                            name={[name, "one_time"]}
                            label="One-Time"
                            valuePropName="checked"
                          >
                            <Switch disabled={!isActive} />
                          </Form.Item>
                        </Col>

                        {/* Effective From */}
                        <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, "effective_from"]}
                            label="Effective From"
                            getValueProps={(value) => ({
                              value: value ? dayjs(value) : null,
                            })}
                          >
                            <DatePicker
                              picker="month"
                              disabled={!isActive}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>

                        {/* Status Toggle */}
                        <Col xs={12} sm={12} md={4} lg={3} xl={3}>
                          <Form.Item
                            {...restField}
                            name={[name, "is_active"]}
                            label="Active"
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
                      </Row>

                      {index < fields.length - 1 && (
                        <Divider className="my-2" />
                      )}
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

export default UpdatedAdmissionFeeForm;
