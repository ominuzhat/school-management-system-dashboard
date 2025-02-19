import {
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Form as AntForm,
  Card,
  Tag,
  Typography,
  message,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../../../../general settings/admission/api/admissionEndPoints";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  useGetCollectSingleFeesQuery,
  useUpdateCollectFeesMutation,
} from "../api/collectFeeEndPoints";
import { CommonPaymentMethod } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useGetAdditionalFeesQuery } from "../../Additional Fee/api/additionalFeeEndPoints";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";

const { Title, Text } = Typography;

const UpdateCollectFee = () => {
  const [form] = AntForm.useForm();
  const { collectFeeId } = useParams();
  const [finalDueAmount, setFinalDueAmount] = useState<number | null>(null);
  const [discount, setDiscount] = useState({
    discountType: "amount",
    discountValue: 0,
  });

  const [paidAmount, setPaidAmount] = useState<number | null>(null);
  const [addOns, setAddOns] = useState<string[]>([]); // Ensure it's always an array
  const [search, setSearch] = useState("");
  const [selectedFees, setSelectedFees] = useState<any[]>([]); // Initialize as an empty array
  const [selectedAdditionalFee, setSelectedAdditionalFee] = useState<any[]>([]); // Initialize as an empty array
  const { data: singleData } = useGetCollectSingleFeesQuery(
    Number(collectFeeId)
  );
  const [update, { isLoading, isSuccess }] = useUpdateCollectFeesMutation();
  const { data: additionalData } = useGetAdditionalFeesQuery({});
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
  });

  const totalAmountOfAdditionalFees = useMemo(() => {
    return Array.isArray(selectedAdditionalFee)
      ? selectedAdditionalFee.reduce((sum, data: any) => sum + data?.amount, 0)
      : 0;
  }, [selectedAdditionalFee]);

  useEffect(() => {
    if (singleData?.data) {
      const formattedAddOns =
        singleData?.data?.add_ons?.map((data: any) => data.id) || [];

      form.setFieldsValue({
        admission: singleData?.data?.admission?.id,
        class: singleData?.data?.admission?.grade_level,
        paid_amount: singleData?.data?.paid_amount,
        discount_value: singleData?.data?.discount_value,
        payment_method: singleData?.data?.payment_method,
        session: singleData?.data?.admission?.session?.name,
        due_amount: singleData?.data?.admission?.due_amount,
        month: singleData?.data?.month ? dayjs(singleData?.data?.month) : null,
        payment_date: singleData?.data?.payment_date
          ? dayjs(singleData?.data?.payment_date)
          : null,
        add_ons: formattedAddOns,
      });

      setAddOns(formattedAddOns);
      setSelectedFees(singleData?.data?.admission?.fees || []);
      setFinalDueAmount(singleData?.data?.admission?.due_amount || 0);
    }
  }, [singleData?.data, form]);

  useEffect(() => {
    if (Array.isArray(addOns) && Array.isArray(additionalData?.data)) {
      const foundAdditionalData = additionalData?.data.filter((data: any) =>
        addOns.includes(data?.id)
      );

      setSelectedAdditionalFee(foundAdditionalData || []);
    }
  }, [addOns, additionalData?.data]);

  const handleAddOnsChange = (values: string[]) => {
    setAddOns(values);
  };

  useEffect(() => {
    const totalDueAmount =
      (singleData?.data?.due_amount || 0) + totalAmountOfAdditionalFees;

    let discountedAmount = 0;

    if (discount.discountType === "amount") {
      discountedAmount = discount.discountValue || 0;
    } else if (discount.discountType === "percent") {
      discountedAmount = (totalDueAmount * (discount.discountValue || 0)) / 100;
    }

    const calculatedDueAmount =
      totalDueAmount - discountedAmount - (paidAmount || 0);

    setFinalDueAmount(Math.max(calculatedDueAmount, 0));
  }, [
    discount.discountType,
    discount.discountValue,
    paidAmount,
    singleData?.data?.due_amount,
    totalAmountOfAdditionalFees,
  ]);

  const onFinish = (values: any): void => {
    const results = {
      admission: values?.admission,
      add_ons: values?.add_ons,
      payment_method: values?.payment_method,
      paid_amount: values?.paid_amount,
      payment_date: dayjs(values?.payment_date).format("YYYY-MM-DD"),
      month: dayjs(values?.month).format("YYYY-MM-DD"),
    };

    update({ id: singleData?.data?.id, data: results })
      .unwrap()
      .then(() => {
        message.success("Fee updated successfully!");
      })
      .catch(() => {
        message.error("Failed to update fee. Please try again.");
      });
  };

  return (
    <div className="p-6">
      <div className="text-center  pb-5">
        <Title level={3} className="">
          Update Collect Fees
        </Title>
        <Link
          to={"/collect-fee/list"}
          className="flex items-center justify-center  gap-2 text-blue-600"
        >
          Go To Collect Fee List <MdOutlineArrowRightAlt />
        </Link>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        layout="horizontal"
        buttonLabel="Update Fee"
      >
        <Card className="mb-6 shadow-lg rounded-lg">
          <Row gutter={[16, 16]}>
            <Col lg={10} md={12}>
              <Form.Item label="Select Student" name="admission">
                <Select
                  disabled
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
                      {data?.student?.first_name} {data?.student?.last_name}
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
            <Col lg={10}>
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
                  onChange={handleAddOnsChange}
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
                        {data?.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {singleData?.data?.admission && (
          <Card className="p-4 shadow-lg rounded-lg">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">SL</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[...selectedFees, ...selectedAdditionalFee].map(
                  (data: any, index: number) => {
                    const isAdditional = selectedAdditionalFee.some(
                      (additional: any) => additional?.id === data?.id
                    );

                    return (
                      <tr key={index} className="border-b">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{data?.name}</td>
                        <td className="p-3">
                          {data?.one_time === true ? (
                            <Tag color="green">One Time</Tag>
                          ) : data?.one_time === false ? (
                            <Tag color="purple">Regular</Tag>
                          ) : (
                            isAdditional === true && (
                              <Tag color="blue">Additional</Tag>
                            )
                          )}
                        </td>
                        <td className="p-3 text-center">{data?.amount}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>

            <div className="flex justify-end gap-10 pt-4">
              <div className="flex flex-col gap-3">
                <Text strong className="text-lg text-red-600">
                  Total Due :
                </Text>
                <Text strong className="text-lg text-yellow-600">
                  Total Discount :
                </Text>
                <Text strong className="text-lg text-green-600">
                  Paid :
                </Text>
              </div>

              <div className="flex flex-col gap-3  ">
                <div className="flex justify-end">
                  <p className="border-red-600 border shadow-lg rounded text-center text-lg font-semibold w-24">
                    {finalDueAmount || 0}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <Form.Item
                    name="discount_type"
                    className="mb-0 w-[150px]"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Discount Type",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Discount Type"
                      value={discount.discountType}
                      onChange={(value) =>
                        setDiscount((prev) => ({
                          ...prev,
                          discountType: value,
                        }))
                      }
                    >
                      <Select.Option value="amount">Amount</Select.Option>
                      <Select.Option value="percent">Percent</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="discount_value" className="mb-0">
                    <Input
                      placeholder="000"
                      type="number"
                      value={discount.discountValue}
                      onChange={(e) =>
                        setDiscount((prev) => ({
                          ...prev,
                          discountValue: Number(e.target.value),
                        }))
                      }
                      className="border border-yellow-600 w-full md:w-[7rem] text-center rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      prefix={<TbCoinTaka />}
                    />
                  </Form.Item>
                </div>

                <div className="flex items-center gap-5">
                  <Form.Item
                    name="payment_method"
                    className="mb-0 w-[150px]"
                    rules={[
                      {
                        required: true,
                        message: "Please enter payment Method",
                      },
                    ]}
                  >
                    <CommonPaymentMethod />
                  </Form.Item>

                  <Form.Item name="paid_amount" className="mb-0">
                    <Input
                      type="number"
                      placeholder="000"
                      className="border border-green-600 w-full md:w-[7rem] text-center rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      prefix={<TbCoinTaka />}
                      onChange={(e) =>
                        setPaidAmount(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* {admission && (
          <Card className="p-4 shadow-lg rounded-lg">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">SL</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[...selectedFees, ...selectedAdditionalFee].map(
                  (data: any, index: number) => {
                    const isAdditional = selectedAdditionalFee.some(
                      (additional: any) => additional?.id === data?.id
                    );

                    return (
                      <tr key={index} className="border-b">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{data?.name}</td>
                        <td className="p-3">
                          {data?.one_time === true ? (
                            <Tag color="green">One Time</Tag>
                          ) : data?.one_time === false ? (
                            <Tag color="purple">Regular</Tag>
                          ) : (
                            isAdditional === true && (
                              <Tag color="blue">Additional</Tag>
                            )
                          )}
                        </td>
                        <td className="p-3 text-center">{data?.amount}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>

            <div className="flex justify-between gap-10 pt-4">
              <div className="flex flex-col gap-3">
                <Text strong className="text-lg text-red-600">
                  Total Due :
                </Text>
                <Text strong className="text-lg text-yellow-600">
                  Total Discount :
                </Text>
                <Text strong className="text-lg text-green-600">
                  Paid :
                </Text>
              </div>

              <div className="flex flex-col gap-3  ">
                <div className="flex justify-end">
                  <p className="border-red-600 bg-red-600 text-white px-6 text-lg font-semibold w-24">
                    {finalDueAmount || "0000"}
                  </p>
                </div>

                <div className="flex items-center gap-5">
                  <Form.Item
                    name="discount_type"
                    className="mb-0 w-[150px]"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Discount Type",
                      },
                    ]}
                    initialValue="amount"
                  >
                    <Select
                      placeholder="Select Discount Type"
                      defaultValue="amount"
                    >
                      <Select.Option value="amount">Amount</Select.Option>
                      <Select.Option value="percent">Percent</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="discount_value" className="mb-0">
                    <Input
                      placeholder="000"
                      type="number"
                      defaultValue={0}
                      className="border border-yellow-600 w-full md:w-[7rem] text-center rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      prefix={<TbCoinTaka />}
                    />
                  </Form.Item>
                </div>

                <div className="flex items-center gap-5">
                  <Form.Item
                    name="payment_method"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: "Please enter payment Method",
                      },
                    ]}
                  >
                    <CommonPaymentMethod />
                  </Form.Item>

                  <Form.Item name="paid_amount" className="mb-0">
                    <Input
                      type="number"
                      placeholder="000"
                      className="border border-green-600 w-full md:w-[7rem] rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      prefix={<TbCoinTaka />}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Card>
        )} */}
      </Form>
    </div>
  );
};

export default UpdateCollectFee;
