/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
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
import { Link } from "react-router-dom";

const { Title } = Typography;

const SmsPage = () => {
  const { data: smsList, isLoading } = useGetSmsQuery<any>({});
  const [updateSms, { isLoading: isUpdating }] = useUpdateSmsMutation();
  const smsData = smsList?.data?.[0] || {};
  const [form] = Form.useForm();

  // Watch template fields for changes
  Form.useWatch('absent_template', form);
  Form.useWatch('present_template', form);
  Form.useWatch('fee_paid_template', form);
  Form.useWatch('admission_approved_template', form);

  // Generate example SMS based on current template
  const generateExample = (template:any) => {
    if (!template) return '';
    
    return template
      .replace(/{student_name}/g, 'John Doe')
      .replace(/{date}/g, '25/12/2023')
      .replace(/{institution_name}/g, 'ABC School')
      .replace(/{check_in}/g, '08:30 AM')
      .replace(/{check_out}/g, '03:15 PM')
      .replace(/{paid_amount}/g, '5000')
      .replace(/{username}/g, 'john.doe')
      .replace(/{password}/g, 'Abc123');
  };

  useEffect(() => {
    if (smsData?.id) {
      form.setFieldsValue({
        ...{
          absent_template:
            "Dear Parent, {student_name} was absent on {date}. Thanks, {institution_name}",
          present_template:
            "Dear Parent, {student_name} was present on {date} at {institution_name}. Time: {check_in} to {check_out}.",
          fee_paid_template:
            "Dear Parent, Payment of {paid_amount}BDT received for {student_name}. Thanks, {institution_name}",
          admission_approved_template:
            "Admission Approved: Dear {student_name}, Your admission has been approved. Login details: Username: {username} Temporary Password: {password}. Thanks, {institution_name}",
        },
        ...smsData,
      });
    }
  }, [smsData]);

  const handleFormSubmit = async (values: any) => {
    try {
      await updateSms({ id: smsData?.id, data: { ...values } });
      message.success("Configuration updated successfully!");
    } catch (error) {
      console.error("Failed to update SMS status", error);
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

      <Title level={4} className="mb-4 ml-4 flex items-center justify-between">
        <p>
          SMS Settings{" "}
          <span className="relative bottom-2">
            <Tag color={smsData?.is_active ? "green" : "red"}>
              {smsData?.is_active ? "Active" : "Inactive"}
            </Tag>
          </span>
        </p>
        <Link
          to={`http://notify.codecanvascreation.com/`}
          target="_blank"
          className="text-sm border px-4 py-2 rounded border-blue-500"
        >
          Login SMS Panel
        </Link>
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

            {/* SMS Template Fields */}
            <Title level={4} className="mb-4 mt-6">
              SMS Template Messages
            </Title>
            <Row gutter={[16, 16]}>
              {[
                {
                  name: "absent_template",
                  label: "Absent template",
                  defaultValue:
                    "Dear Parent, {student_name} was absent on {date}. Thanks, {institution_name}",
                  note: "Available variables: {student_name}, {date}, {institution_name}",
                },
                {
                  name: "present_template",
                  label: "Present template",
                  defaultValue:
                    "Dear Parent, {student_name} was present on {date} at {institution_name}. Time: {check_in} to {check_out}.",
                  note: "Available variables: {student_name}, {date}, {institution_name}, {check_in}, {check_out}",
                },
                {
                  name: "fee_paid_template",
                  label: "Fee paid template",
                  defaultValue:
                    "Dear Parent, Payment of {paid_amount}BDT received for {student_name}. Thanks, {institution_name}",
                  note: "Available variables: {student_name}, {paid_amount}, {institution_name}",
                },
                {
                  name: "admission_approved_template",
                  label: "Admission approved template",
                  defaultValue:
                    "Admission Approved: Dear {student_name}, Your admission has been approved. Login details: Username: {username} Temporary Password: {password}. Thanks, {institution_name}",
                  note: "Available variables: {student_name}, {username}, {password}, {institution_name}",
                },
              ].map((item) => (
                <Col span={24} key={item.name}>
                  <Form.Item
                    label={
                      <span>
                        {item.label}{" "}
                        <Tooltip title={item.note}>
                          <InfoCircleOutlined className="text-gray-500" />
                        </Tooltip>
                      </span>
                    }
                    name={item.name}
                    rules={[
                      { required: true, message: `${item.label} is required` },
                    ]}
                    extra={
                      <div className="text-xs text-gray-500 mt-1">
                        Example SMS: '{generateExample(form.getFieldValue(item.name))}'
                      </div>
                    }
                  >
                    <Input.TextArea 
                      rows={3} 
                      maxLength={157} 
                      onChange={() => {
                        // Force update to refresh the example text
                        form.setFieldsValue({ [item.name]: form.getFieldValue(item.name) });
                      }}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              className="mt-4"
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