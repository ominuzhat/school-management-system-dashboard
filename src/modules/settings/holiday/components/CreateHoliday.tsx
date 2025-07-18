import {
  Col,
  Input,
  Row,
  Select,
  DatePicker,
  Card,
  Form as AntForm,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useCreateHolidayMutation } from "../api/holidayEndPoints";
import { capitalize, debounce } from "lodash";
import { useGetAdmissionSessionQuery } from "../../../general settings/admission session/api/admissionSessionEndPoints";
import { useGetClassesBigListQuery } from "../../../general settings/classes/api/classesEndPoints";
import { IClasses } from "../../../general settings/classes/type/classesType";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";
import { useGetEmployeeQuery } from "../../../members/employees/api/employeeEndPoints";

const { Option } = Select;

const CreateHoliday = () => {
  const [form] = AntForm.useForm();
  const [search, setSearch] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");

  const targetAudience = AntForm.useWatch("event_for", form);
  const classList = AntForm.useWatch("grade_levels", form);

  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isFetching: isFetchingClasses } =
    useGetClassesBigListQuery<any>({});
  const [create, { isLoading, isSuccess }] = useCreateHolidayMutation();
  const { data: studentData, isFetching: isFetchingStudents } =
    useGetStudentsQuery({
      search: search,
      is_active: true,
    });
  const { data: teacherData, isFetching: isFetchingTeacher } =
    useGetTeacherQuery({
      search: searchTeacher,
      is_active: true,
    });
  const { data: employeeData, isFetching: isFetchingEmployee } =
    useGetEmployeeQuery({
      search: searchEmployee,
      is_active: true,
    });

  // Get selected class details from classData
  const selectedClassData = Array.isArray(classList)
    ? classData?.data?.filter((cls: IClasses) => classList.includes(cls.id))
    : [];

  // Extract unique sections from selected class shifts
  const extractedSections = selectedClassData
    ?.flatMap((cls: any) =>
      cls.shifts?.flatMap((shift: any) =>
        shift.sections?.map((s: any) => ({
          id: s.section.id,
          name: s.section.name,
          capacity: s.section.capacity,
          className: cls.name,
        }))
      )
    )
    ?.filter(Boolean); // Remove undefined/null

  const onFinish = (values: any): void => {
    const payload: any = {
      ...values,
      publish_date: values.publish_date
        ? dayjs(values.publish_date).format("YYYY-MM-DD")
        : null,
      expiry_date: values.expiry_date
        ? dayjs(values.expiry_date).format("YYYY-MM-DD")
        : null,
      start_date: values.start_date
        ? dayjs(values.start_date).format("YYYY-MM-DD")
        : null,
      end_date: values.end_date
        ? dayjs(values.end_date).format("YYYY-MM-DD")
        : null,
    };

    // Clean up values not required based on target audience
    switch (values.event_for) {
      case "grade_levels":
        payload.grade_levels = values.grade_levels || [];
        payload.sections = values.sections || [];
        delete payload.specific_students;
        delete payload.specific_teachers;
        delete payload.specific_employees;
        break;

      case "students":
        payload.specific_students = values.specific_students || [];
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_teachers;
        delete payload.specific_employees;
        break;

      case "teachers":
        payload.specific_teachers = values.specific_teachers || [];
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_students;
        delete payload.specific_employees;
        break;

      case "employees":
        payload.specific_employees = values.specific_employees || [];
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_students;
        delete payload.specific_teachers;
        break;

      case "students_employees":
        payload.specific_students = values.specific_students || [];
        payload.specific_employees = values.specific_employees || [];
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_teachers;
        break;

      case "students_teachers":
        payload.specific_students = values.specific_students || [];
        payload.specific_teachers = values.specific_teachers || [];
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_employees;
        break;

      case "employees_teachers":
        payload.specific_employees = values.specific_employees || [];
        payload.specific_teachers = values.specific_teachers || [];
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_students;
        break;

      case "all":
      case "all_students":
      case "all_teachers":
      case "all_employees":
        // Remove all specific targets
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_students;
        delete payload.specific_teachers;
        delete payload.specific_employees;
        break;

      default:
        break;
    }

    // Send to API
    create(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  return (
    <Card bordered={false}>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{}}
      >
        <Row gutter={[24, 16]}>
          {/* Event Type */}
          <Col xs={24} lg={8}>
            <Form.Item
              label="Event Type"
              name="event_type"
              rules={[{ required: true, message: "Event Type is required!" }]}
            >
              <Select placeholder="Select Event Type">
                {(["holiday", "event", "other"] as any[]).map((audience) => (
                  <Option key={audience} value={audience}>
                    {capitalize(audience)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Title */}
          <Col xs={24} lg={8}>
            <Form.Item
              label="Event / Holiday Name"
              name="name"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input placeholder="Enter Event / Holiday Title" />
            </Form.Item>
          </Col>

          {/* session */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              label="Select Session"
              name="session"
              rules={[{ required: true, message: "Session is required!" }]}
            >
              <Select placeholder="Select Session" className="w-full">
                {Array.isArray(sessionData?.data) &&
                  sessionData?.data.map((session: any) => (
                    <Select.Option key={session.id} value={session.id}>
                      {session.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Target Audience */}
          <Col xs={24} lg={8}>
            <Form.Item
              label="Target Audience"
              name="event_for"
              rules={[
                { required: true, message: "Target Audience is required!" },
              ]}
            >
              <Select placeholder="Select Target Audience">
                <Option value="grade_levels">Classes</Option>
                <Option value="students">Students</Option>
                <Option value="employees">Employees</Option>
                <Option value="teachers">Teachers</Option>
                <Option value="students_employees">
                  Students and Employees
                </Option>
                <Option value="students_teachers">Students and Teachers</Option>
                <Option value="employees_teachers">
                  Employees and Teachers
                </Option>
                <Option value="all">Everyone</Option>
                <Option value="all_students">All Students</Option>
                <Option value="all_teachers">All Teachers</Option>
                <Option value="all_employees">All Employees</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Class Selection */}
          {/* {targetAudience &&
            ["students", "students_employees", "students_teachers"].some(
              (aud) => targetAudience.includes(aud)
            ) && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Class"
                  name="grade_levels"
                  rules={[{ required: true, message: "Please select a class" }]}
                >
                  <Select
                    loading={isFetchingClasses}
                    placeholder="Select class"
                    mode="multiple"
                  >
                    {Array.isArray(classData?.data) &&
                      classData?.data?.map((classItem: IClasses) => (
                        <Option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            )} */}
          {targetAudience === "grade_levels" && (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item
                label="Class"
                name="grade_levels"
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select
                  loading={isFetchingClasses}
                  placeholder="Select class"
                  mode="multiple"
                >
                  {Array.isArray(classData?.data) &&
                    classData?.data?.map((classItem: IClasses) => (
                      <Option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {/* Sections */}
          {classList && extractedSections?.length > 0 && (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item
                label="Section"
                name="sections"
                rules={[{ required: true, message: "Please select a section" }]}
              >
                <Select placeholder="Select section" mode="multiple">
                  {extractedSections.map((section: any) => (
                    <Option key={section.id} value={section.id}>
                      {section.name} ({section.className} - Capacity:{" "}
                      {section.capacity})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {/* Students Selection */}
          {targetAudience &&
            !["all", "all_students", "all_teachers", "all_employees"].includes(
              targetAudience
            ) &&
            ["students", "students_employees", "students_teachers"].includes(
              targetAudience
            ) && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Students"
                  name="specific_students"
                  rules={[
                    { required: true, message: "Please select a student" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Search student by name"
                    optionFilterProp="children"
                    filterOption={false}
                    onSearch={debounce(setSearch, 500)}
                    loading={isFetchingStudents}
                    notFoundContent={
                      isFetchingStudents ? (
                        <LoadingOutlined />
                      ) : (
                        "No students found"
                      )
                    }
                  >
                    {studentData?.data?.results?.map((student: any) => (
                      <Option key={student.id} value={student.id}>
                        {`${student.first_name} ${student.last_name} - (${
                          student?.user?.username || "N/A"
                        }) - ${student?.current_grade_level?.name} (${
                          student?.current_section?.name
                        })`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

          {/* teachers Selection */}
          {targetAudience &&
            !["all", "all_students", "all_teachers", "all_employees"].includes(
              targetAudience
            ) &&
            ["teachers", "students_teachers", "employees_teachers"].includes(
              targetAudience
            ) && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Teachers"
                  name="specific_teachers"
                  rules={[
                    { required: true, message: "Please select a Teachers" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Search Teachers by name"
                    optionFilterProp="children"
                    filterOption={false}
                    onSearch={debounce(setSearchTeacher, 500)}
                    loading={isFetchingTeacher}
                    notFoundContent={
                      isFetchingTeacher ? (
                        <LoadingOutlined />
                      ) : (
                        "No Teachers found"
                      )
                    }
                  >
                    {teacherData?.data?.results?.map((teacher: any) => (
                      <Option key={teacher.id} value={teacher.id}>
                        {`${teacher.first_name} ${teacher.last_name} - (${
                          teacher?.user?.username || "N/A"
                        })`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

          {/* Employee Selection */}
          {targetAudience &&
            !["all", "all_students", "all_teachers", "all_employees"].includes(
              targetAudience
            ) &&
            ["employees", "students_employees", "employees_teachers"].includes(
              targetAudience
            ) && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Employee"
                  name="specific_employees"
                  rules={[
                    { required: true, message: "Please select a Employee" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Search Employee by name"
                    optionFilterProp="children"
                    filterOption={false}
                    onSearch={debounce(setSearchEmployee, 500)}
                    loading={isFetchingEmployee}
                    notFoundContent={
                      isFetchingEmployee ? (
                        <LoadingOutlined />
                      ) : (
                        "No Employee found"
                      )
                    }
                  >
                    {employeeData?.data?.results?.map((employee: any) => (
                      <Option key={employee.id} value={employee.id}>
                        {`${employee.first_name} ${employee.last_name} - (${
                          employee?.user?.username || "N/A"
                        })`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

          {/* Start Date */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* End Date */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="End Date"
              name="end_date"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Rich Text Editor */}
          <Col xs={24}>
            <Form.Item label="Description" name="description">
              <TextArea placeholder="Description" />
            </Form.Item>
          </Col>
          {/* _____________________________ */}
        </Row>
      </Form>
    </Card>
  );
};

export default CreateHoliday;
