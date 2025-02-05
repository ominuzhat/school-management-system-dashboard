import {
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Form as AntForm,
  DatePickerProps,
  Card,
  Button,
  Tag,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../../../../general settings/admission/api/admissionEndPoints";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useCreateCollectFeesMutation } from "../api/collectFeeEndPoints";
import { CommonPaymentMethod } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useGetAdditionalFeesQuery } from "../../Additional Fee/api/additionalFeeEndPoints";

const CollectFeePage = () => {
  const [search, setSearch] = useState("");
  const [selectedFees, setSelectedFees] = useState([]);
  const [create, { isLoading, isSuccess }] = useCreateCollectFeesMutation();
  const { data: additionalData } = useGetAdditionalFeesQuery({});
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
  });
  const [form] = AntForm.useForm();

  const admission = AntForm.useWatch("admission", form);
  const dueAmount = AntForm.useWatch("due", form);
  console.log(dueAmount);
  console.log(admissionData?.data?.results);

  useEffect(() => {
    if (admission) {
      const foundAdmission = admissionData?.data?.results.find(
        (data: any) => data?.id === admission
      );

      if (admission) {
        form.setFieldsValue({
          class: foundAdmission?.grade_level,
          session: foundAdmission?.session?.name,
          due: foundAdmission?.due_amount,
        });
        setSelectedFees(foundAdmission?.fees);
      }
    }
  }, [admission, admissionData?.data?.results, form, setSelectedFees]);

  const onFinish = (values: any): void => {
    const results = {
      admission: values?.admission,
      add_ons: values?.add_ons,
      payment_method: values?.payment_method,
      paid_amount: values?.paid_amount,
      payment_date: dayjs(values?.payment_date).format("YYYY-MM-DD"),
      month: dayjs(values?.month).format("YYYY-MM-DD"),
    };

    create(results);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        layout="horizontal"
      >
        <Card>
          <Row gutter={[16, 16]}>
            <Col lg={6}>
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
                >
                  {admissionData?.data?.results?.map((data: any) => (
                    <Select.Option key={data?.id} value={data?.id}>
                      {data?.student?.first_name} {data?.student?.last_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item label="Class" name="class">
                <Input placeholder="Class" disabled />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item label="Session" name="session">
                <Input placeholder="Session" disabled />
              </Form.Item>
            </Col>{" "}
            {/* <Col lg={6}>
              <Form.Item label="Due" name="due">
                <Input placeholder="Due" disabled />
              </Form.Item>
            </Col> */}
            <Col lg={6}>
              <Form.Item label="Month" name="month">
                <DatePicker onChange={onChange} picker="month" />
              </Form.Item>
            </Col>{" "}
            <Col lg={6}>
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
                />
              </AntForm.Item>
            </Col>
            <Col lg={4}>
              <Form.Item label="Additional" name="add_ons">
                <Select
                  mode="multiple"
                  placeholder="Additional "
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
            <Col lg={4}>
              <Form.Item label="Payment Method" name="payment_method">
                <CommonPaymentMethod />
              </Form.Item>
            </Col>
            {/* <Col>
              <Form.Item label="Paid Amount" name="paid_amount">
                <Input placeholder="Paid Amount" type="number" />
              </Form.Item>
            </Col> */}
          </Row>
        </Card>

        <Card className="p-4">
          <table className="">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">SL</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedFees?.map((data: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{data?.name}</td>
                  <td className="p-2">
                    {data?.one_time ? (
                      <Tag color="purple">One Time</Tag>
                    ) : (
                      <Tag color="green">Monthly</Tag>
                    )}
                  </td>
                  <td className="p-2 text-center">{data?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full flex flex-col md:flex-row justify-between items-center  pt-3">
            <div></div> {/* Placeholder to maintain structure */}
            <div className="w-full md:w-[21rem] flex flex-col md:flex-row items-center justify-between">
              <p className="text-lg font-medium">Sub Total :</p>
              <span className="border px-6 py-1 text-lg font-semibold">
                5000
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center  pt-3">
            <div></div> {/* Placeholder to maintain structure */}
            <div className="w-full md:w-[21rem] flex flex-col md:flex-row items-center justify-between">
              <p className="text-lg font-medium text-red-600">Total Due :</p>
              <Input
                name="due"
                type="number"
                placeholder="000"
                disabled
                className="border rounded-none border-green-600 p-2 w-full md:w-[5.5rem] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/* <span className="border border-red-600 px-6 py-1 text-lg font-semibold">
                {dueAmount}
              </span> */}
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center pt-3">
            <div></div>

            <div className="w-full md:w-[21rem] flex flex-col md:flex-row items-center justify-between gap-4">
              <label className="text-lg font-medium">Paid Amount:</label>
              <Input
                name="paid_amount"
                type="number"
                placeholder="000"
                className="border rounded-none border-green-600 p-2 w-full md:w-[5.5rem] focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* <span className="border border-green-600 px-6 py-2 text-lg font-semibold rounded-md bg-green-50 text-green-700">
                $5000
              </span> */}
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default CollectFeePage;
