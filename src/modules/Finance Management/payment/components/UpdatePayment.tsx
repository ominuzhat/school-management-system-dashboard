import { useState, useEffect } from "react";
import {
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Form as AntForm,
  Button,
} from "antd"; // Add Button from antd
import { ICreatePayment } from "../types/paymentTypes";
import {
  useGetSinglePaymentQuery,
  useUpdatePaymentMutation,
} from "../api/paymentEndPoints";
import { useGetPayrollQuery } from "../../payroll/api/payrollEndPoints";
import { CommonPaymentMethod } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import dayjs from "dayjs";
import debounce from "lodash/debounce";

const UpdatePayment = ({ record }: any) => {
  const { data: paymentData } = useGetSinglePaymentQuery(Number(record));
  const [update] = useUpdatePaymentMutation();
  const [search, setSearch] = useState("");
  const { data: GetPayrollData, isFetching: isFetchingPayroll } =
    useGetPayrollQuery({
      search: search,
    });

  const [form] = AntForm.useForm();

  useEffect(() => {
    if (paymentData?.data) {
      form.setFieldsValue({
        payroll: paymentData?.data?.payroll?.id,
        payment_method: paymentData?.data?.payment_method,
        amount_paid: paymentData?.data?.amount_paid,
        payment_date: dayjs(paymentData?.data?.payment_date),
      });
    }
  }, [paymentData, form]);

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      payment_date: dayjs(values.payment_date).format("YYYY-MM-DD"),
    };
    update({ id: record, data: formattedValues });
  };

  return (
    <div>
      <AntForm form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <AntForm.Item<ICreatePayment>
              label="Payroll"
              name="payroll"
              rules={[{ required: true, message: "Select Payroll" }]}
            >
              <Select
                placeholder="Search Payroll"
                className="w-full"
                allowClear
                showSearch
                onSearch={debounce(setSearch, 500)}
                filterOption={false}
                loading={isFetchingPayroll}
                notFoundContent={
                  GetPayrollData?.data?.results?.length === 0
                    ? "No payrolls found"
                    : null
                }
              >
                {GetPayrollData?.data?.results?.map((data: any) => (
                  <Select.Option key={data?.id} value={data?.id}>
                    {data?.employee
                      ? `${data.employee.first_name} ${data.employee.last_name}`
                      : `${data.teacher.first_name} ${data.teacher.last_name}`}
                  </Select.Option>
                ))}
              </Select>
            </AntForm.Item>
          </Col>

          <Col lg={8}>
            <AntForm.Item<ICreatePayment>
              label="Payment Method"
              name="payment_method"
              rules={[{ required: true, message: "Input your Method!" }]}
            >
              <CommonPaymentMethod />
            </AntForm.Item>
          </Col>

          <Col lg={8}>
            <AntForm.Item<ICreatePayment>
              label="Amount Paid"
              name="amount_paid"
              rules={[{ required: true, message: "Amount Paid" }]}
            >
              <Input placeholder="Amount Paid" type="number" />
            </AntForm.Item>
          </Col>

          <Col lg={8}>
            <AntForm.Item<ICreatePayment>
              label="Payment Date"
              name="payment_date"
              rules={[{ required: true, message: "Payment Date" }]}
            >
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="w-full"
              />
            </AntForm.Item>
          </Col>
        </Row>

        <AntForm.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </AntForm.Item>
      </AntForm>
    </div>
  );
};

export default UpdatePayment;
