import { Badge, Button, Card, Col, Row, Select, Switch, Tooltip } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateFeesMutation } from "../api/feesEndpoints";
import { useState } from "react";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";
import { useGetSubjectsQuery } from "../../../../general settings/subjects/api/subjectsEndPoints";
import MultipleFeesItemForm from "./MultipleFeesItemForm";
import { useGetStudentsQuery } from "../../../../members/students/api/studentEndPoints";
import { debounce } from "lodash";
const { Option } = Select;

const guidelineContentBn = (
  <div>
    <h3 style={{ margin: "0 0 8px", fontWeight: "bold" }}>নির্দেশিকা</h3>
    <p style={{ margin: 0 }}>
      <strong>সকলের জন্য নিয়ম:</strong>
      এই নিয়মগুলো <em>সকল ছাত্রছাত্রী</em> এর জন্য প্রযোজ্য, তাদের শ্রেণি,
      বিষয় বা ব্যক্তিগত অবস্থা নির্বিশেষে। এটি তখন ব্যবহার করুন যখন নিয়মটি
      সর্বজনীনভাবে কার্যকর করতে চান।
    </p>
    <p style={{ margin: "8px 0 0" }}>
      <strong>শ্রেণি ভিত্তিক নিয়ম:</strong>
      এই নিয়মগুলো শুধুমাত্র <em>নির্বাচিত শ্রেণি</em> এর জন্য প্রযোজ্য হবে।
      উদাহরণস্বরূপ, যদি কোনও নিয়ম শুধুমাত্র দশম শ্রেণির জন্য হয়, তবে অন্য
      শ্রেণির ছাত্রছাত্রীদের উপর এটি প্রভাব ফেলবে না।
    </p>
    <p style={{ margin: "8px 0 0" }}>
      <strong>বিষয় ভিত্তিক নিয়ম:</strong>
      এই ধরনের নিয়ম <em>নির্দিষ্ট বিষয়ের</em> জন্য প্রযোজ্য। নিয়মগুলো
      শুধুমাত্র সেই বিষয়গুলোর উপর প্রযোজ্য হবে এবং সংশ্লিষ্ট ছাত্রছাত্রীদের
      জন্য কার্যকর হবে।
    </p>
    <p style={{ margin: "8px 0 0" }}>
      <em>মন্তব্য:</em> নির্বাচন করা টাইপ অনুযায়ী নিয়ম কার্যকর করার পরিধি এবং
      লক্ষ্য নির্ধারিত হয়।
    </p>
  </div>
);

const CreateFees = () => {
  const [search, setSearch] = useState("");
  // ee

  const [create, { isLoading, isSuccess }] = useCreateFeesMutation();
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: getStudent, isFetching } = useGetStudentsQuery({
    search: search,
  });
  const { data: subjectData, isLoading: subjectLoading } = useGetSubjectsQuery(
    {}
  );

  const [feeType, setFeeType] = useState("");

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          fee_type: feeType,
          fees: [""],
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item
              label="Select Fee Type"
              name="fee_type"
              rules={[
                { required: true, message: "Class Fee Type is required!" },
              ]}
            >
              <Select
                placeholder="Select Fee Type"
                className="w-full"
                onChange={(value) => setFeeType(value)}
              >
                {/* <Select.Option value="all">All</Select.Option> */}
                <Select.Option value="class">Class</Select.Option>
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="subject">Subjects</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {feeType === "class" && (
            <Col lg={8}>
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
          )}

          {feeType === "student" && (
            <Col lg={8}>
              <Form.Item
                label="Student"
                name="student"
                rules={[{ required: true, message: "Student is required!" }]}
              >
                <Select
                  mode="multiple"
                  className="w-full"
                  placeholder="Select Students"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(getStudent?.data?.results) &&
                    getStudent?.data?.results?.length === 0
                      ? "No Students found"
                      : null
                  }
                  // onChange={(value) => setSearch(value)}
                >
                  {getStudent?.data?.results?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data?.first_name} {data?.last_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {feeType === "subject" && (
            <Col lg={8}>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Subject is required!" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                  placeholder={
                    subjectLoading ? "Loading Subjects..." : "Please select"
                  }
                  options={
                    subjectData?.data?.results?.map((subjectItem: any) => ({
                      label: `${subjectItem.name} (${subjectItem?.grade_level?.name})`,
                      value: subjectItem.id,
                    })) || []
                  }
                />
              </Form.Item>
            </Col>
          )}
          <Col>
            <Form.Item label="Package" name="package" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col className="flex items-center justify-center">
            <Tooltip
              className="text-black"
              placement="bottom"
              color={"rgba( 35, 117, 245, 0.50 )"}
              title={guidelineContentBn}
            >
              <Button>Guideline</Button>
            </Tooltip>
          </Col>

          <Col lg={24}>
            <Badge.Ribbon text="Particulars" color="blue" placement="start">
              <Card className="pt-5">
                <MultipleFeesItemForm />
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateFees;
