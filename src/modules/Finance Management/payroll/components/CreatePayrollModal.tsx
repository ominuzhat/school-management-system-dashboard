import {
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import {
  CommonPaymentMethod,
  DatePickerWithOptionalToday,
} from "../../../../common/CommonAnt/CommonSearch/CommonSearch";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import PayrollDeduction from "./PayrollDeduction";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";
import { useGetEmployeeQuery } from "../../../members/employees/api/employeeEndPoints";
import { useEffect } from "react";

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const CreatePayrollModal = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();
  const { data: teacherData } = useGetTeacherQuery({});
  const { data: employeeData } = useGetEmployeeQuery({});
  const [form] = Form.useForm();

  const category = Form.useWatch("category", form);
  const baseSalary = Form.useWatch("base_salary", form);
  const selectedEmployee = Form.useWatch("employee", form);
  const selectedTeacher = Form.useWatch("teacher", form);

  useEffect(() => {
    // Reset the base salary when switching categories
    if (category === "employee" && selectedEmployee) {
      const employee = employeeData?.data?.results?.find(
        (emp: any) => emp.id === selectedEmployee
      );
      console.log(employee);

      if (employee) {
        form.setFieldsValue({
          base_salary: employee.base_salary,
        });
      }
    } else if (category === "teacher" && selectedTeacher) {
      const teacher = teacherData?.data?.results?.find(
        (data: any) => data.id === selectedTeacher
      );

      if (teacher) {
        form.setFieldsValue({
          base_salary: teacher.base_salary,
        });
      }
    }
  }, [
    category, // Ensure category changes trigger the effect
    selectedEmployee,
    selectedTeacher,
    employeeData?.data?.results,
    teacherData?.data?.results,
    form,
  ]);

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "restaurant_logo" &&
        Array.isArray(value) &&
        value[0]?.originFileObj
      ) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    create(formData);
  };
  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        // isLoading={isLoading}
        // isSuccess={isSuccess}
        initialValues={{ users: [{}], category: "teacher" }}
        layout="vertical"
      >
        <Card>
          <Form.Item name="category">
            <Radio.Group
              options={[
                { value: "teacher", label: "Teacher" },
                { value: "employee", label: "Employee" },
              ]}
            />
          </Form.Item>
          <Divider />
          <Row gutter={[16, 16]}>
            {category === "teacher" ? (
              <Col lg={6}>
                <Form.Item
                  label="Select Teacher"
                  name="teacher"
                  rules={[
                    {
                      required: true,
                      message: "Teacher selection is required!",
                    },
                  ]}
                >
                  <Select placeholder="Select Teacher" className="w-full">
                    {/* Assuming teacherData is an array of teacher objects */}
                    {teacherData?.data?.results?.map((teacher: any) => (
                      <Select.Option key={teacher.id} value={teacher.id}>
                        {teacher?.first_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              <Col lg={6}>
                <Form.Item
                  label="Select Employee"
                  name="employee"
                  rules={[
                    {
                      required: true,
                      message: "Employee selection is required!",
                    },
                  ]}
                >
                  <Select placeholder="Select Employee" className="w-full">
                    {employeeData?.data?.results?.map((employee: any) => (
                      <Select.Option key={employee.id} value={employee.id}>
                        {employee.first_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            <Col lg={6}>
              <Form.Item<any> label="Base Salary" name="base_salary">
                <Input placeholder="Base Salary" type="number" disabled />
              </Form.Item>
            </Col>

            <Col lg={6}>
              <Form.Item<any> label="Daily Salary" name="dueDate">
                <Input placeholder="Daily Salary" type="number" disabled />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Attendance (Days)" name="dueDate">
                <Input placeholder="Attendance (Days)" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Gross Salary" name="dueDate">
                <Input placeholder="Gross Salary" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any>
                label="Method"
                name="dueDate"
                rules={[{ required: true, message: "Input your Method!" }]}
              >
                <CommonPaymentMethod />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any>
                label="Accounts"
                name="dueDate"
                rules={[{ required: true, message: "Input your Accounts!" }]}
              >
                <Select
                  showSearch
                  placeholder="Accounts"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "1", label: "Jack" },
                    { value: "2", label: "Lucy" },
                    { value: "3", label: "Tom" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Available Balance" name="dueDate">
                <Input placeholder="Available Balance" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Divider plain>Deductions</Divider>
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <PayrollDeduction />
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Advance Salary" name="dueDate">
                <Input placeholder="Advance Salary" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Provident Fund" name="dueDate">
                <Input placeholder="Provident Fund" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Divider plain>Additional</Divider>
          <Row gutter={[16, 16]}>
            <Col lg={6}>
              <Form.Item<any> label="Mobile Bill" name="dueDate">
                <Input placeholder="Mobile Bill" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Feed Allowance" name="dueDate">
                <Input placeholder="Feed Allowance" type="number" />
              </Form.Item>
            </Col>{" "}
            <Col lg={6}>
              <Form.Item<any> label="Performance Bonus" name="dueDate">
                <Input placeholder="Performance Bonus" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Festival Bonus" name="dueDate">
                <Input placeholder="Festival Bonus" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Travel Allowance" name="dueDate">
                <Input placeholder="Travel Allowance" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Health Allowance" name="dueDate">
                <Input placeholder="Health Allowance" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Incentive" name="dueDate">
                <Input placeholder="Incentive" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="House Rent" name="dueDate">
                <Input placeholder="House Rent" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Profit Share" name="dueDate">
                <Input placeholder="Profit Share" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Profit Share" name="dueDate">
                <DatePicker
                  className="w-full"
                  picker="month"
                  onChange={(date, dateString) => {
                    console.log(date, dateString);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Sales Commission" name="dueDate">
                <Input placeholder="Sales Commission" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Other" name="dueDate">
                <Input placeholder="Others" />
              </Form.Item>
            </Col>
          </Row>
          <Divider plain>Net Total and Note</Divider>
          <Row gutter={[16, 16]}>
            <Col lg={6}>
              <Form.Item<any>
                label="Salary Date"
                name="dueDate"
                rules={[{ required: true, message: "Input your Salary !" }]}
              >
                <DatePickerWithOptionalToday
                  showToday={true}
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
            <Col lg={6}>
              <Form.Item<any> label="Total Salary" name="dueDate">
                <Input placeholder="Total Salary" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Upload Docs" name="dueDate">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Form.Item<any> label="Notes" name="dueDate">
                <TextArea placeholder="Notes" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CreatePayrollModal;
