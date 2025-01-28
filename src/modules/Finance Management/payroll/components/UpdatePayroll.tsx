import { useState, useEffect } from "react";
import {
  Form as AntForm,
  Input,
  Row,
  Col,
  Card,
  Divider,
  Radio,
  Select,
  DatePicker,
} from "antd";
import {
  useGetSinglePayrollQuery,
  useUpdatePayrollMutation,
} from "../api/payrollEndPoints";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";
import { useGetEmployeeQuery } from "../../../members/employees/api/employeeEndPoints";
import PayrollDeduction from "./PayrollDeduction";
import { Form } from "../../../../common/CommonAnt";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const UpdatePayroll = ({ record }: { record: any }) => {
  const [form] = AntForm.useForm();
  const [update, { isLoading, isSuccess }] = useUpdatePayrollMutation();
  const { data: payrollData } = useGetSinglePayrollQuery(Number(record));
  const { data: teacherData } = useGetTeacherQuery({});
  const { data: employeeData } = useGetEmployeeQuery({});

  const [periodDate, setPeriodDate] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const selectedEmployee = AntForm.useWatch("employee", form);
  const selectedTeacher = AntForm.useWatch("teacher", form);
  const category = AntForm.useWatch("category", form);
  const baseSalary = AntForm.useWatch("base_salary", form);
  const mobileBill = AntForm.useWatch("mobile_bill", form);
  const feedAllowance = AntForm.useWatch("feed_allowance", form);
  const performanceBonus = AntForm.useWatch("performance_bonus", form);
  const festivalBonus = AntForm.useWatch("festival_bonus", form);
  const travelAllowance = AntForm.useWatch("travel_allowance", form);
  const healthAllowance = AntForm.useWatch("health_allowance", form);
  const incentive = AntForm.useWatch("incentive", form);
  const houseRent = AntForm.useWatch("house_rent", form);
  const profitShare = AntForm.useWatch("profit_share", form);
  const salesCommission = AntForm.useWatch("sales_commission", form);
  const otherAllowance = AntForm.useWatch("other_allowance", form);
  const advanceSalary = AntForm.useWatch("advance_salary", form);
  const providentFund = AntForm.useWatch("provident_fund", form);
  const deductions = AntForm.useWatch("deductions", form);

  useEffect(() => {
    const allowances = [
      mobileBill,
      feedAllowance,
      performanceBonus,
      festivalBonus,
      travelAllowance,
      healthAllowance,
      incentive,
      houseRent,
      profitShare,
      salesCommission,
      otherAllowance,
    ];

    const totalAllowances = allowances.reduce(
      (total, value) => total + (Number(value) || 0),
      0
    );

    const totalDeductions =
      deductions?.reduce(
        (total: any, deduction: any) =>
          total + (Number(deduction?.amount) || 0),
        0
      ) || 0;

    const grossSalary = Number(baseSalary) + totalAllowances;
    const netSalary =
      grossSalary -
      (Number(advanceSalary) || 0) -
      (Number(providentFund) || 0) -
      totalDeductions;

    form.setFieldsValue({
      gross_salary: grossSalary.toFixed(2),
      net_salary: netSalary.toFixed(2),
    });
  }, [
    baseSalary,
    mobileBill,
    feedAllowance,
    performanceBonus,
    festivalBonus,
    travelAllowance,
    healthAllowance,
    incentive,
    houseRent,
    profitShare,
    salesCommission,
    otherAllowance,
    advanceSalary,
    providentFund,
    deductions,
    form,
  ]);

  // Set initial values from backend data
  useEffect(() => {
    if (payrollData) {
      const {
        period_start,
        period_end,
        teacher,
        employee,
        deductions,
        ...otherFields
      } = payrollData?.data || {};

      setPeriodDate([period_start || null, period_end || null]);

      form.setFieldsValue({
        daily_salary: (Number(baseSalary) / 30).toFixed(2),
        category: payrollData?.data?.employee ? "employee" : "teacher",
        period: [
          period_start ? dayjs(period_start, "YYYY-MM-DD") : null,
          period_end ? dayjs(period_end, "YYYY-MM-DD") : null,
        ],
        teacher: teacher?.id,
        employee: employee?.id,
        base_salary: employee ? employee?.base_salary : teacher?.base_salary,
        deductions,
        ...otherFields,
      });

      if (category === "employee" && selectedEmployee) {
        const employee = employeeData?.data?.results?.find(
          (emp: any) => emp.id === selectedEmployee
        );

        if (employee) {
          form.setFieldsValue({
            base_salary: employee.base_salary,
            attendance: employee.attendance,
          });
        }
      } else if (category === "teacher" && selectedTeacher) {
        const teacher = teacherData?.data?.results?.find(
          (data: any) => data.id === selectedTeacher
        );
        if (teacher) {
          form.setFieldsValue({
            base_salary: teacher?.base_salary,
            attendance: teacher?.attendance,
          });
        }
      }
    }
  }, [
    payrollData,
    form,
    baseSalary,
    category,
    selectedEmployee,
    selectedTeacher,
    employeeData?.data?.results,
    teacherData?.data?.results,
  ]);

  const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    const start = dates?.[0] ? dates[0].format("YYYY-MM-DD") : null;
    const end = dates?.[1] ? dates[1].format("YYYY-MM-DD") : null;

    setPeriodDate([start, end]);
    form.setFieldsValue({ period: [start, end] });
  };

  const onFinish = (values: any): void => {
    console.log(values);
    const result = {
      period_start: periodDate?.[0],
      period_end: periodDate?.[1],
      employee: selectedEmployee,
      teacher: selectedTeacher,
      attendance_days: 0,
      deductions: deductions,
      advance_salary: advanceSalary,
      provident_fund: providentFund,
      mobile_bill: mobileBill,
      feed_allowance: feedAllowance,
      performance_bonus: performanceBonus,
      festival_bonus: festivalBonus,
      travel_allowance: travelAllowance,
      health_allowance: healthAllowance,
      incentive: incentive,
      house_rent: houseRent,
      profit_share: profitShare,
      sales_commission: salesCommission,
      other_allowance: otherAllowance,
    };

    update({ id: record, data: result });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
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
          <Form.Item name="period">
            <RangePicker
              value={
                periodDate[0] && periodDate[1]
                  ? [
                      dayjs(periodDate[0], "YYYY-MM-DD"),
                      dayjs(periodDate[1], "YYYY-MM-DD"),
                    ]
                  : [null, null]
              }
              onChange={handleRangeChange}
              format="YYYY-MM-DD"
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
              <Form.Item label="Base Salary" name="base_salary">
                <Input placeholder="Base Salary" type="number" disabled />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item label="Daily Salary" name="daily_salary">
                <Input placeholder="Daily Salary" type="number" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Divider plain>Deductions</Divider>
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <PayrollDeduction />
            </Col>
            <Col lg={6}>
              <Form.Item label="Advance Salary" name="advance_salary">
                <Input placeholder="Advance Salary" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item label="Provident Fund" name="provident_fund">
                <Input placeholder="Provident Fund" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Divider plain>Additional</Divider>
          <Row gutter={[16, 16]}>
            <Col lg={6}>
              <Form.Item<any> label="Mobile Bill" name="mobile_bill">
                <Input placeholder="Mobile Bill" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Feed Allowance" name="feed_allowance">
                <Input placeholder="Feed Allowance" type="number" />
              </Form.Item>
            </Col>{" "}
            <Col lg={6}>
              <Form.Item<any>
                label="Performance Bonus"
                name="performance_bonus"
              >
                <Input placeholder="Performance Bonus" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Festival Bonus" name="festival_bonus">
                <Input placeholder="Festival Bonus" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Travel Allowance" name="travel_allowance">
                <Input placeholder="Travel Allowance" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Health Allowance" name="health_allowance">
                <Input placeholder="Health Allowance" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Incentive" name="incentive">
                <Input placeholder="Incentive" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="House Rent" name="house_rent">
                <Input placeholder="House Rent" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Profit Share" name="profit_share">
                <Input placeholder="Profit Share" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Sales Commission" name="sales_commission">
                <Input placeholder="Sales Commission" type="number" />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Other" name="other_allowance">
                <Input placeholder="Others" type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Divider plain>Net Total and Note</Divider>
          <Row gutter={[16, 16]}>
            <Col lg={6}>
              <Form.Item<any> label="Gross Salary" name="gross_salary">
                <Input placeholder="Gross Salary" type="number" disabled />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item<any> label="Total Salary" name="net_salary">
                <Input placeholder="Total Salary" disabled />
              </Form.Item>
            </Col>
            <Col lg={6}></Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default UpdatePayroll;
