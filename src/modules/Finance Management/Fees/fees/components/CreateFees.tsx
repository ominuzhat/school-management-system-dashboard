import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateFeesMutation } from "../api/feesEndpoints";
import { useState } from "react";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";
import { useGetStudentsQuery } from "../../../../members/students/api/studentEndPoints";
import { useGetSubjectsQuery } from "../../../../general settings/subjects/api/subjectsEndPoints";

const CreateFees = () => {
  const [create, { isLoading, isSuccess }] = useCreateFeesMutation();
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: studentData, isLoading: studentLoading } = useGetStudentsQuery(
    {}
  );
  const { data: subjectData, isLoading: subjectLoading } = useGetSubjectsQuery(
    {}
  );
  const [feeType, setFeeType] = useState("");

  console.log(feeType);

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    console.log("Form Values Submitted:", values);

    // Call create mutation
    create(formData);
  };

  const handleClassChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleStudentChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleSubjectChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          fee_type: feeType,
          description: "",
          class_teacher: null,
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
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="class">Class</Select.Option>
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="subjects">Subjects</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {(feeType === "all" || feeType === "class") && (
            <Col lg={8}>
              <Form.Item
                label="Class"
                name="grade_level"
                rules={[{ required: true, message: "Class is required!" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={
                    classLoading ? "Loading classes..." : "Please select"
                  }
                  onChange={handleClassChange}
                  options={
                    classData?.data?.map((classItem: any) => ({
                      label: classItem.name,
                      value: classItem.id,
                    })) || []
                  }
                />
              </Form.Item>
            </Col>
          )}

          {(feeType === "all" || feeType === "student") && (
            <Col lg={8}>
              <Form.Item
                label="Student"
                name="student"
                rules={[{ required: true, message: "Student is required!" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={
                    studentLoading ? "Loading Students..." : "Please select"
                  }
                  onChange={handleStudentChange}
                  options={
                    studentData?.data?.map((studentItem: any) => ({
                      label: studentItem.name,
                      value: studentItem.id,
                    })) || []
                  }
                />
              </Form.Item>
            </Col>
          )}

          {(feeType === "all" || feeType === "subject") && (
            <Col lg={8}>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Subject is required!" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={
                    subjectLoading ? "Loading Subjects..." : "Please select"
                  }
                  onChange={handleSubjectChange}
                  options={
                    subjectData?.data?.map((subjectItem: any) => ({
                      label: subjectItem.name,
                      value: subjectItem.id,
                    })) || []
                  }
                />
              </Form.Item>
            </Col>
          )}

          <Col lg={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateFees;
