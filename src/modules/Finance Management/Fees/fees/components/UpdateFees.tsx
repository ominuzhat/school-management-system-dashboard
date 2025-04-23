/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, Card, Col, Form, Row, Select, Switch } from "antd";
import { useState, useEffect } from "react";
import {
  useGetSingleFeesQuery,
  useUpdateFeesMutation,
} from "../api/feesEndpoints";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";
import { useGetStudentsQuery } from "../../../../members/students/api/studentEndPoints";
import { useGetSubjectsQuery } from "../../../../general settings/subjects/api/subjectsEndPoints";
import MultipleFeesItemForm from "./MultipleFeesItemForm";

const UpdateFees = ({ record }: { record: any }) => {
  const { data: feeData } = useGetSingleFeesQuery(Number(record));
  const [updateFees, { isLoading }] = useUpdateFeesMutation();

  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: studentData, isLoading: studentLoading } = useGetStudentsQuery(
    {}
  );
  const { data: subjectData, isLoading: subjectLoading } = useGetSubjectsQuery(
    {}
  );

  const [feeType, setFeeType] = useState("");

  useEffect(() => {
    if (feeData) {
      form.setFieldsValue({
        fee_type: feeData.data?.fee_type,
        package: feeData.data?.package,
        grade_level: feeData?.data?.grade_level?.map((level: any) => level.id),
        student: feeData?.data?.student?.map((level: any) => level?.id),
        subject: feeData?.data?.subject?.map((level: any) => level?.id),
        fees: feeData.data?.fees,
      });
      setFeeType(feeData?.data?.fee_type);
    }
  }, [feeData]);

  const [form] = Form.useForm();

  const onFinish = (values: any): void => {
    console.log(values, "result");

    updateFees({ id: record, data: { ...values } });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          fee_type: feeType,
          fees: feeData?.data?.fees || [""],
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
                    (Array.isArray(classData?.data) &&
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
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                  placeholder={
                    studentLoading ? "Loading Students..." : "Please select"
                  }
                  options={
                    studentData?.data?.results?.map((studentItem: any) => ({
                      label: studentItem.user.username,
                      value: studentItem.id,
                    })) || []
                  }
                />
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
                      label: subjectItem?.name,
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

          <Col lg={24}>
            <Badge.Ribbon text="Particulars" color="blue" placement="start">
              <Card className="pt-5">
                <MultipleFeesItemForm />
              </Card>
            </Badge.Ribbon>
          </Col>

          <Col className="flex items-center justify-center">
            <Button htmlType="submit" loading={isLoading}>
              Update Fees
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateFees;
