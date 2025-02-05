import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { CommonPaymentMethod } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import debounce from "lodash/debounce";
import { useState } from "react";
import { useCreateTuitionFeePaymentMutation } from "../api/tuitionPaymentEndPoints";
import { ICreateTuitionFeePayment } from "../types/tuitionPaymentTypes";
import { useGetAdditionalFeesQuery } from "../../Fees/Additional Fee/api/additionalFeeEndPoints";

const CreateTuitionFeePayment = () => {
  const [search, setSearch] = useState("");
  const { data: GetPayrollData, isFetching } = useGetAdditionalFeesQuery({
    search: search,
  });

  const [create, { isLoading, isSuccess }] =
    useCreateTuitionFeePaymentMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateTuitionFeePayment>
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
                  Array?.isArray(GetPayrollData?.data) &&
                  GetPayrollData?.data?.length === 0
                    ? "No payrolls found"
                    : null
                }
              >
                {Array?.isArray(GetPayrollData?.data) &&
                  GetPayrollData?.data?.map((data: any) => (
                    <Select.Option key={data?.id} value={data?.id}>
                      {data?.admission &&
                        `${data?.admission?.student.first_name} ${data?.admission?.student.last_name}  (${data?.month})`}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateTuitionFeePayment>
              label="Payment Method"
              name="payment_method"
              rules={[{ required: true, message: "Input your Method!" }]}
            >
              <CommonPaymentMethod />
            </Form.Item>
          </Col>

          {/* <Col lg={8}>
            <Form.Item<any> label="Available Balance" name="available_balance">
              <Input placeholder="Available Balance" type="number" />
            </Form.Item>
          </Col> */}
          <Col lg={8}>
            <Form.Item<ICreateTuitionFeePayment>
              label="Amount "
              name="amount"
              rules={[{ required: true, message: "Amount" }]}
            >
              <Input placeholder="Amount" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTuitionFeePayment;
