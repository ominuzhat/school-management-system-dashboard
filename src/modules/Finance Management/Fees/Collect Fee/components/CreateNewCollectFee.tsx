/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Form as AntForm,
  Card,
  Typography,
  message,
  Switch,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import dayjs from "dayjs";
import {
  useCreateNewCollectFeesMutation,
  useGetNewCollectFeesQuery,
} from "../api/collectFeeEndPoints";
import { debounce } from "lodash";
import {
  useGetAdmissionQuery,
  useGetSingleAdmissionQuery,
} from "../../../../general settings/admission/api/admissionEndPoints";
import { useEffect, useState } from "react";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { TbCoinTaka } from "react-icons/tb";
import { useGetAdditionalFeesQuery } from "../../Additional Fee/api/additionalFeeEndPoints";
import { useGetAccountQuery } from "../../../Accounts/account/api/accountEndPoints";

const { Title } = Typography;

const CreateNewCollectFee = () => {
  const [searchParams] = useSearchParams();
  const admissionId = searchParams.get("admission_id");
  const [form] = AntForm.useForm();
  const [search, setSearch] = useState("");
  const { data: accountList } = useGetAccountQuery({});
  const navigate = useNavigate();
  const [create, { isLoading, isSuccess }] = useCreateNewCollectFeesMutation();
  const { data: additionalData } = useGetAdditionalFeesQuery({});
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
    status: "approved",
  });

  const admission = AntForm.useWatch("admission", form);
  const month = AntForm.useWatch("month", form);
  const particulars = AntForm.useWatch("particulars", form);
  const [totals, setTotals] = useState({
    amount: 0,
    due_amount: 0,
    paid_amount: 0,
  });

  // Update totals dynamically when particulars change
  useEffect(() => {
    const formValues = form.getFieldValue("particulars");

    if (Array.isArray(formValues)) {
      const amount = formValues.reduce(
        (sum, item) => sum + Number(item?.amount || 0),
        0
      );
      const due_amount = formValues.reduce(
        (sum, item) => sum + Number(item?.due_amount || 0),
        0
      );
      const paid_amount = formValues.reduce((sum, item) => {
        const paid = Number(item?.paid_amount || 0);
        const due = Number(item?.due_amount || 0);
        return sum + (paid > due ? due : paid);
      }, 0);

      setTotals({ amount, due_amount, paid_amount });
    }
  }, [form, form.getFieldValue("particulars")]);

  const { data: getSingleAdmission } = useGetSingleAdmissionQuery<any>(
    admissionId || admission,
    {
      skip: !admissionId && !admission,
    }
  );

  const { data: newCollectFeeData } = useGetNewCollectFeesQuery({
    admission: admissionId || admission,
    month: month ? dayjs(month).format("YYYY-MM-01") : undefined,
  });

  useEffect(() => {
    if (getSingleAdmission?.data) {
      form.setFieldsValue({
        admission: getSingleAdmission?.data?.id,
        class: getSingleAdmission?.data?.grade_level,
        session: getSingleAdmission?.data?.session?.name,
      });
    }
  }, [form, getSingleAdmission?.data]);

  useEffect(() => {
    if (newCollectFeeData?.data?.particulars?.length > 0) {
      form.setFieldsValue({
        particulars: newCollectFeeData?.data?.particulars.map((item: any) => ({
          name: item.name,
          amount: item.amount,
          paid_amount: item.paid_amount || 0,
          due_amount: item.due_amount || item.amount - (item.paid_amount || 0),
        })),
      });
    }
  }, [newCollectFeeData?.data?.particulars, form]);

  const onFinish = (values: any): void => {
    const results = {
      admission: values?.admission,
      add_ons: values?.add_ons,
      discount_type: values?.discount_type,
      discount_value: values?.discount_value,
      payment_method: "cash",
      account: values?.account,
      paid_amount: values?.paid_amount,
      payment_date: dayjs(values?.payment_date).format("YYYY-MM-01"),
      month: dayjs(values?.month).format("YYYY-MM-01"),
      particulars,
    };

    console.log(values);
    console.log(results, " results");

    create(results)
      .unwrap()
      .then(() => {
        message.success("Fee collected successfully!");
        navigate("/collect-fee/list");
      })
      .catch(() => {
        message.error("Failed to collect fee. Please try again.");
      });
  };

  return (
    <div className="p-6">
      <div className="text-center pb-5">
        <Title level={3}>Collect Fees</Title>
        <Link
          to={"/collect-fee/list"}
          className="flex items-center justify-center gap-2 text-blue-600"
        >
          Go To Collect Fee List <MdOutlineArrowRightAlt />
        </Link>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        layout="vertical"
        buttonLabel="Collect Fee"
        onValuesChange={(_changedValues: any, allValues) => {
          const updatedParticulars = allValues.particulars.map((item: any) => {
            const amount = Number(item?.amount || 0);
            const paid = Number(item?.paid_amount || 0);
            const due = amount - paid;
            return {
              ...item,
              due_amount: due < 0 ? 0 : due,
            };
          });
          form.setFieldsValue({ particulars: updatedParticulars });
        }}
      >
        <Card className="mb-6 shadow-lg rounded-lg">
          <Row gutter={[16, 16]}>
            <Col lg={10} md={12}>
              <Form.Item
                label="Select Student"
                name="admission"
                rules={[{ required: true, message: "Please select a student" }]}
              >
                <Select
                  placeholder="Select Student"
                  className="w-full"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    admissionData?.data?.results?.length === 0
                      ? "No Student found"
                      : null
                  }
                  suffixIcon={<UserOutlined />}
                >
                  {admissionData?.data?.results?.map((data: any) => (
                    <Select.Option key={data?.id} value={data?.id}>
                      {data?.student?.first_name} {data?.student?.last_name} (
                      {data?.registration_number}) - {data?.session?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8} md={12}>
              <Form.Item label="Class" name="class">
                <Input placeholder="Class" disabled prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col lg={6} md={12}>
              <Form.Item label="Session" name="session">
                <Input
                  placeholder="Session"
                  disabled
                  prefix={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12}>
              <Form.Item
                label="Month"
                name="month"
                initialValue={dayjs()}
                rules={[{ required: true, message: "Payment Month" }]}
              >
                <DatePicker
                  picker="month"
                  className="w-full"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col lg={6} md={12}>
              <AntForm.Item
                label="Payment Date"
                name="payment_date"
                rules={[{ required: true, message: "Payment Date" }]}
                initialValue={dayjs()}
              >
                <DatePicker
                  placeholder="Select Date"
                  format="YYYY-MM-DD"
                  className="w-full"
                  suffixIcon={<CalendarOutlined />}
                />
              </AntForm.Item>
            </Col>
            <Col lg={6}>
              <Form.Item label="Additional" name="add_ons">
                <Select
                  mode="multiple"
                  placeholder="Select Additional Fees"
                  className="w-full"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array.isArray(additionalData?.data) &&
                    additionalData?.data?.length === 0
                      ? "No additional fees found"
                      : null
                  }
                >
                  {Array.isArray(additionalData?.data) &&
                    additionalData?.data?.map((data: any) => (
                      <Select.Option key={data?.id} value={data?.id}>
                        {data?.name} - ৳ {data?.amount}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item
                label="Select Account"
                name="account"
                rules={[{ required: true, message: "Account is required!" }]}
              >
                <Select placeholder="Select Account" className="w-full">
                  {Array.isArray(accountList?.data) &&
                    accountList?.data?.map((account: any) => (
                      <Select.Option key={account?.id} value={account?.id}>
                        {account?.account_type} - {account?.balance}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {newCollectFeeData?.data?.particulars?.length > 0 && (
          <Card title="Fee Particulars">
            <AntForm.List
              name="particulars"
              initialValue={newCollectFeeData?.data?.particulars}
            >
              {(fields: any) => (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#eff", textAlign: "left" }}>
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        SL
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        Particular Name
                      </th>{" "}
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        One Time
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        Is Add-on
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        Total Amount
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        Due Amount
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                        Paid Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {fields.map(
                      (
                        {
                          key,
                          name,
                          ...restField
                        }: { key: number; name: number; [key: string]: any },
                        index: number
                      ) => (
                        <tr
                          key={key}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#f9fafb",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          <td
                          // style={{ padding: "8px", border: "1px solid #ddd" }}
                          >
                            {index + 1}
                          </td>
                          <td style={{ padding: "8px" }}>
                            <AntForm.Item
                              {...restField}
                              name={[name, "name"]}
                              style={{ marginBottom: 0 }}
                            >
                              <Input  className="collect-fee" />
                            </AntForm.Item>
                          </td>
                          <td>
                            <AntForm.Item
                              {...restField}
                              name={[name, "one_time"]}
                              style={{ marginBottom: 0 }}
                              valuePropName="checked"
                            >
                              <Switch disabled />
                            </AntForm.Item>
                          </td>
                          <td>
                            <AntForm.Item
                              {...restField}
                              name={[name, "is_add_on"]}
                              style={{ marginBottom: 0 }}
                              valuePropName="checked"
                            >
                              <Switch disabled />
                            </AntForm.Item>
                          </td>
                          <td
                          // style={{ padding: "8px", border: "1px solid #ddd" }}
                          >
                            <AntForm.Item
                              {...restField}
                              name={[name, "amount"]}
                              style={{ marginBottom: 0 }}
                            >
                              <Input
                                disabled
                                prefix={<TbCoinTaka />}
                                style={{
                                  color: "green",
                                  background: "none",
                                  border: "none",
                                  boxShadow: "none",
                                  padding: 0,
                                  cursor: "default",
                                }}
                              />
                            </AntForm.Item>
                          </td>
                          <td
                            style={{
                              // padding: "8px",
                              // border: "1px solid #ddd",
                              color: "red",
                            }}
                          >
                            <AntForm.Item
                              {...restField}
                              name={[name, "due_amount"]}
                              style={{ marginBottom: 0 }}
                            >
                              <Input
                                disabled
                                prefix={<TbCoinTaka />}
                                style={{
                                  color: "red",
                                  background: "none",
                                  border: "none",
                                  boxShadow: "none",
                                  padding: 0,
                                  cursor: "default",
                                }}
                              />
                            </AntForm.Item>
                          </td>{" "}
                          <td
                          // style={{ padding: "8px", border: "1px solid #ddd" }}
                          >
                            <AntForm.Item
                              {...restField}
                              name={[name, "paid_amount"]}
                              style={{ marginBottom: 0 }}
                              rules={[
                                {
                                  validator: (_, value) => {
                                    const due = form.getFieldValue([
                                      "particulars",
                                      name,
                                      "due_amount",
                                    ]);
                                    if (value > due) {
                                      return Promise.reject(
                                        new Error(
                                          "Paid amount can't exceed due amount"
                                        )
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                },
                              ]}
                            >
                              <Input prefix={<TbCoinTaka />} />
                            </AntForm.Item>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>

                  <tfoot>
                    <tr
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderTop: "2px solid #ddd",
                        fontWeight: "bold",
                      }}
                    >
                      <td
                        // style={{ padding: "8px", border: "1px solid #ddd" }}
                        colSpan={4}
                      >
                        Total
                      </td>

                      <td
                        //  style={{ padding: "8px", border: "1px solid #ddd" }}
                        style={{
                          color: "green",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <TbCoinTaka />
                          {totals.amount}
                        </div>
                      </td>

                      <td
                        style={{
                          color: "red",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <TbCoinTaka />
                          {totals.due_amount}
                        </div>
                      </td>

                      <td
                      // style={{ padding: "8px", border: "1px solid #ddd" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <TbCoinTaka />
                          {totals.paid_amount}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </AntForm.List>
          </Card>
        )}
      </Form>
    </div>
  );
};

export default CreateNewCollectFee;

{
  /* {admission && (
  <Card className="p-4 shadow-lg rounded-lg">
    <div className="mb-6">
      <div className="grid grid-cols-12 gap-4 border-b py-2 font-semibold">
        <div className="col-span-1">SL</div>
        <div className="col-span-4">Particular</div>

        <div className="col-span-2">One Time</div>
        <div className="col-span-2">Amount</div>
      </div>

      {newCollectFeeData?.data?.particulars?.map(
        (item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 border-b py-3 items-center"
          >
            <div className="col-span-1">{index + 1}</div>
            <div className="col-span-4">{item.name}</div>

            <div className="col-span-2">
              <Switch
                checked={item.one_time}
                disabled
                checkedChildren="Yes"
                unCheckedChildren="No"
              />
            </div>
            <div className="col-span-2">{item.amount}</div>
          </div>
        )
      )}
    </div>

    <div className="flex justify-between items-center pt-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <Text strong className="text-lg text-yellow-600 w-32">
            Discount Type:
          </Text>
          <Form.Item
            name="discount_type"
            className="mb-0 w-40"
            rules={[{ required: true, message: "Please select" }]}
            initialValue="amount"
          >
            <Select>
              <Select.Option value="amount">Amount</Select.Option>
              <Select.Option value="percent">Percent</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="flex items-center gap-4">
          <Text strong className="text-lg text-yellow-600 w-32">
            Discount Value:
          </Text>
          <Form.Item name="discount_value" className="mb-0">
            <Input
              type="number"
              placeholder="0"
              className="w-40"
              prefix={<TbCoinTaka />}
            />
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <Text strong className="text-lg text-red-600 w-32">
            Total Due:
          </Text>
          <div className="w-40 text-center font-semibold border border-red-200 rounded px-4 py-1">
            {finalDueAmount || 0}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Text strong className="text-lg text-green-600 w-32">
            Paid Amount:
          </Text>
          <Form.Item
            name="paid_amount"
            className="mb-0"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <Input
              type="number"
              placeholder="0"
              className="w-40"
              prefix={<TbCoinTaka />}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  </Card>
)} */
}
