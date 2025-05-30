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
} from "antd";

const UpdateCustomFeeForm = () => {
  const form = Form.useFormInstance(); // Move the hook call to the top level

  return (
    <div>
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

              return (
                <div key={key} className="mb-6">
                  <Row gutter={[16, 16]} align="middle">
                    {/* Fee Name */}
                    <Col xs={24} sm={24} md={10} lg={8} xl={8}>
                      <Form.Item
                        {...restField}
                        label="Fee Name"
                        name={[name, "name"]}
                        rules={[
                          { required: true, message: "Please enter fee name" },
                          { max: 50, message: "Maximum 50 characters allowed" },
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
                          { required: true, message: "Please enter amount" },
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
                          //   disabledDate={(current) =>
                          //     current && current < dayjs().startOf("month")
                          //   }
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
                    // effective_from: dayjs(),
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
    </div>
  );
};

export default UpdateCustomFeeForm;
