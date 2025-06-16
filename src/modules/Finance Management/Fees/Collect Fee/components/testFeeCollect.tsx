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
  Tag,
  Button,
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
      const paid_amount = particulars.reduce((sum, item) => {
        const paid = Number(item?.paid_amount || 0);
        const due = Number(item?.due_amount || 0);
        return sum + (paid > due ? due : paid);
      }, 0);

      setTotals({ amount, due_amount, paid_amount });
    }
  }, [form, particulars]);

  const { data: getSingleAdmission } = useGetSingleAdmissionQuery<any>(
    admissionId || admission,
    {
      skip: !admissionId && !admission,
    }
  );
  const { data: newCollectFeeData } = useGetNewCollectFeesQuery<any>(
    {
      admission: admissionId || admission,
      month: month ? dayjs(month).format("YYYY-MM-01") : undefined,
    },
    {
      skip: !admissionId && !admission,
    }
  );

  useEffect(() => {
    if (getSingleAdmission?.data) {
      form.setFieldsValue({
        admission: getSingleAdmission?.data?.id,
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

  // Removed useEffect with AntForm.watch as it does not exist.
  // The logic for updating due_amount is already handled in the onChange handlers of the Input components for amount and paid_amount.

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
          // paid_amount: parseInt(item.paid_amount) || 0,
          paid_amount: 0,
          due_amount: item.due_amount || item.amount - (item.paid_amount || 0),
          one_time: item.one_time || false,
          is_add_on: item.is_add_on || false,
          is_carried_forward: item?.is_carried_forward || false,
        })
      );

      form.setFieldsValue({ particulars: combinedParticulars });
    } else {
      form.setFieldsValue({ particulars: [] });
    }
  }, [
    newCollectFeeData?.data,
    newCollectFeeData?.data?.particulars,
    newCollectFeeData?.data?.carried_forward_dues,
    form,
  ]);

  const currentMonthParticulars = particulars?.filter(
    (item: any) => !item?.is_carried_forward
  );
  const carriedForwardParticulars = particulars?.filter(
    (item: any) => item?.is_carried_forward
  );

  const onFinish = (values: any): void => {
    const mergedParticulars = currentMonthParticulars.map((item: any) => {
      const previous = newCollectFeeData?.data?.particulars?.find(
        (p: any) => p.id === item.id
      );

      const previousPaid = previous?.paid_amount || 0;
      const currentPaid = Number(item?.paid_amount) || 0;

      return {
        id: item?.id,
        name: item?.name,
        amount: Number(item?.amount),
        paid_amount: previousPaid + currentPaid,
        one_time: item?.one_time || false,
        is_add_on: item?.is_add_on || false,
      };
    });

    const results = {
      admission: values?.admission,
      add_ons: values?.add_ons,
      discount_type: values?.discount_type,
      discount_value: values?.discount_value,
      payment_method: "cash",
      account: values?.account,
      payment_date: dayjs(values?.payment_date).format("YYYY-MM-01"),
      month: dayjs(values?.month).format("YYYY-MM-01"),
      particulars: mergedParticulars || [],
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

  // const onFinish = (values: any): void => {
  //   console.log("vsl", values);

  //   const results = {
  //     admission: values?.admission,
  //     add_ons: values?.add_ons,
  //     discount_type: values?.discount_type,
  //     discount_value: values?.discount_value,
  //     payment_method: "cash",
  //     account: values?.account,
  //     payment_date: dayjs(values?.payment_date).format("YYYY-MM-01"),
  //     month: dayjs(values?.month).format("YYYY-MM-01"),
  //     particulars:
  //       currentMonthParticulars.map((item: any) => ({
  //         id: item?.id,
  //         name: item?.name,
  //         amount: Number(item?.amount),
  //         paid_amount: Number(item?.paid_amount) || 0,
  //         one_time: item?.one_time || false,
  //         is_add_on: item?.is_add_on || false,
  //       })) || [],
  //     carried_forward_dues:
  //       carriedForwardParticulars.map((item: any) => ({
  //         id: item?.id,
  //         name: item?.name,
  //         amount: Number(item?.amount),
  //         paid_amount: Number(item?.paid_amount) || 0,
  //       })) || [],
  //   };

  //   create(results)
  //     .unwrap()
  //     .then(() => {
  //       message.success("Fee collected successfully!");
  //       navigate("/finance");
  //     })
  //     .catch(() => {
  //       message.error("Failed to collect fee. Please try again.");
  //     });
  // };

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
        <Link
          to={"/finance"}
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
                <Select placeholder="Select Account" className="w-full">
                  {Array.isArray(accountList?.data) &&
                    accountList?.data?.map((account: any) => (
                      <Select.Option key={account?.id} value={account?.id}>
                        {account?.account_type} ({account?.balance})
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
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
                                style={{ color: "green" }}
                                disabled={!isAddOn}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0;
                                  const paidAmount =
                                    form.getFieldValue([
                                      "particulars",
                                      name,
                                      "paid_amount",
                                    ]) || 0;
                                  form.setFieldValue(
                                    ["particulars", name, "due_amount"],
                                    value - paidAmount
                                  );
                                }}
                              />
                            </AntForm.Item>
                            {/* <AntForm.Item
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
                            </AntForm.Item> */}
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
                                    if (value > total) {
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
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0;
                                  const amount =
                                    form.getFieldValue([
                                      "particulars",
                                      name,
                                      "amount",
                                    ]) || 0;
                                  form.setFieldValue(
                                    ["particulars", name, "due_amount"],
                                    amount - value
                                  );
                                }}
                              />
                            </AntForm.Item>
                            {/* <AntForm.Item
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
                                      "due_amount",
                                    ]);
                                    if (value > total) {
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
                              <Input prefix={<TbCoinTaka />} type="number" />
                            </AntForm.Item> */}
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
              </table>
            )}
          </AntForm.List>
        </Card>
      </Form>
    </div>
  );
};

