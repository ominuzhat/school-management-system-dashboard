import { Badge, Card, Col, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateFeesMutation } from "../api/feesEndpoints";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";
import MultipleFeesItemForm from "./MultipleFeesItemForm";
import { debounce } from "lodash";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";

const CreateFees = () => {
  // ee
  const [search, setSearch] = useState("");
  const [create, { isLoading, isSuccess }] = useCreateFeesMutation();
  const {
    data: classData,
    isLoading: classLoading,
    isFetching: isFetchingClasses,
  } = useGetClassesQuery({ search: search });

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
          fees: [""],
        }}
      >
        <Row gutter={[16, 16]}>
          {/* <Col lg={8}>
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
       
                <Select.Option value="class">Class</Select.Option>
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="subject">Subjects</Select.Option>
              </Select>
            </Form.Item>
          </Col> */}

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
                optionFilterProp="children"
                filterOption={false}
                onSearch={debounce(setSearch, 500)}
                loading={isFetchingClasses}
                notFoundContent={
                  isFetchingClasses ? <LoadingOutlined /> : "No Class found"
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

          {/* 
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
          )} */}

          {/* {feeType === "subject" && (
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
          )} */}
          {/* <Col>
            <Form.Item label="Package" name="package" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col> */}

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
