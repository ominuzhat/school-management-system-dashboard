import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateExamMutation } from "../api/examEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { RangePickerComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Moment } from "moment";
import { useState } from "react";

const { Option } = Select;

interface PeriodDate {
  start_date: string;
  end_date: string;
}

const CreateExam = () => {
  const [examDate, setExamDate] = useState<PeriodDate>({
    start_date: "",
    end_date: "",
  });
  const [create, { isLoading, isSuccess }] = useCreateExamMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const onFinish = (values: any): void => {
    create(values);
  };

  const handleRangeChange = (dates: [Moment | null, Moment | null] | null) => {
    const start = dates?.[0]?.format("YYYY-MM-DD") || "";
    const end = dates?.[1]?.format("YYYY-MM-DD") || "";
    setExamDate({ start_date: start, end_date: end });
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={4}>
            <Form.Item
              label="Exam Name"
              name="name"
              rules={[{ required: true, message: "Exam Name is required!" }]}
            >
              <Input placeholder="Enter Exam Name" />
            </Form.Item>
          </Col>
          <Col lg={4}>
            <Form.Item label="Select Session" name="session">
              <Select placeholder="Select Session" className="w-full">
                {Array.isArray(sessionData?.data) &&
                  sessionData?.data?.map((session: any) => (
                    <Select.Option key={session.id} value={session.id}>
                      {session?.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={4}>
            <Form.Item
              label="Class"
              name="grade_level"
              rules={[{ required: true, message: "Class is required!" }]}
            >
              <Select
                mode="multiple"
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder={
                  classLoading ? "Loading classes..." : "Please select"
                }
                options={
                  (Array?.isArray(classData?.data) &&
                    classData?.data?.map((classItem: any) => ({
                      label: classItem.name,
                      value: classItem.id,
                    }))) ||
                  []
                }
              />
            </Form.Item>
          </Col>

          <Col lg={4}>
            <Form.Item
              label="Section"
              name="section"
              rules={[{ required: true, message: "Section" }]}
            >
              <Select
                mode="multiple"
                className="w-full"
                placeholder="Select Section"
                allowClear
                showSearch
              >
                {Array.isArray(sectionData?.data) &&
                  sectionData?.data?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data?.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              label="Exam Date"
              name=""
              rules={[
                {
                  required: true,
                  message: "Choose  date",
                },
              ]}
            >
              <RangePickerComponent
                onChange={handleRangeChange}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>

          <Col lg={6}>
            <Form.Item label="Comment" name="comment">
              <Input placeholder="comment" />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateExam;
