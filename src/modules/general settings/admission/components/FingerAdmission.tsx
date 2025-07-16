import { Col, Row, Select, Input, Button, Form } from "antd";
import {
  useCreateFingerAdmissionMutation,
  useCreateStopFingerAdmissionMutation,
} from "../api/admissionEndPoints";
import { useEffect, useState } from "react";
import { CreditCardOutlined } from "@ant-design/icons";
import { FaFingerprint } from "react-icons/fa6";
import {
  useCreateFingerTeacherMutation,
  useCreateStopFingerTeacherMutation,
} from "../../../members/teachers/api/teachersEndPoints";
import {
  useCreateFingerEmployeeMutation,
  useCreateStopFingerEmployeeMutation,
} from "../../../members/employees/api/employeeEndPoints";

const enrollmentTypes = [
  {
    value: "finger",
    label: "Finger Enrollment",
    icon: <FaFingerprint />,
    color: "#4CAF50",
  },
  {
    value: "rfid",
    label: "RFID Enrollment",
    icon: <CreditCardOutlined />,
    color: "#2196F3",
  },
];

const FingerAdmission = ({
  record,
  pathType,
}: {
  record: number;
  pathType: string;
}) => {
  const [form] = Form.useForm();

  const [createFingerAdmission, { isLoading: isLoadingAdmission, isSuccess }] =
    useCreateFingerAdmissionMutation();
  const [createFingerTeacher, { isLoading: isLoadingTeacher }] =
    useCreateFingerTeacherMutation();
  const [createFingerEmployee, { isLoading: isLoadingEmployee }] =
    useCreateFingerEmployeeMutation();

  const [createStopFingerAdmission] = useCreateStopFingerAdmissionMutation();
  const [createStopFingerTeacher] = useCreateStopFingerTeacherMutation();
  const [createStopFingerEmployee] = useCreateStopFingerEmployeeMutation();

  const [enrollmentType, setEnrollmentType] = useState<"finger" | "rfid">(
    "finger"
  );

  const onFinish = (values: any): void => {
    const payload =
      enrollmentType === "finger"
        ? { hand: values.hand, finger: values.finger }
        : { enrollment_type: "rfid", rfid: values.rfid };

    if (pathType.includes("/employees")) {
      createFingerEmployee({ id: record, data: payload });
    } else if (pathType.includes("/teacher")) {
      createFingerTeacher({ id: record, data: payload });
    } else {
      createFingerAdmission({ id: record, data: payload });
    }
  };

  const isLoading = pathType.includes("/employees")
    ? isLoadingEmployee
    : pathType.includes("/teacher")
    ? isLoadingTeacher
    : isLoadingAdmission;

  const handleStopEnrollment = () => {
    if (pathType.includes("/employees")) {
      createStopFingerEmployee({});
    } else if (pathType.includes("/teacher")) {
      createStopFingerTeacher({});
    } else {
      createStopFingerAdmission({});
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  return (
    <div>
      <Form onFinish={onFinish} layout="vertical" className="space-y-4">
        <Row gutter={[16, 16]} justify="space-between" className="mb-6">
          {enrollmentTypes.map((type) => {
            const isSelected = enrollmentType === type.value;
            return (
              <Col
                key={type.value}
                xs={24}
                sm={12}
                className="transition-all duration-300"
              >
                <div
                  onClick={() =>
                    setEnrollmentType(type.value as "finger" | "rfid")
                  }
                  className={`border-2 p-4 rounded-lg cursor-pointer hover:shadow-md flex flex-col h-full transition-all duration-300`}
                  style={{
                    borderColor: isSelected ? type.color : "#f0f0f0",
                    backgroundColor: isSelected ? `${type.color}10` : "white",
                  }}
                >
                  <div className="text-3xl mb-2" style={{ color: type.color }}>
                    {type.icon}
                  </div>
                  <p className="text-lg font-medium">{type.label}</p>
                </div>
              </Col>
            );
          })}
        </Row>

        {enrollmentType === "finger" && (
          <Row gutter={[16, 16]}>
            <Col lg={8}>
              <Form.Item
                label="Hand"
                name="hand"
                rules={[{ required: true, message: "Please select hand" }]}
              >
                <Select placeholder="Select Hand" className="w-full">
                  <Select.Option value="left">Left</Select.Option>
                  <Select.Option value="right">Right</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item
                label="Finger"
                name="finger"
                rules={[{ required: true, message: "Please select finger" }]}
              >
                <Select placeholder="Select Finger" className="w-full">
                  <Select.Option value="thumb">Thumb</Select.Option>
                  <Select.Option value="index">Index</Select.Option>
                  <Select.Option value="middle">Middle</Select.Option>
                  <Select.Option value="ring">Ring</Select.Option>
                  <Select.Option value="pinky">Pinky</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        {enrollmentType === "rfid" && (
          <Row gutter={[16, 16]}>
            <Col lg={8}>
              <Form.Item
                label="RFID Number"
                name="rfid"
                rules={[
                  { required: true, message: "Please enter RFID number" },
                  { pattern: /^\d+$/, message: "RFID must be numeric" },
                ]}
              >
                <Input
                  placeholder="Enter RFID number"
                  prefix={<CreditCardOutlined />}
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          <Col className="w-2/5">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full border"
                style={{
                  backgroundColor:
                    enrollmentType === "finger" ? "#4CAF50" : "#2196F3",
                }}
              >
                Start Enrollment
              </Button>
            </Form.Item>
          </Col>

          {enrollmentType === "finger" && (
            <Col className="w-2/5">
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => handleStopEnrollment()}
                  loading={isLoading}
                  className="w-full border bg-red-500"
                >
                  Stop Enrollment
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default FingerAdmission;
