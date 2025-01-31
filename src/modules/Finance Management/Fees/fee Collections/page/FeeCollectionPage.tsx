import { Col, DatePicker, Input, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../../../../general settings/admission/api/admissionEndPoints";
import { debounce } from "lodash";
import { useState } from "react";
import dayjs from "dayjs";
import { useCreateTuitionFeesMutation } from "../../Tuition Fee/api/tuitionFeeEndPoints";

const FeeCollectionPage = () => {
  const [search, setSearch] = useState("");
  const [create, { isLoading, isSuccess }] = useCreateTuitionFeesMutation();
  const { data: admissionData, isFetching } = useGetAdmissionQuery({
    search: search,
  });

  console.log(admissionData?.data);

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
            <Form.Item label="Select Student" name="admission">
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
                    {data?.student?.first_name} {data?.student?.last_name} (
                    {data?.grade_level})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Class" name="class">
              <Input placeholder="Class" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Section" name="Section">
              <Input placeholder="Section" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Roll" name="Roll">
              <Input placeholder="Roll" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Shift" name="Shift">
              <Input placeholder="Shift" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Due" name="Due">
              <Input placeholder="Due" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Tuition Fee" name="Tuition Fee">
              <Input placeholder="Tuition Fee" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Picnic" name="Picnic">
              <Input placeholder="Picnic" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Due" name="Due">
              <Input placeholder="Due" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Due" name="Due">
              <Input placeholder="Due" />
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

export default FeeCollectionPage;
