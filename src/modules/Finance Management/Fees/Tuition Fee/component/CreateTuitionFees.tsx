import { Col, DatePicker, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateTuitionFeesMutation } from "../api/tuitionFeeEndPoints";
import { useGetAdmissionQuery } from "../../../../general settings/admission/api/admissionEndPoints";
import { debounce } from "lodash";
import { useState } from "react";
import dayjs from "dayjs";

const CreateTuitionFees = () => {
  const [search, setSearch] = useState("");
  const [create, { isLoading, isSuccess }] = useCreateTuitionFeesMutation();
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
  });

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      month: dayjs(values.month).format("YYYY-MM-DD"),
    };

    create(formattedValues);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item label="Select Admission" name="admission">
              <Select
                placeholder="Select Admission"
                className="w-full"
                allowClear
                showSearch
                onSearch={debounce(setSearch, 500)}
                filterOption={false}
                loading={isFetching}
                notFoundContent={
                  admissionData?.data?.results?.length === 0
                    ? "No Admission found"
                    : null
                }
              >
                {admissionData?.data?.results?.map((data: any) => (
                  <Select.Option key={data?.id} value={data?.id}>
                    {data?.student?.first_name} {data?.student?.last_name} (
                    {data?.grade_level})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<any>
              label="Date"
              name="month"
              rules={[{ required: true, message: "Date" }]}
              initialValue={dayjs()}
            >
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateTuitionFees;
