/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Switch,
  Tag,
  Typography,
  Tooltip,
  message,
} from "antd";
import { useEffect } from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useGetSmsQuery, useUpdateSmsMutation } from "../api/smsEndPoints";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const { Title } = Typography;

const SmsPage = () => {
  const { data: smsList, isLoading } = useGetSmsQuery<any>({});
  const [updateSms, { isLoading: isUpdating }] = useUpdateSmsMutation();
  const smsData = smsList?.data?.[0] || {};
  const [form] = Form.useForm();

  useEffect(() => {
    if (smsData?.id) {
      form.setFieldsValue(smsData);
    }
  }, [smsData, form]);

  const handleFormSubmit = async (values: any) => {
    try {
      await updateSms({ id: smsData?.id, data: { ...values } });
      // Show success message
      message.success("Configuration updated successfully!");
    } catch (error) {
      console.error("Failed to update SMS status", error);
      // Show error message
      message.error("Failed to update configuration. Please try again.");
    }
  };

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.smsconfig,
    actionNames.change
  );

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Title level={4} className="mb-4 ml-4">
        SMS Settings{" "}
        <span className="relative bottom-2">
          <Tag color={smsData?.is_active ? "green" : "red"}>
            {smsData?.is_active ? "Active" : "Inactive"}
          </Tag>
        </span>
      </Title>

      {updatePermission ? (
        <Card>
          <Form
            form={form}
            layout="vertical"
            initialValues={smsData}
            onFinish={handleFormSubmit}
          >
            {/* Student Section */}
            <Title level={4} className="mb-4">
              <UserOutlined /> Student
            </Title>
            <Row gutter={[16, 16]}>
              {[
                {
                  label: "Notify if Student is Absent",
                  name: "student_attendance_absent",
                  tooltip:
                    "Enable to send notifications when a student is absent.",
                },
                {
                  label: "Notify if Tuition Fee is Paid",
                  name: "student_tuition_fee_paid",
                  tooltip:
                    "Enable to send notifications when a student pays their tuition fee.",
                },
                {
                  label: "Notify if Admission is Approved",
                  name: "student_admission_approved",
                  tooltip:
                    "Enable to send notifications when a student's admission is approved.",
                },
                {
                  label: "Notify if Tuition Fee is Default",
                  name: "student_tuition_fee_default",
                  tooltip:
                    "Enable to send notifications when a student defaults on tuition fee payment.",
                },
              ].map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.name}>
                  <Form.Item
                    label={
                      <span>
                        {item.label}{" "}
                        <Tooltip title={item.tooltip}>
                          <InfoCircleOutlined className="text-gray-500" />
                        </Tooltip>
                      </span>
                    }
                    name={item.name}
                    valuePropName="checked"
                  >
                    <Switch disabled={isLoading} />
                  </Form.Item>
                </Col>
              ))}

              {/* Student Input Numbers */}
              {[
                {
                  label: "Absent Time (min)",
                  name: "student_attendance_absent_time_in_min",
                  tooltip:
                    "Set the time (in minutes) after which an absent notification is sent.",
                },
                {
                  label: "Fee Default Time (days)",
                  name: "student_tuition_fee_default_time_in_day",
                  tooltip:
                    "Set the number of days after which a tuition fee default notification is sent.",
                },
              ].map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.name}>
                  <Form.Item
                    label={
                      <span>
                        {item.label}{" "}
                        <Tooltip title={item.tooltip}>
                          <InfoCircleOutlined className="text-gray-500" />
                        </Tooltip>
                      </span>
                    }
                    name={item.name}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      disabled={isLoading}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>

            {/* Employee Section */}
            <Title level={4} className="mb-4 mt-6">
              <TeamOutlined /> Employee
            </Title>
            <Row gutter={[16, 16]}>
              {[
                {
                  label: "Notify if Employee is Absent",
                  name: "employee_attendance_absent",
                  tooltip:
                    "Enable to send notifications when an employee is absent.",
                },
                {
                  label: "Notify if Salary is Paid",
                  name: "employee_salary_paid",
                  tooltip:
                    "Enable to send notifications when an employee's salary is paid.",
                },
              ].map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.name}>
                  <Form.Item
                    label={
                      <span>
                        {item.label}{" "}
                        <Tooltip title={item.tooltip}>
                          <InfoCircleOutlined className="text-gray-500" />
                        </Tooltip>
                      </span>
                    }
                    name={item.name}
                    valuePropName="checked"
                  >
                    <Switch disabled={isLoading} />
                  </Form.Item>
                </Col>
              ))}

              {/* Employee Input Numbers */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label={
                    <span>
                      Absent Time (min){" "}
                      <Tooltip title="Set the time (in minutes) after which an absent notification is sent.">
                        <InfoCircleOutlined className="text-gray-500" />
                      </Tooltip>
                    </span>
                  }
                  name="employee_attendance_absent_time"
                >
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    disabled={isLoading}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              className=""
            >
              Update Configuration
            </Button>
          </Form>
        </Card>
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default SmsPage;
