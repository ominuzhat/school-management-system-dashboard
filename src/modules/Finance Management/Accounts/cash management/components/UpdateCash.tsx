import { Col, Input, Row, Select, Form, DatePicker, Button } from "antd";
import { useEffect } from "react";
import { useGetAccountQuery } from "../../account/api/accountEndPoints";
import { TbCoinTaka } from "react-icons/tb";
import {
  EntryTypeEnum,
  ICreateCash,
  IGetCash,
  PaymentMethodEnum,
} from "../types/cashTypes";
import {
  useGetSingleCashQuery,
  useUpdateCashMutation,
} from "../api/cashEndPoints";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";

const UpdateCash = ({ record }: { record: any }) => {
  const { data: accountList } = useGetAccountQuery({});

  const [form] = Form.useForm();

  const { data: singleData, isLoading } = useGetSingleCashQuery(Number(record));
  const [update] = useUpdateCashMutation();

  useEffect(() => {
    if (singleData?.data) {
      const accountData = singleData?.data as unknown as IGetCash;
      form.setFieldsValue({
        account: accountData.account?.id,
        payment_method: accountData.payment_method,
        entry_type: accountData.entry_type,
        amount: accountData.amount,
        description: accountData.description,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any) => {
    const results = {
      ...values,
      date: dayjs(values?.date).format("YYYY-MM-DD"),
    };
    update({ id: record, data: results });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateCash> label="Select Account Type" name="account">
              <Select
                placeholder="Select Account Type"
                className="w-full"
                allowClear
              >
                {Array.isArray(accountList?.data) &&
                  accountList?.data?.map((account: any) => (
                    <Select.Option key={account?.id} value={account?.id}>
                      {account?.account_type} - ({account?.balance})
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateCash>
              label="Select Payment Method"
              name="payment_method"
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
            <Form.Item<ICreateCash> label="Select Entry Type" name="entry_type">
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
            <Form.Item<ICreateCash> label="Amount" name="amount">
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
            <Form.Item<ICreateCash> label="Description" name="description">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
          <Col className="flex items-center justify-center">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateCash;
