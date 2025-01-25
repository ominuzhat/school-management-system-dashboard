import {
  Button,
  Card,
  Col,
  DatePicker,
  notification,
  Row,
  Select,
  Table,
} from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import Iconify from "../../../../../common/IconifyConfig/IconifyConfig";
import { useState } from "react";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import {
  useCreateStudentAttendanceMutation,
  useLazyGetMarkStudentAttendanceQuery,
} from "../api/studentAttendanceEndPoints";
import useMarkStudentsAttendanceColumns from "../utils/MarkStudentsAttendanceColumn";
import { Link } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const { Option } = Select;

const MarkStudentsAttendance = () => {
  const [result, setResult] = useState<Record<string, any> | null>(null); // Use a type that matches your expected result
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    grade_level: undefined,
    session: undefined,
  });
  const [create] = useCreateStudentAttendanceMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const { data: classData } = useGetClassesQuery({});
  const [fetchAdmissionData, { data: attendanceData, isLoading }] =
    useLazyGetMarkStudentAttendanceQuery({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    if (formData.session && formData.grade_level) {
      fetchAdmissionData(formData);
    } else {
      notification.open({
        message: "Alert",
        description: "Select Class and Session First",
      });
    }
  };

  const handleAttendanceSubmit = () => {
    if (result) {
      create(result as any);
    } else {
      notification.error({
        message: "Error",
        description:
          "Attendance data is missing. Please check before submitting.",
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Link to="/attendance/mark-student-attendance-list">
        <p
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#1890ff",
            padding: "8px 16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          className="flex items-center gap-2  w-64"
        >
          View List of Attendance <MdOutlineArrowRightAlt className="text-xl" />
        </p>
      </Link>
      <Card>
        <Row justify="space-between" align="middle" gutter={[10, 10]}>
          <Col lg={20}>
            <Row gutter={[16, 16]}>
              <Col lg={4} xs={24}>
                <DatePicker
                  className="w-full"
                  defaultValue={dayjs()}
                  format="YYYY-MM-DD"
                  onChange={(date) =>
                    handleChange(
                      "date",
                      date ? dayjs(date).format("YYYY-MM-DD") : null
                    )
                  }
                  // disabledDate={(current) => {
                  //   return current && current > dayjs().endOf("day");
                  // }}
                />
              </Col>
              <Col lg={4} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  onChange={(value) => handleChange("grade_level", value)}
                >
                  {Array.isArray(classData?.data) &&
                    classData?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data.name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col lg={4} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Session"
                  allowClear
                  showSearch
                  onChange={(value) => handleChange("session", value)}
                >
                  {Array.isArray(sessionData?.data) &&
                    sessionData?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>
            </Row>
          </Col>

          <Col lg={4} xs={24}>
            <Button
              type="primary"
              htmlType="button"
              icon={<Iconify name="iconamoon:send-fill" />}
              className="w-full"
              onClick={handleSearch}
            >
              Search Students
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          loading={isLoading}
          dataSource={attendanceData?.data?.records || []}
          columns={useMarkStudentsAttendanceColumns({
            attendanceData: (attendanceData?.data?.records as any) || [],
            gradeLevel: (attendanceData?.data?.grade_level as any) || {},
            session: (attendanceData?.data?.session as any) || {},
            formData,
            setResult,
          })}
          pagination={false}
          rowKey="id"
        />
        <Button
          className="mt-5"
          type="primary"
          onClick={handleAttendanceSubmit}
        >
          Submit Attendance
        </Button>
      </Card>
    </div>
  );
};

export default MarkStudentsAttendance;
