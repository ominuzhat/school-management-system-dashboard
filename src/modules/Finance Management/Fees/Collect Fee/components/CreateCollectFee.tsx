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
import { useCreateCollectFeesMutation } from "../api/collectFeeEndPoints";
import { useGetAdditionalFeesQuery } from "../../Additional Fee/api/additionalFeeEndPoints";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import { useGetAccountQuery } from "../../../Accounts/account/api/accountEndPoints";

const { Title, Text } = Typography;

const CreateCollectFee = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState<any>({});
  const [finalDueAmount, setFinalDueAmount] = useState<number | null>(null);
  const [selectedAdditionalFee, setSelectedAdditionalFee] = useState<any[]>([]);
  const [create, { isLoading, isSuccess }] = useCreateCollectFeesMutation();
  const { data: additionalData } = useGetAdditionalFeesQuery({});
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
    status: "approved",
  });
  const [form] = AntForm.useForm();
  const { data: accountList } = useGetAccountQuery({});

  const admission = AntForm.useWatch("admission", form);
  const addOns = AntForm.useWatch("add_ons", form);
  const paidAmount = AntForm.useWatch("paid_amount", form);
  const discountType = AntForm.useWatch("discount_type", form);
  const discountAmount = AntForm.useWatch("discount_value", form);

  const totalAmountOfAdditionalFees = useMemo(() => {
    return Array.isArray(selectedAdditionalFee)
      ? selectedAdditionalFee.reduce((sum, data: any) => sum + data?.amount, 0)
      : 0;
  }, [selectedAdditionalFee]);

  useEffect(() => {
    if (admission) {
      const foundAdmission: any = admissionData?.data?.results.find(
        (data: any) => data?.id === admission
      );

      // Calculate the total due amount including additional fees
      const totalDueAmount =
        (selectedStudent?.due_amount || 0) + totalAmountOfAdditionalFees;

      // Calculate the discounted amount based on the discount type
      let discountedAmount = 0;
      if (discountType === "amount") {
        discountedAmount = discountAmount || 0;
      } else if (discountType === "percent") {
        discountedAmount = (totalDueAmount * (discountAmount || 0)) / 100;
      }

      // Calculate the final due amount after discount and paid amount
      const calculatedDueAmount =
        totalDueAmount - discountedAmount - (paidAmount || 0);

      // Ensure the final due amount is not negative
      setFinalDueAmount(Math.max(calculatedDueAmount, 0));

      const foundAdditionalData: any =
        Array.isArray(additionalData?.data) &&
        additionalData?.data?.filter((data: any) => addOns?.includes(data?.id));

      if (foundAdmission) {
        form.setFieldsValue({
          class: foundAdmission?.grade_level,
          session: foundAdmission?.session?.name,
        });
        setSelectedFees(foundAdmission?.fees || []);
        setSelectedStudent(foundAdmission);
        setSelectedAdditionalFee(foundAdditionalData || []);
      }
    }
  }, [
    addOns,
    additionalData?.data,
    admission,
    admissionData?.data?.results,
    discountAmount,
    discountType,
    form,
    paidAmount,
    selectedStudent?.due_amount,
    totalAmountOfAdditionalFees,
  ]);
  const onFinish = (values: any): void => {
    const results = {
      admission: values?.admission,
      add_ons: values?.add_ons,
      discount_type: values?.discount_type,
      discount_value: values?.discount_value,
      payment_method: "cash",
      account: values?.account,
      paid_amount: values?.paid_amount,
      payment_date: dayjs(values?.payment_date).format("YYYY-MM-DD"),
      month: dayjs(values?.month).format("YYYY-MM-DD"),
    };

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
      <div className="text-center  pb-5">
        <Title level={3} className="">
          Collect Fees
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
        buttonLabel="Collect Fee"
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

            {/* <Col lg={6}>
              <Form.Item
                label="Discount Type"
                name="discount_type"
                initialValue="amount"
              >
                <Select
                  placeholder="Select Discount Type"
                  className="w-full"
                  defaultValue="amount"
                >
                  <Select.Option value="amount">Amount</Select.Option>
                  <Select.Option value="percent">Percent</Select.Option>
                </Select>
              </Form.Item>
            </Col> */}

            {/* <Col lg={6}>
              <Form.Item
                label="Discount Value"
                name="discount_value"
                initialValue={0}
              >
                <Input
                  placeholder="Discount Value"
                  defaultValue={0}
                  type="number"
                />
              </Form.Item>
            </Col> */}

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
                rules={[{ required: true, message: "Account  is required!" }]}
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

        {admission && (
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

                <div className="flex justify-end">
                  {/* <Form.Item
                    name="payment_method"
                    className="mb-0 w-[150px]"
              
                  >
                    <CommonPaymentMethod />
                  </Form.Item> */}

                  <Form.Item name="paid_amount" className="mb-0">
                    <Input
                      type="number"
                      placeholder="000"
                      className="border border-green-600 w-full md:w-[7rem] text-center rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      prefix={<TbCoinTaka />}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Form>
    </div>
  );
};

export default CreateCollectFee;
