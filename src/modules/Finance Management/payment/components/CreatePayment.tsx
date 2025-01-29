import { Col, DatePicker, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { ICreatePayment } from "../types/paymentTypes";
import { useGetPayrollQuery } from "../../payroll/api/payrollEndPoints";
import { useCreatePaymentMutation } from "../api/paymentEndPoints";
import { CommonPaymentMethod } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { useState } from "react";

const CreatePayment = () => {
  const [search, setSearch] = useState("");
  const { data: GetPayrollData, isFetching } = useGetPayrollQuery({
    search: search,
  });
  const [create, { isLoading, isSuccess }] = useCreatePaymentMutation();

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      payment_date: dayjs(values.payment_date).format("YYYY-MM-DD"),
    };

    create(formattedValues);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Payroll "
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
                      ? `${data.employee.first_name} ${data.employee.last_name}`
                      : `${data.teacher.first_name} ${data.teacher.last_name}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Payment Method"
              name="payment_method"
              rules={[{ required: true, message: "Input your Method!" }]}
            >
              <CommonPaymentMethod />
            </Form.Item>
          </Col>
          {/* <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Accounts"
              name="account"
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
          </Col> */}
          {/* <Col lg={8}>
            <Form.Item<any> label="Available Balance" name="available_balance">
              <Input placeholder="Available Balance" type="number" />
            </Form.Item>
          </Col> */}
          <Col lg={8}>
            <Form.Item<ICreatePayment>
              label="Amount Paid"
              name="amount_paid"
              rules={[{ required: true, message: "Amount Paid" }]}
            >
              <Input placeholder="Amount Paid" type="number" />
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
        </Row>
      </Form>
    </div>
  );
};

export default CreatePayment;
