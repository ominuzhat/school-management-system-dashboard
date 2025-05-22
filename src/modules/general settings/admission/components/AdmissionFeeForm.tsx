import {
  Form,
  Input,
  Row,
  Col,
  Switch,
  Divider,
  Typography,
  Button,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const AdmissionFeeForm = () => {
  return (
    <div>
      <Text strong className="block mb-4">
        Fee Structure
      </Text>

      <Form.List name="fees">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="mb-4">
                <Row gutter={[16, 16]} align="middle">
                  {/* Fee Name */}
                  <Col xs={24} sm={24} md={10} lg={8} xl={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Fee Name"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Fee name" disabled />
                    </Form.Item>
                  </Col>

                  {/* Amount */}
                  <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "amount"]}
                      label="Amount (৳)"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input type="number" placeholder="0.00" disabled />
                    </Form.Item>
                  </Col>

                  {/* One-Time */}
                  <Col xs={24} sm={24} md={4} lg={2} xl={2}>
                    <Form.Item
                      {...restField}
                      name={[name, "one_time"]}
                      label="One-Time"
                      valuePropName="checked"
                    >
                      <Switch disabled />
                    </Form.Item>
                  </Col>

                  {/* Remove Button */}
                  <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="text-red-500 mt-6"
                    />
                  </Col>
                </Row>
                {index < fields.length - 1 && <Divider className="my-2" />}
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    name: "",
                    amount: 0,
                    one_time: false,
                    effective_from: dayjs().format("YYYY-MM-DD"),
                  })
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
    </div>
  );
};

export default AdmissionFeeForm;