export default CreateNewCollectFee;























/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import {
//   Col,
//   DatePicker,
//   Input,
//   Row,
//   Select,
//   Form as AntForm,
//   Card,
//   Typography,
//   message,
//   Tag,
//   Button,
// } from "antd";
// import { Form } from "../../../../../common/CommonAnt";
// import { MdOutlineArrowRightAlt } from "react-icons/md";
// import dayjs from "dayjs";
// import {
//   useCreateNewCollectFeesMutation,
//   useGetNewCollectFeesQuery,
// } from "../api/collectFeeEndPoints";
// import { debounce } from "lodash";
// import {
//   useGetAdmissionQuery,
//   useGetSingleAdmissionQuery,
// } from "../../../../general settings/admission/api/admissionEndPoints";
// import { useEffect, useState } from "react";
// import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
// import { TbCoinTaka } from "react-icons/tb";
// import { useGetAccountQuery } from "../../../Accounts/account/api/accountEndPoints";

// const { Title } = Typography;

// const CreateNewCollectFee = () => {
//   const [searchParams] = useSearchParams();
//   const admissionId = searchParams.get("admission_id");
//   const [form] = AntForm.useForm();
//   const [search, setSearch] = useState("");
//   const { data: accountList } = useGetAccountQuery({});
//   const navigate = useNavigate();
//   const [create, { isLoading, isSuccess }] = useCreateNewCollectFeesMutation();
//   const { data: admissionData, isFetching } = useGetAdmissionQuery({
//     search: search,
//     status: "approved",
//   });

//   const admission = AntForm.useWatch("admission", form);
//   const month = AntForm.useWatch("month", form);
//   const particulars = AntForm.useWatch("particulars", form);
//   const [totals, setTotals] = useState({
//     amount: 0,
//     due_amount: 0,
//     paid_amount: 0,
//   });

//   useEffect(() => {
//     if (Array.isArray(particulars)) {
//       const amount = particulars.reduce(
//         (sum, item) => sum + Number(item?.amount || 0),
//         0
//       );
//       const due_amount = particulars.reduce(
//         (sum, item) => sum + Number(item?.due_amount || 0),
//         0
//       );
//       const paid_amount = particulars.reduce((sum, item) => {
//         const paid = Number(item?.paid_amount || 0);
//         const due = Number(item?.due_amount || 0);
//         return sum + (paid > due ? due : paid);
//       }, 0);

//       setTotals({ amount, due_amount, paid_amount });
//     }
//   }, [form, particulars]);

//   const { data: getSingleAdmission } = useGetSingleAdmissionQuery<any>(
//     admissionId || admission,
//     {
//       skip: !admissionId && !admission,
//     }
//   );
//   const { data: newCollectFeeData } = useGetNewCollectFeesQuery<any>(
//     {
//       admission: admissionId || admission,
//       month: month ? dayjs(month).format("YYYY-MM-01") : undefined,
//     },
//     {
//       skip: !admissionId && !admission,
//     }
//   );

//   useEffect(() => {
//     if (getSingleAdmission?.data) {
//       form.setFieldsValue({
//         admission: getSingleAdmission?.data?.id,
//         // admission:
//         //   getSingleAdmission?.data?.student?.first_name +
//         //   " " +
//         //   getSingleAdmission?.data?.student?.last_name +
//         //   " " +
//         //   `(${getSingleAdmission?.data?.registration_number})` +
//         //   " " +
//         //   -getSingleAdmission?.data?.session?.name,
//         class: getSingleAdmission?.data?.grade_level,
//         session: getSingleAdmission?.data?.session?.name,
//       });
//     }
//   }, [form, getSingleAdmission?.data]);

//   console.log(particulars);

//   useEffect(() => {
//     const particularsData = newCollectFeeData?.data?.particulars || [];
//     const carriedForwardDues =
//       newCollectFeeData?.data?.carried_forward_dues || [];

//     if (particularsData.length > 0 || carriedForwardDues.length > 0) {
//       const combinedParticulars = [
//         ...particularsData,
//         ...carriedForwardDues,
//       ].map((item: any) => {
//         const isNewAddOn = item?.is_add_on && !item?.id;
//         const isAddOn = item?.is_add_on || false;
//         const amount = Number(item.amount || 0);
//         const due_amount = Number(item?.due_amount || 0);
//         const paidAmount = Number(item.paid_amount || 0);

//         console.log(isAddOn, amount, due_amount, "oo");

//         return {
//           id: item.id,
//           name: `${item.name} ${
//             item?.is_carried_forward
//               ? `(${dayjs(item.due_month).format("MMM")})`
//               : ""
//           }`,
//           amount: amount,
//           paid_amount: 0,
//           due_amount:
//             isNewAddOn && amount !== due_amount
//               ? amount
//               : item?.due_amount || amount - paidAmount,
//           one_time: item.one_time || false,
//           is_add_on: isAddOn,
//           is_carried_forward: item?.is_carried_forward || false,
//         };
//       });

//       form.setFieldsValue({ particulars: combinedParticulars });
//     } else {
//       form.setFieldsValue({ particulars: [] });
//     }
//   }, [
//     newCollectFeeData?.data,
//     newCollectFeeData?.data?.particulars,
//     newCollectFeeData?.data?.carried_forward_dues,
//     form,
//   ]);

//   // useEffect(() => {
//   //   if (!Array.isArray(particulars)) return;

//   //   const updatedParticulars = particulars?.map((item, _index) => {
//   //     if (item) {
//   //       const amount = Number(item.amount || 0);
//   //       return {
//   //         ...item,
//   //         due_amount: amount,
//   //       };
//   //     }
//   //     return item;
//   //   });

//   //   form.setFieldsValue({ particulars: updatedParticulars });
//   // }, [particulars, form]);

//   // useEffect(() => {
//   //   const particulars = newCollectFeeData?.data?.particulars || [];
//   //   const carriedForwardDues =
//   //     newCollectFeeData?.data?.carried_forward_dues || [];

//   //   if (particulars.length > 0 || carriedForwardDues.length > 0) {
//   //     const combinedParticulars = [...particulars, ...carriedForwardDues].map(
//   //       (item: any) => ({
//   //         id: item.id,
//   //         name: `${item.name} ${
//   //           item?.is_carried_forward
//   //             ? `(${dayjs(item.due_month).format("MMM")})`
//   //             : ""
//   //         }`,
//   //         amount: item.amount,
//   //         // paid_amount: parseInt(item.paid_amount) || 0,
//   //         paid_amount: 0,
//   //         due_amount: item.due_amount || item.amount - (item.paid_amount || 0),
//   //         one_time: item.one_time || false,
//   //         is_add_on: item.is_add_on || false,
//   //         is_carried_forward: item?.is_carried_forward || false,
//   //       })
//   //     );

//   //     form.setFieldsValue({ particulars: combinedParticulars });
//   //   } else {
//   //     form.setFieldsValue({ particulars: [] });
//   //   }
//   // }, [
//   //   newCollectFeeData?.data,
//   //   newCollectFeeData?.data?.particulars,
//   //   newCollectFeeData?.data?.carried_forward_dues,
//   //   form,
//   // ]);

//   const currentMonthParticulars = particulars?.filter(
//     (item: any) => !item?.is_carried_forward
//   );
//   const carriedForwardParticulars = particulars?.filter(
//     (item: any) => item?.is_carried_forward
//   );

//   const onFinish = (values: any): void => {
//     const mergedParticulars = currentMonthParticulars.map((item: any) => {
//       const previous = newCollectFeeData?.data?.particulars?.find(
//         (p: any) => p.id === item.id
//       );

//       const previousPaid = previous?.paid_amount || 0;
//       const currentPaid = Number(item?.paid_amount) || 0;

//       return {
//         id: item?.id,
//         name: item?.name,
//         amount: Number(item?.amount),
//         paid_amount: previousPaid + currentPaid,
//         one_time: item?.one_time || false,
//         is_add_on: item?.is_add_on || false,
//       };
//     });

//     const results = {
//       admission: values?.admission,
//       add_ons: values?.add_ons,
//       discount_type: values?.discount_type,
//       discount_value: values?.discount_value,
//       payment_method: "cash",
//       account: values?.account,
//       payment_date: dayjs(values?.payment_date).format("YYYY-MM-01"),
//       month: dayjs(values?.month).format("YYYY-MM-01"),
//       particulars: mergedParticulars || [],
//       carried_forward_dues:
//         carriedForwardParticulars.map((item: any) => ({
//           id: item?.id,
//           name: item?.name,
//           amount: Number(item?.amount),
//           paid_amount: Number(item?.paid_amount) || 0,
//         })) || [],
//     };

//     create(results)
//       .unwrap()
//       .then(() => {
//         message.success("Fee collected successfully!");
//         navigate("/finance");
//       })
//       .catch(() => {
//         message.error("Failed to collect fee. Please try again.");
//       });
//   };

//   const handleAddAddOn = () => {
//     const particulars = form.getFieldValue("particulars") || [];
//     const newAddOn = {
//       name: "",
//       amount: 0,
//       paid_amount: 0,
//       due_amount: 0,
//       one_time: true,
//       is_add_on: true,
//     };

//     form.setFieldsValue({
//       particulars: [...particulars, newAddOn],
//     });
//     // form.setFieldsValue({
//     //   particulars: [
//     //     ...particulars,
//     //     {
//     //       name: "",
//     //       amount: 0,
//     //       paid_amount: 0,
//     //       due_amount: 0,
//     //       one_time: true,
//     //       is_add_on: true,
//     //     },
//     //   ],
//     // });
//   };

//   return (
//     <div className="p-6">
//       <div className="text-center pb-5">
//         <Title level={3}>Collect Fees</Title>
//         <Link
//           to={"/finance"}
//           className="flex items-center justify-center gap-2 text-blue-600"
//         >
//           Go To Collect Fee List <MdOutlineArrowRightAlt />
//         </Link>
//       </div>

//       <Form
//         form={form}
//         onFinish={onFinish}
//         isLoading={isLoading}
//         isSuccess={isSuccess}
//         layout="vertical"
//         buttonLabel="Collect Fee"
//         onValuesChange={(_, allValues) => {
//           const particulars = allValues.particulars || [];

//           const amount = particulars.reduce(
//             (sum: number, item: any) => sum + Number(item?.amount || 0),
//             0
//           );
//           const due_amount = particulars.reduce(
//             (sum: number, item: any) => sum + Number(item?.due_amount || 0),
//             0
//           );
//           const paid_amount = particulars.reduce((sum: number, item: any) => {
//             const paid = Number(item?.paid_amount || 0);
//             const due = Number(item?.due_amount || 0);
//             return sum + (paid > due ? due : paid);
//           }, 0);

//           setTotals({ amount, due_amount, paid_amount });
//         }}
//       >
//         <Card className="mb-6 shadow-lg rounded-lg">
//           <Row gutter={[16, 16]}>
//             <Col lg={10} md={12}>
//               <Form.Item
//                 label="Select Student"
//                 name="admission"
//                 rules={[{ required: true, message: "Please select a student" }]}
//               >
//                 <Select
//                   placeholder="Select Student"
//                   className="w-full"
//                   allowClear
//                   showSearch
//                   onSearch={debounce(setSearch, 500)}
//                   filterOption={false}
//                   loading={isFetching}
//                   notFoundContent={
//                     admissionData?.data?.results?.length === 0
//                       ? "No Student found"
//                       : null
//                   }
//                   suffixIcon={<UserOutlined />}
//                   optionFilterProp="children"
//                 >
//                   {admissionData?.data?.results?.map((data: any) => (
//                     <Select.Option key={data?.id} value={data?.id}>
//                       {data?.student?.first_name} {data?.student?.last_name} (
//                       {data?.student?.user?.username}) - {data?.session?.name}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col lg={8} md={12}>
//               <Form.Item label="Class" name="class">
//                 <Input placeholder="Class" disabled prefix={<UserOutlined />} />
//               </Form.Item>
//             </Col>
//             <Col lg={6} md={12}>
//               <Form.Item label="Session" name="session">
//                 <Input
//                   placeholder="Session"
//                   disabled
//                   prefix={<CalendarOutlined />}
//                 />
//               </Form.Item>
//             </Col>
//             <Col lg={6} md={12}>
//               <Form.Item
//                 label="Month"
//                 name="month"
//                 initialValue={dayjs()}
//                 rules={[{ required: true, message: "Payment Month" }]}
//               >
//                 <DatePicker
//                   picker="month"
//                   className="w-full"
//                   suffixIcon={<CalendarOutlined />}
//                 />
//               </Form.Item>
//             </Col>
//             <Col lg={6} md={12}>
//               <AntForm.Item
//                 label="Payment Date"
//                 name="payment_date"
//                 rules={[{ required: true, message: "Payment Date" }]}
//                 initialValue={dayjs()}
//               >
//                 <DatePicker
//                   placeholder="Select Date"
//                   format="YYYY-MM-DD"
//                   className="w-full"
//                   suffixIcon={<CalendarOutlined />}
//                 />
//               </AntForm.Item>
//             </Col>

//             <Col lg={6}>
//               <Form.Item
//                 label="Select Account"
//                 name="account"
//                 rules={[{ required: true, message: "Account is required!" }]}
//               >
//                 <Select placeholder="Select Account" className="w-full">
//                   {Array.isArray(accountList?.data) &&
//                     accountList?.data?.map((account: any) => (
//                       <Select.Option key={account?.id} value={account?.id}>
//                         {account?.account_type} ({account?.balance})
//                       </Select.Option>
//                     ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//         </Card>

//         <Card
//           title="Fee Particulars"
//           extra={
//             <div>
//               <Button
//                 type="primary"
//                 onClick={handleAddAddOn}
//                 className="text-white font-medium text-sm flex items-center justify-center gap-2"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #f43f5e 0%, #d946ef 100%)",
//                   border: "none",
//                   boxShadow:
//                     "0 4px 6px -1px rgba(244, 63, 94, 0.3), 0 2px 4px -1px rgba(244, 63, 94, 0.2)",
//                   transition: "all 0.3s ease",
//                   padding: "0 16px",
//                   height: "32px",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-1px)";
//                   e.currentTarget.style.boxShadow =
//                     "0 10px 15px -3px rgba(244, 63, 94, 0.3), 0 4px 6px -2px rgba(244, 63, 94, 0.2)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 6px -1px rgba(244, 63, 94, 0.3), 0 2px 4px -1px rgba(244, 63, 94, 0.2)";
//                 }}
//               >
//                 Additional Fee
//               </Button>
//             </div>
//           }
//         >
//           <AntForm.List
//             name="particulars"
//             initialValue={newCollectFeeData?.data?.particulars}
//           >
//             {(fields: any, { remove }: any) => (
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ background: "#eff", textAlign: "left" }}>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       SL
//                     </th>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       Particular Name
//                     </th>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       Type
//                     </th>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       Total Amount
//                     </th>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       Due Amount
//                     </th>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       Paid Amount
//                     </th>
//                     <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//                       Action
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {fields.map(
//                     (
//                       {
//                         key,
//                         name,
//                         ...restField
//                       }: { key: number; name: number; [key: string]: any },
//                       index: number
//                     ) => {
//                       const isAddOn = form.getFieldValue([
//                         "particulars",
//                         name,
//                         "is_add_on",
//                       ]);
//                       const isOneTime = form.getFieldValue([
//                         "particulars",
//                         name,
//                         "one_time",
//                       ]);

//                       return (
//                         <tr
//                           key={key}
//                           style={{
//                             backgroundColor:
//                               index % 2 === 0 ? "#fff" : "#f9fafb",
//                             borderBottom: "1px solid #f0f0f0",
//                           }}
//                         >
//                           <td>{index + 1}</td>
//                           <td style={{ padding: "8px" }}>
//                             <AntForm.Item
//                               {...restField}
//                               name={[name, "name"]}
//                               style={{ marginBottom: 0 }}
//                               rules={[
//                                 { required: true, message: "Name is required" },
//                               ]}
//                             >
//                               <Input
//                                 className="collect-fee"
//                                 disabled={!isAddOn}
//                                 placeholder="Enter Particular Name"
//                               />
//                             </AntForm.Item>
//                           </td>
//                           <td>
//                             {isAddOn && isOneTime && (
//                               <Tag color="magenta">Add-on (One-time)</Tag>
//                             )}
//                             {!isAddOn && isOneTime && (
//                               <Tag color="blue">One-time</Tag>
//                             )}
//                             {!isAddOn && !isOneTime && (
//                               <Tag color="green">Regular</Tag>
//                             )}
//                           </td>
//                           <td>
//                             <AntForm.Item
//                               {...restField}
//                               name={[name, "amount"]}
//                               style={{ marginBottom: 0 }}
//                               rules={[
//                                 {
//                                   required: true,
//                                   message: "Amount is required",
//                                 },
//                               ]}
//                             >
//                               <Input
//                                 prefix={<TbCoinTaka />}
//                                 type="number"
//                                 style={{
//                                   color: "green",
//                                 }}
//                                 disabled={!isAddOn}
//                               />
//                             </AntForm.Item>
//                           </td>
//                           <td
//                             style={{
//                               color: "red",
//                             }}
//                           >
//                             <AntForm.Item
//                               {...restField}
//                               name={[name, "due_amount"]}
//                               style={{ marginBottom: 0 }}
//                             >
//                               <Input
//                                 prefix={<TbCoinTaka />}
//                                 style={{
//                                   color: "red",
//                                 }}
//                                 disabled
//                               />
//                             </AntForm.Item>
//                           </td>
//                           <td>
//                             <AntForm.Item
//                               {...restField}
//                               name={[name, "paid_amount"]}
//                               style={{ marginBottom: 0 }}
//                               rules={[
//                                 {
//                                   required: true,
//                                   message: "Paid amount is required",
//                                 },
//                                 {
//                                   validator: (_, value) => {
//                                     const total = form.getFieldValue([
//                                       "particulars",
//                                       name,
//                                       "amount",
//                                     ]);
//                                     if (value > total) {
//                                       return Promise.reject(
//                                         new Error(
//                                           "Paid amount can't exceed total amount"
//                                         )
//                                       );
//                                     }
//                                     return Promise.resolve();
//                                   },
//                                 },
//                               ]}
//                             >
//                               <Input prefix={<TbCoinTaka />} type="number" />
//                             </AntForm.Item>
//                           </td>
//                           <td>
//                             {isAddOn && (
//                               <Button
//                                 type="link"
//                                 danger
//                                 onClick={() => remove(name)}
//                               >
//                                 Remove
//                               </Button>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     }
//                   )}
//                 </tbody>

//                 <tfoot>
//                   <tr
//                     style={{
//                       backgroundColor: "#FFFFFF",
//                       borderTop: "2px solid #ddd",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     <td colSpan={3}>Total</td>

//                     <td
//                       style={{
//                         color: "green",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "4px",
//                         }}
//                       >
//                         <TbCoinTaka />
//                         {totals.amount}
//                       </div>
//                     </td>

//                     <td
//                       style={{
//                         color: "red",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "4px",
//                         }}
//                       >
//                         <TbCoinTaka />
//                         {totals.due_amount}
//                       </div>
//                     </td>

//                     <td>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "4px",
//                         }}
//                       >
//                         <TbCoinTaka />
//                         {totals.paid_amount}
//                       </div>
//                     </td>
//                     <td></td>
//                   </tr>
//                 </tfoot>
//               </table>
//             )}
//           </AntForm.List>
//         </Card>
//       </Form>
//     </div>
//   );
// };

// export default CreateNewCollectFee;
