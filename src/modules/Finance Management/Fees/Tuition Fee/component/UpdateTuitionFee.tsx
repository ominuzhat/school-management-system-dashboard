import { Col, DatePicker, Row, Select, Form, Button } from "antd";
import {
  useGetTuitionSingleFeesQuery,
  useUpdateTuitionFeesMutation,
} from "../api/tuitionFeeEndPoints";
import { useGetAdmissionQuery } from "../../../../general settings/admission/api/admissionEndPoints";
import { debounce } from "lodash";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ICreateTuitionFee } from "../type/tuitionFeeTypes";

const UpdateTuitionFee = ({ record }: any) => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [update, { isLoading }] = useUpdateTuitionFeesMutation();
  const { data: singleData } = useGetTuitionSingleFeesQuery(Number(record));

  const { data: admissionData, isFetching: isFetchingAdmissions } =
    useGetAdmissionQuery({
      search: search,
    });

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        admission: singleData?.data?.admission?.id,
        month: dayjs(singleData?.data?.month),
      });
    }
  }, [form, singleData]);

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      month: dayjs(values.month).format("YYYY-MM-DD"),
    };

    update({ id: record, data: formattedValues });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateTuitionFee>
              label="Select Admission"
              name="admission"
            >
              <Select
                placeholder="Select Admission"
                className="w-full"
                allowClear
                showSearch
                onSearch={debounce(setSearch, 500)}
                filterOption={false}
                loading={isFetchingAdmissions}
                notFoundContent={
                  admissionData?.data?.results?.length === 0
                    ? "No Admission found"
                    : null
                }
              >
                {admissionData?.data?.results?.map((data: any) => (
                  <Select.Option key={data.id} value={data.id}>
                    {data?.student?.first_name} {data?.student?.last_name} (
                    {data?.grade_level})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateTuitionFee> label="Date" name="month">
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Class
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateTuitionFee;
