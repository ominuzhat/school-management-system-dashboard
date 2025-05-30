import { Col, Input, Row, Select, Form as AntForm, DatePicker } from "antd";
import { Form } from "../../../../../common/CommonAnt";

import { useGetAccountQuery } from "../../account/api/accountEndPoints";
import { TbCoinTaka } from "react-icons/tb";
import { useCreateCashMutation } from "../api/cashEndPoints";
import { CalendarOutlined } from "@ant-design/icons";

import {
  EntryTypeEnum,
  ICreateCash,
  PaymentMethodEnum,
} from "../types/cashTypes";
import dayjs from "dayjs";
import { useEffect } from "react";

const CreateCash = () => {
  const [create, { isLoading, isSuccess }] = useCreateCashMutation();
  const { data: accountList } = useGetAccountQuery({});
  const [form] = AntForm.useForm();

  //   const accountId = AntForm.useWatch("account", form);

  const onFinish = (values: any): void => {
    const results = {
      ...values,
      date: dayjs(values?.date).format("YYYY-MM-DD"),
    };

    create(results);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

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
            <Form.Item<ICreateCash>
              label="Select Account "
              name="account"
              rules={[{ required: true, message: "Account is required!" }]}
            >
              <Select
                placeholder="Select Account "
                className="w-full"
                allowClear
              >
                {Array.isArray(accountList?.data) &&
                  accountList?.data?.map((account: any) => (
                    <Select.Option key={account?.id} value={account?.id}>
                      {account?.account_type} - {account?.balance}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateCash>
              label="Select Payment Method"
              name="payment_method"
              rules={[
                { required: true, message: "Payment Method is required!" },
              ]}
            >
              <Select placeholder="Select Payment Method" className="w-full">
                {Object.entries(PaymentMethodEnum).map(([key, value]) => (
                  <Select.Option key={value} value={value}>
                    {key.replace(/_/g, " ")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateCash>
              label="Select Entry Type"
              name="entry_type"
              rules={[{ required: true, message: "Entry Type is required!" }]}
            >
              <Select placeholder="Select Entry Type" className="w-full">
                {Object.entries(EntryTypeEnum).map(([key, value]) => (
                  <Select.Option key={value} value={value}>
                    {key.replace(/_/g, " ")}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateCash>
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Amount is required!" }]}
            >
              <Input
                addonBefore={<TbCoinTaka />}
                placeholder="Amount"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateCash>
              label="Date"
              name="date"
              initialValue={dayjs()}
            >
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="w-full"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateCash>
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateCash;
