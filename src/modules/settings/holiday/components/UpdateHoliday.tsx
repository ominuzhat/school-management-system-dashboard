import {
  Col,
  Input,
  Row,
  Select,
  DatePicker,
  Form as AntForm,
  Card,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import {
  useGetSingleHolidayQuery,
  useUpdateHolidayMutation,
} from "../api/holidayEndPoints";
import { useGetAdmissionSessionQuery } from "../../../general settings/admission session/api/admissionSessionEndPoints";
import { useGetClassesBigListQuery } from "../../../general settings/classes/api/classesEndPoints";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";
import { useGetEmployeeQuery } from "../../../members/employees/api/employeeEndPoints";
import { IClasses } from "../../../general settings/classes/type/classesType";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const UpdateHoliday = ({ record }: { record: number }) => {
  const [form] = AntForm.useForm();

  // State for search
  const [search, setSearch] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchEmployee, setSearchEmployee] = useState("");

  const eventFor = AntForm.useWatch("event_for", form);
  const classList = AntForm.useWatch("grade_levels", form);

  // Queries
  const { data: singleData } = useGetSingleHolidayQuery(Number(record));
  const [update, { isLoading, isSuccess }] = useUpdateHolidayMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery<any>({
    status: "open",
  });
  const { data: classData, isFetching: isFetchingClasses } =
    useGetClassesBigListQuery<any>({});
  const { data: studentData, isFetching: isFetchingStudents } =
    useGetStudentsQuery({ search, is_active: true });
  const { data: teacherData, isFetching: isFetchingTeacher } =
    useGetTeacherQuery({ search: searchTeacher, is_active: true });
  const { data: employeeData, isFetching: isFetchingEmployee } =
    useGetEmployeeQuery({ search: searchEmployee, is_active: true });

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        ...singleData.data,
        session: singleData.data.session?.id,
        specific_students: singleData.data.specific_students?.map(
          (s: any) => s?.id
        ),
        specific_teachers: singleData.data.specific_teachers?.map(
          (s: any) => s?.id
        ),
        specific_employees: singleData.data.specific_employees?.map(
          (s: any) => s?.id
        ),
        start_date: singleData.data.start_date
          ? dayjs(singleData.data.start_date)
          : null,
        end_date: singleData.data.end_date
          ? dayjs(singleData.data.end_date)
          : null,
        publish_date: singleData.data.publish_date
          ? dayjs(singleData.data.publish_date)
          : null,
        expiry_date: singleData.data.expiry_date
          ? dayjs(singleData.data.expiry_date)
          : null,
      });
    }
  }, [singleData, form]);

  const selectedClassData = Array.isArray(classList)
    ? classData?.data?.filter((cls: IClasses) => classList.includes(cls.id))
    : [];

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
    ?.filter(Boolean);

  const onFinish = (values: any) => {
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

    // Conditional field removal based on target audience
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
        delete payload.grade_levels;
        delete payload.sections;
        delete payload.specific_students;
        delete payload.specific_teachers;
        delete payload.specific_employees;
        break;
      default:
        break;
    }

    update({ id: record, data: payload });
  };

  return (
    <Card bordered={false}>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[24, 16]}>
          {/* Event Type */}
          <Col xs={24} lg={8}>
            <Form.Item
              name="event_type"
              label="Event Type"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Event Type">
                {["holiday", "event", "other"].map((type) => (
                  <Option key={type} value={type}>
                    {type.toUpperCase()}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Name */}
          <Col xs={24} lg={8}>
            <Form.Item
              name="name"
              label="Event / Holiday Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter Event / Holiday Title" />
            </Form.Item>
          </Col>

          {/* Session */}
          <Col xs={24} lg={8}>
            <Form.Item
              name="session"
              label="Session"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Session">
                {sessionData?.data?.map((s: any) => (
                  <Option key={s.id} value={s.id}>
                    {s.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Target Audience */}
          <Col xs={24} lg={8}>
            <Form.Item
              name="event_for"
              label="Target Audience"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Audience">
                <Option value="grade_levels">Classes</Option>
                <Option value="students">Students</Option>
                <Option value="teachers">Teachers</Option>
                <Option value="employees">Employees</Option>
                <Option value="students_employees">Students & Employees</Option>
                <Option value="students_teachers">Students & Teachers</Option>
                <Option value="employees_teachers">Employees & Teachers</Option>
                <Option value="all">Everyone</Option>
                <Option value="all_students">All Students</Option>
                <Option value="all_teachers">All Teachers</Option>
                <Option value="all_employees">All Employees</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Conditional Class/Section/Student/Teacher/Employee Inputs */}
          {eventFor === "grade_levels" && (
            <>
              <Col xs={24} lg={8}>
                <Form.Item
                  name="grade_levels"
                  label="Class"
                  rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select Classes"
                    loading={isFetchingClasses}
                  >
                    {classData?.data?.map((cls: any) => (
                      <Option key={cls.id} value={cls.id}>
                        {cls.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {extractedSections?.length > 0 && (
                <Col xs={24} lg={8}>
                  <Form.Item
                    name="sections"
                    label="Sections"
                    rules={[{ required: true }]}
                  >
                    <Select mode="multiple" placeholder="Select Sections">
                      {extractedSections.map((sec: any) => (
                        <Option key={sec.id} value={sec.id}>
                          {sec.name} ({sec.className}) - Capacity:{" "}
                          {sec.capacity}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </>
          )}

          {/* Dynamic Selections */}
          {["students", "students_employees", "students_teachers"].includes(
            eventFor
          ) && (
            <Col xs={24} lg={8}>
              <Form.Item
                name="specific_students"
                label="Students"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Search Student"
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
                  {studentData?.data?.results?.map((s: any) => (
                    <Option key={s.id} value={s.id}>
                      {s.first_name} {s.last_name} - ({s.user?.username || "-"})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {["teachers", "students_teachers", "employees_teachers"].includes(
            eventFor
          ) && (
            <Col xs={24} lg={8}>
              <Form.Item
                name="specific_teachers"
                label="Teachers"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Search Teacher"
                  filterOption={false}
                  onSearch={debounce(setSearchTeacher, 500)}
                  loading={isFetchingTeacher}
                  notFoundContent={
                    isFetchingTeacher ? (
                      <LoadingOutlined />
                    ) : (
                      "No teachers found"
                    )
                  }
                >
                  {teacherData?.data?.results?.map((t: any) => (
                    <Option key={t.id} value={t.id}>
                      {t.first_name} {t.last_name} - ({t.user?.username || "-"})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {["employees", "students_employees", "employees_teachers"].includes(
            eventFor
          ) && (
            <Col xs={24} lg={8}>
              <Form.Item
                name="specific_employees"
                label="Employees"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Search Employee"
                  filterOption={false}
                  onSearch={debounce(setSearchEmployee, 500)}
                  loading={isFetchingEmployee}
                  notFoundContent={
                    isFetchingEmployee ? (
                      <LoadingOutlined />
                    ) : (
                      "No employees found"
                    )
                  }
                >
                  {employeeData?.data?.results?.map((e: any) => (
                    <Option key={e.id} value={e.id}>
                      {e.first_name} {e.last_name} - ({e.user?.username || "-"})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {/* Dates */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="start_date"
              label="Start Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              name="end_date"
              label="End Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col xs={24}>
            <Form.Item name="description" label="Description">
              <TextArea rows={4} placeholder="Write description..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default UpdateHoliday;
