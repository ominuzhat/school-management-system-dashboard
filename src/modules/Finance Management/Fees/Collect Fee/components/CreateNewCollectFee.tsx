import { useNavigate, useSearchParams } from "react-router-dom";
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
  Tag,
  Button,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
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
import { useGetAccountQuery } from "../../../Accounts/account/api/accountEndPoints";
import BackButton from "../../../../../common/Button/BackButton";

const { Title } = Typography;

const CreateNewCollectFee = () => {
  const [searchParams] = useSearchParams();
  const admissionId = searchParams.get("admission_id");
  const [form] = AntForm.useForm();
  const [search, setSearch] = useState("");
  const { data: accountList } = useGetAccountQuery({});
  const navigate = useNavigate();
  const [create, { isLoading, isSuccess }] = useCreateNewCollectFeesMutation();
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
    status: "approved",
  });

  const admission = AntForm.useWatch("admission", form);
  const month = AntForm.useWatch("month", form);
  const discountType = AntForm.useWatch("discount_type", form);
  const discountAmount = AntForm.useWatch("discount_value", form);
  const particulars = AntForm.useWatch("particulars", form);
  const [totals, setTotals] = useState<any>({
    amount: 0,
    due_amount: 0,
    paid_amount: 0,
    net_amount: 0,
  });

  useEffect(() => {
    if (Array.isArray(particulars)) {
      const amount = particulars.reduce(
        (sum, item) => sum + Number(item?.amount || 0),
        0
      );

      const due_amount = particulars.reduce(
        (sum, item) => sum + Number(item?.due_amount || 0),
        0
      );

      const paid_amount = particulars.reduce(
        (sum, item) => sum + Number(item?.paid_amount || 0),
        0
      );

      // const paid_amount = particulars.reduce((sum, item) => {
      //   const paid = Number(item?.paid_amount || 0);
      //   const due = Number(item?.due_amount || 0);
      //   return sum + (paid > due ? due : paid);
      // }, 0);

      let net_amount = paid_amount || 0;

      if (discountType && discountAmount) {
        const discount = Number(discountAmount);

        if (discountType === "percent") {
          const percentDiscount = (discount / 100) * paid_amount;
          net_amount = paid_amount - percentDiscount;
        } else if (discountType === "amount") {
          net_amount = paid_amount - discount;
        }

        net_amount = Math.max(net_amount, 0);
      }

      setTotals({ amount, due_amount, paid_amount, net_amount });
    }
  }, [form, particulars, discountType, discountAmount]);

  // useEffect(() => {
  //   if (Array.isArray(particulars)) {
  //     // 1️⃣ Raw totals
  //     const amount = particulars.reduce(
  //       (sum, item) => sum + Number(item?.amount || 0),
  //       0
  //     );

  //     const due_amount = particulars.reduce(
  //       (sum, item) => sum + Number(item?.due_amount || 0),
  //       0
  //     );

  //     let paid_amount = particulars.reduce((sum, item) => {
  //       const paid = Number(item?.paid_amount || 0);
  //       const due = Number(item?.due_amount || 0);
  //       return sum + (paid > due ? due : paid);
  //     }, 0);

  //     // 2️⃣ Apply discount only to paid_amount
  //     if (discountType && discountAmount) {
  //       const discount = Number(discountAmount);

  //       if (discountType === "percent") {
  //         const percentDiscount = (discount / 100) * paid_amount;
  //         paid_amount -= percentDiscount;
  //       } else if (discountType === "amount") {
  //         paid_amount -= discount;
  //       }

  //       paid_amount = Math.max(paid_amount, 0);
  //     }

  //     setTotals({ amount, due_amount, paid_amount });
  //   }
  // }, [form, particulars, discountType, discountAmount]);

  const { data: getSingleAdmission } = useGetSingleAdmissionQuery<any>(
    admissionId || admission,
    {
      skip: !admissionId && !admission,
    }
  );
  const { data: newCollectFeeData } = useGetNewCollectFeesQuery<any>(
    {
      admission: admissionId || admission?.value,
      month: month ? dayjs(month).format("YYYY-MM-01") : undefined,
    },
    {
      skip: !admissionId && !admission?.value,
    }
  );

  useEffect(() => {
    if (getSingleAdmission?.data) {
      form.setFieldsValue({
        admission: {
          value: getSingleAdmission?.data?.id, // this matches Select.Option's `value`
          label: `${getSingleAdmission?.data?.student?.first_name} ${getSingleAdmission?.data?.student?.last_name} (${getSingleAdmission?.data?.student?.user?.username})`,
        },
        // admission:
        //   getSingleAdmission?.data?.student?.first_name +
        //   " " +
        //   getSingleAdmission?.data?.student?.last_name +
        //   " " +
        //   `(${getSingleAdmission?.data?.registration_number})` +
        //   " " +
        //   -getSingleAdmission?.data?.session?.name,
        class: getSingleAdmission?.data?.grade_level,
        session: getSingleAdmission?.data?.session?.name,
      });
    }
  }, [form, getSingleAdmission?.data]);

  const defaultCashAccountId =
    Array.isArray(accountList?.data) &&
    accountList?.data?.find((account: any) => account?.type === "cash")?.id;

  useEffect(() => {
    const particulars = newCollectFeeData?.data?.particulars || [];
    const carriedForwardDues =
      newCollectFeeData?.data?.carried_forward_dues || [];

    if (particulars.length > 0 || carriedForwardDues.length > 0) {
      const combinedParticulars = [...particulars, ...carriedForwardDues].map(
        (item: any) => ({
          id: item.id,
          name: `${item.name} ${
            item?.is_carried_forward
              ? `(${dayjs(item.due_month).format("MMM")})`
              : ""
          }`,
          amount: item.amount,
          paid_amount: 0,
          due_amount: item.due_amount || item.amount - (item.paid_amount || 0),
          one_time: item.one_time || false,
          is_add_on: item.is_add_on || false,
          is_carried_forward: item?.is_carried_forward || false,
        })
      );

      form.setFieldsValue({ particulars: combinedParticulars });
    } else {
      // Set empty array if both particulars and carried_forward_dues are empty
      form.setFieldsValue({ particulars: [] });
    }

    form.setFieldsValue({ account: defaultCashAccountId });
  }, [
    newCollectFeeData?.data,
    newCollectFeeData?.data?.particulars,
    newCollectFeeData?.data?.carried_forward_dues,
    form,
    defaultCashAccountId,
  ]);

  const currentMonthParticulars = particulars?.filter(
    (item: any) => !item?.is_carried_forward
  );
  const carriedForwardParticulars = particulars?.filter(
    (item: any) => item?.is_carried_forward
  );

  const onFinish = (values: any): void => {
    console.log(values);

    const results = {
      ...values,
      admission: values?.admission?.value,
      add_ons: values?.add_ons,
      discount_type: values?.discount_type,
      discount_value: values?.discount_value,
      payment_method: "cash",
      account: values?.account,
      payment_date: dayjs(values?.payment_date).format("YYYY-MM-01"),
      month: dayjs(values?.month).format("YYYY-MM-01"),
      particulars:
        currentMonthParticulars.map((item: any) => ({
          id: item?.id,
          name: item?.name,
          amount: Number(item?.amount),
          paid_amount: Number(item?.paid_amount) || 0,
          one_time: item?.one_time || false,
          is_add_on: item?.is_add_on || false,
        })) || [],
      carried_forward_dues:
        carriedForwardParticulars.map((item: any) => ({
          id: item?.id,
          name: item?.name,
          amount: Number(item?.amount),
          paid_amount: Number(item?.paid_amount) || 0,
        })) || [],
    };

    create(results)
      .unwrap()
      .then(() => {
        message.success("Fee collected successfully!");
        navigate("/finance");
      })
      .catch(() => {
        message.error("Failed to collect fee. Please try again.");
      });
  };

  const handleAddAddOn = () => {
    const particulars = form.getFieldValue("particulars") || [];
    form.setFieldsValue({
      particulars: [
        ...particulars,
        {
          name: "",
          amount: 0,
          paid_amount: 0,
          due_amount: 0,
          one_time: true,
          is_add_on: true,
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <div className="text-center pb-5">
        <Title level={3}>Collect Fees</Title>
        <BackButton to="/finance" />
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        layout="vertical"
        buttonLabel="Collect Fee"
        onValuesChange={(_, allValues) => {
          const particulars = allValues.particulars || [];

          const amount = particulars.reduce(
            (sum: number, item: any) => sum + Number(item?.amount || 0),
            0
          );
          const due_amount = particulars.reduce(
            (sum: number, item: any) => sum + Number(item?.due_amount || 0),
            0
          );
          const paid_amount = particulars.reduce((sum: number, item: any) => {
            const paid = Number(item?.paid_amount || 0);
            const due = Number(item?.due_amount || 0);
            return sum + (paid > due ? due : paid);
          }, 0);

          setTotals({ amount, due_amount, paid_amount });
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
                  optionFilterProp="children"
                >
                  {admissionData?.data?.results?.map((data: any) => (
                    <Select.Option key={data?.id} value={data?.id}>
                      {data?.student?.first_name} {data?.student?.last_name} (
                      {data?.student?.user?.username}) - {data?.session?.name}
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
                  format={"MMMM YYYY"}
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
              <Form.Item
                label="Select Account"
                name="account"
                rules={[{ required: true, message: "Account is required!" }]}
              >
                <Select
                  placeholder="Select Account"
                  className="w-full"
                  allowClear
                >
                  {Array.isArray(accountList?.data) &&
                    accountList?.data?.map((account: any) => (
                      <Select.Option key={account?.id} value={account?.id}>
                        {account?.type === "cash"
                          ? `Cash (My Account)`
                          : account?.type === "bank"
                          ? `Bank - ${account?.account_name} - ${account?.bank_name} (${account?.balance})`
                          : `${account?.type} - ${account?.account_type} (${account?.balance})`}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item label="Discount Type" name="discount_type">
                <Select placeholder="Select Type" allowClear>
                  <Select.Option value="percent">Percent</Select.Option>
                  <Select.Option value="amount">Amount</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {discountType && (
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Discount Amount" name="discount_value">
                  <Input placeholder="Discount Amount" type="number" />
                </Form.Item>
              </Col>
            )}

            {discountType && (
              <Col xs={24} sm={24} md={8} lg={12}>
                <Form.Item label="Discount Reason" name="discount_reason">
                  <Input.TextArea
                    placeholder="Enter reason for discount"
                    rows={2}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Card>

        <Card
          title="Fee Particulars"
          extra={
            <div>
              <Button
                type="primary"
                onClick={handleAddAddOn}
                className="text-white font-medium text-sm flex items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #f43f5e 0%, #d946ef 100%)",
                  border: "none",
                  boxShadow:
                    "0 4px 6px -1px rgba(244, 63, 94, 0.3), 0 2px 4px -1px rgba(244, 63, 94, 0.2)",
                  transition: "all 0.3s ease",
                  padding: "0 16px",
                  height: "32px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(244, 63, 94, 0.3), 0 4px 6px -2px rgba(244, 63, 94, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(244, 63, 94, 0.3), 0 2px 4px -1px rgba(244, 63, 94, 0.2)";
                }}
              >
                Additional Fee
              </Button>
            </div>
          }
        >
          <AntForm.List
            name="particulars"
            initialValue={newCollectFeeData?.data?.particulars}
          >
            {(fields: any, { remove }: any) => (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#eff", textAlign: "left" }}>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      SL
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      Particular Name
                    </th>
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      Type
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
                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                      Action
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
                    ) => {
                      const isAddOn = form.getFieldValue([
                        "particulars",
                        name,
                        "is_add_on",
                      ]);
                      const isOneTime = form.getFieldValue([
                        "particulars",
                        name,
                        "one_time",
                      ]);

                      return (
                        <tr
                          key={key}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#f9fafb",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          <td>{index + 1}</td>
                          <td style={{ padding: "8px" }}>
                            <AntForm.Item
                              {...restField}
                              name={[name, "name"]}
                              style={{ marginBottom: 0 }}
                              rules={[
                                { required: true, message: "Name is required" },
                              ]}
                            >
                              <Input
                                className="collect-fee"
                                disabled={!isAddOn}
                                placeholder="Enter Particular Name"
                              />
                            </AntForm.Item>
                          </td>
                          <td>
                            {isAddOn && isOneTime && (
                              <Tag color="magenta">Add-on (One-time)</Tag>
                            )}
                            {!isAddOn && isOneTime && (
                              <Tag color="blue">One-time</Tag>
                            )}
                            {!isAddOn && !isOneTime && (
                              <Tag color="green">Regular</Tag>
                            )}
                          </td>
                          <td>
                            <AntForm.Item
                              {...restField}
                              name={[name, "amount"]}
                              style={{ marginBottom: 0 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Amount is required",
                                },
                              ]}
                            >
                              <Input
                                prefix={<TbCoinTaka />}
                                type="number"
                                style={{
                                  color: "green",
                                }}
                                disabled={!isAddOn}
                              />
                            </AntForm.Item>
                          </td>
                          <td
                            style={{
                              color: "red",
                            }}
                          >
                            <AntForm.Item
                              {...restField}
                              name={[name, "due_amount"]}
                              style={{ marginBottom: 0 }}
                            >
                              <Input
                                prefix={<TbCoinTaka />}
                                style={{
                                  color: "red",
                                }}
                                disabled
                              />
                            </AntForm.Item>
                          </td>
                          <td>
                            <AntForm.Item
                              {...restField}
                              name={[name, "paid_amount"]}
                              style={{ marginBottom: 0 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Paid amount is required",
                                },
                                {
                                  validator: (_, value) => {
                                    const total = form.getFieldValue([
                                      "particulars",
                                      name,
                                      "amount",
                                    ]);
                                    if (value > total && !isAddOn) {
                                      return Promise.reject(
                                        new Error(
                                          "Paid amount can't exceed total amount"
                                        )
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                },
                              ]}
                            >
                              <Input
                                prefix={<TbCoinTaka />}
                                type="number"
                                disabled={
                                  !isAddOn &&
                                  form.getFieldValue([
                                    "particulars",
                                    name,
                                    "due_amount",
                                  ]) <= 0
                                }
                              />
                            </AntForm.Item>
                          </td>
                          <td>
                            {isAddOn && (
                              <Button
                                type="link"
                                danger
                                onClick={() => remove(name)}
                              >
                                Remove
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>

                {discountType && discountAmount && (
                  <tfoot>
                    <tr
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderTop: "1px solid #ddd",
                        fontWeight: "bold",
                      }}
                    >
                      <td colSpan={3}></td>
                      <td> </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Discount Amount: {discountAmount}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Net Amount: {totals?.net_amount}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                )}

                <tfoot>
                  <tr
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderTop: "2px solid #ddd",
                      fontWeight: "bold",
                    }}
                  >
                    <td colSpan={3}>Total</td>

                    <td
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

                    <td>
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
                    <td></td>
                  </tr>
                </tfoot>
                {/* 
                <tfoot className="flex items-center justify-between w-full border">
                  <tr>
                    <td>
                      <Form.Item
                        label="Discount Type"
                        name="discount_type"
                        className="w-full"
                      >
                        <Select placeholder="Select Type" allowClear  className="w-full">
                          <Select.Option value="percent">Percent</Select.Option>
                          <Select.Option value="amount">Amount</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item label="Discount Type" name="discount_type">
                        <Select placeholder="Select Type" allowClear>
                          <Select.Option value="percent">Percent</Select.Option>
                          <Select.Option value="amount">Amount</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item label="Discount Type" name="discount_type">
                        <Select placeholder="Select Type" allowClear>
                          <Select.Option value="percent">Percent</Select.Option>
                          <Select.Option value="amount">Amount</Select.Option>
                        </Select>
                      </Form.Item>
                    </td>
                  </tr>
                </tfoot> */}
              </table>
            )}
          </AntForm.List>
        </Card>
      </Form>
    </div>
  );
};

export default CreateNewCollectFee;
