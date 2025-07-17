import { Col, Row, Select, Input, Button, Form, message } from "antd";
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
import { motion } from "framer-motion";

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
  const [enrollmentType, setEnrollmentType] = useState<"finger" | "rfid">("finger");

  // Start Enrollment Mutations
  const [createFingerAdmission, { isLoading: isStartingAdmission, isSuccess: isAdmissionSuccess }] =
    useCreateFingerAdmissionMutation();
  const [createFingerTeacher, { isLoading: isStartingTeacher, isSuccess: isTeacherSuccess }] =
    useCreateFingerTeacherMutation();
  const [createFingerEmployee, { isLoading: isStartingEmployee, isSuccess: isEmployeeSuccess }] =
    useCreateFingerEmployeeMutation();

  // Stop Enrollment Mutations
  const [createStopFingerAdmission, { isLoading: isStoppingAdmission }] = 
    useCreateStopFingerAdmissionMutation();
  const [createStopFingerTeacher, { isLoading: isStoppingTeacher }] = 
    useCreateStopFingerTeacherMutation();
  const [createStopFingerEmployee, { isLoading: isStoppingEmployee }] = 
    useCreateStopFingerEmployeeMutation();

  // Determine loading states
  const isStarting = pathType.includes("/employees")
    ? isStartingEmployee
    : pathType.includes("/teacher")
    ? isStartingTeacher
    : isStartingAdmission;

  const isStopping = pathType.includes("/employees")
    ? isStoppingEmployee
    : pathType.includes("/teacher")
    ? isStoppingTeacher
    : isStoppingAdmission;

  const isSuccess = pathType.includes("/employees")
    ? isEmployeeSuccess
    : pathType.includes("/teacher")
    ? isTeacherSuccess
    : isAdmissionSuccess;

  const onFinish = (values: any): void => {
    const payload =
      enrollmentType === "finger"
        ? { hand: values.hand, finger: values.finger }
        : { enrollment_type: "rfid", rfid: values.rfid };

    if (pathType.includes("/employees")) {
      createFingerEmployee({ id: record, data: payload })
        .unwrap()
        .then(() => message.success("Employee enrollment started successfully"))
        .catch(() => message.error("Failed to start employee enrollment"));
    } else if (pathType.includes("/teacher")) {
      createFingerTeacher({ id: record, data: payload })
        .unwrap()
        .then(() => message.success("Teacher enrollment started successfully"))
        .catch(() => message.error("Failed to start teacher enrollment"));
    } else {
      createFingerAdmission({ id: record, data: payload })
        .unwrap()
        .then(() => message.success("Admission enrollment started successfully"))
        .catch(() => message.error("Failed to start admission enrollment"));
    }
  };

  const handleStopEnrollment = () => {
    if (pathType.includes("/employees")) {
      createStopFingerEmployee({})
        .unwrap()
        .then(() => message.success("Employee enrollment stopped successfully"))
        .catch(() => message.error("Failed to stop employee enrollment"));
    } else if (pathType.includes("/teacher")) {
      createStopFingerTeacher({})
        .unwrap()
        .then(() => message.success("Teacher enrollment stopped successfully"))
        .catch(() => message.error("Failed to stop teacher enrollment"));
    } else {
      createStopFingerAdmission({})
        .unwrap()
        .then(() => message.success("Admission enrollment stopped successfully"))
        .catch(() => message.error("Failed to stop admission enrollment"));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.div>
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isStarting}
                  className="w-full border"
                  style={{
                    backgroundColor:
                      enrollmentType === "finger" ? "#4CAF50" : "#2196F3",
                  }}
                >
                  Start Enrollment
                </Button>
              </motion.div>
            </Form.Item>
          </Col>

          {enrollmentType === "finger" && (
            <Col className="w-2/5">
              <Form.Item>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="primary"
                    onClick={handleStopEnrollment}
                    loading={isStopping}
                    className="w-full border bg-red-500 hover:bg-red-600"
                  >
                    Stop Enrollment
                  </Button>
                </motion.div>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </motion.div>
  );
};

export default FingerAdmission;