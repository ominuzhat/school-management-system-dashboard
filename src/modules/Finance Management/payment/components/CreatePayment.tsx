/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, DatePicker, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { ICreatePayment } from "../types/paymentTypes";
import { useGetPayrollQuery } from "../../payroll/api/payrollEndPoints";
import { useCreatePaymentMutation } from "../api/paymentEndPoints";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useGetAccountQuery } from "../../Accounts/account/api/accountEndPoints";

const CreatePayment = () => {
  const [search, setSearch] = useState("");
  const [form] = AntForm.useForm();
  const selectedMonth = AntForm.useWatch("month", form);
  const selectedPayrollId = AntForm.useWatch("payroll", form);

  const { data: GetPayrollData, isFetching } = useGetPayrollQuery({
    search: search,
    year_month: selectedMonth
      ? dayjs(selectedMonth).format("YYYY-MM")
      : undefined,
  });
  const { data: accountList } = useGetAccountQuery({});

  useEffect(() => {
    if (selectedPayrollId && GetPayrollData?.data?.results?.length) {
      const selectedPayroll: any = GetPayrollData.data.results.find(
        (item: any) => item.id === selectedPayrollId
      );

      if (selectedPayroll) {
        form.setFieldsValue({
          due_Amount: selectedPayroll.due_Amount || 0,
          period_start: selectedPayroll.period_start
            ? dayjs(selectedPayroll.period_start)
            : undefined,
          period_end: selectedPayroll.period_end
            ? dayjs(selectedPayroll.period_end)
            : undefined,
        });
      }
    }
  }, [selectedPayrollId, GetPayrollData?.data, form]);

  console.log(selectedMonth);

  useEffect(() => {
    if (
      selectedMonth &&
      GetPayrollData?.data?.results?.length === 0 &&
      form.getFieldValue("payroll")
    ) {
      form.setFieldsValue({ payroll: undefined });
    }
  }, [selectedMonth, GetPayrollData, form]);

  const [create, { isLoading, isSuccess }] = useCreatePaymentMutation();

  const onFinish = (values: any): void => {
    console.log(values);

    const { month, period_start, period_end, due_Amount, ...restValues } =
      values;

    const formattedValues = {
      ...restValues,
      payment_method: "cash",
      payment_date: dayjs(restValues.payment_date).format("YYYY-MM-DD"),
    };

    // Now send the cleaned payload
    create(formattedValues);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item label="Select Month" name="month" initialValue={dayjs()}>
              <DatePicker
                picker="month"
                className="w-full"
                format="MMMM YYYY"
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Payroll"
              name="payroll"
              rules={[{ required: true, message: "Select Payroll " }]}
            >
              <Select
                placeholder="Search Payroll"
                className="w-full"
                allowClear
                showSearch
                onSearch={debounce(setSearch, 500)}
                filterOption={false}
                loading={isFetching}
                notFoundContent={
                  GetPayrollData?.data?.results?.length === 0
                    ? "No payrolls found"
                    : null
                }
              >
                {GetPayrollData?.data?.results?.map((data: any) => (
                  <Select.Option key={data?.id} value={data?.id}>
                    {data?.employee
                      ? `${data.employee.first_name} ${data.employee.last_name} (${data?.employee?.user?.username}) `
                      : `${data.teacher.first_name} ${data.teacher.last_name} (${data?.teacher?.user?.username})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item label="Period Start" name="period_start">
              <DatePicker className="w-full" format="YYYY-MM-DD" disabled />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item label="Period End" name="period_end">
              <DatePicker className="w-full" format="YYYY-MM-DD" disabled />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Payment Date"
              name="payment_date"
              rules={[{ required: true, message: "Payment Date" }]}
              initialValue={dayjs()}
            >
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>

          {/* <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Payment Method"
              name="payment_method"
              rules={[{ required: true, message: "Input your Method!" }]}
            >
              <CommonPaymentMethod />
            </Form.Item>
          </Col> */}

          <Col lg={8}>
            <Form.Item
              label="Select Account Type"
              name="account"
              rules={[{ required: true, message: "Account Type is required!" }]}
            >
              <Select placeholder="Select Account Type" className="w-full">
                {Array.isArray(accountList?.data) &&
                  accountList?.data?.map((account: any) => (
                    <Select.Option key={account?.id} value={account?.id}>
                      {account?.type} - {account?.account_name}{" "}
                      {account?.account_type} ({account?.balance})
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* <Col lg={8}>
            <Form.Item<any> label="Available Balance" name="available_balance">
              <Input placeholder="Available Balance" type="number" />
            </Form.Item>
          </Col> */}

          <Col lg={8}>
            <Form.Item<any> label="Due Balance" name="due_Amount">
              <Input placeholder="Due Balance" type="number" disabled />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Amount Paid"
              name="amount_paid"
              rules={[{ required: true, message: "Amount Paid" }]}
            >
              <Input placeholder="Amount Paid" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePayment;
