import { Button, Card, Col, DatePicker, notification, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useCreateTeacherAttendanceMutation } from "../api/teacherAttendanceEndPoints";
import { useGetTeacherQuery } from "../../../../members/teachers/api/teachersEndPoints";
import { useGetEmployeeQuery } from "../../../../members/employees/api/employeeEndPoints";
import { Table } from "../../../../../common/CommonAnt";
import useMarkTeacherAttendanceColumns from "../utils/MarkTeacherAttendanceColumn";

const MarkTeachersAttendance = () => {
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [allData, setAllData] = useState([]);
  const [create] = useCreateTeacherAttendanceMutation();
  const { data: teacherData, isLoading } = useGetTeacherQuery({});
  const { data: employeeData } = useGetEmployeeQuery({});

  console.log(allData);

  useEffect(() => {
    if (teacherData?.data?.results && employeeData?.data?.results) {
      setAllData([
        ...teacherData?.data?.results,
        ...employeeData?.data?.results,
      ]);
    }
  }, [teacherData, employeeData]);
  // const handleChange = (key: string, value: any) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  // fetchAdmissionData(formData);

  // const handleSearch = () => {
  //   if (formData.session && formData.grade_level) {
  //   } else {
  //     notification.open({
  //       message: "Alert",
  //       description: "Select Class and Session First",
  //     });
  //   }
  // };

  console.log(result);

  const handleAttendanceSubmit = () => {
    if (result) {
      // create(result as any);
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
      <Link to="/attendance/mark-teacher-attendance-list">
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
          <Col lg={3} xs={24}>
            <DatePicker
              className="w-full"
              defaultValue={dayjs()}
              format="YYYY-MM-DD"
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  date: date?.format("YYYY-MM-DD"),
                }))
              }
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          loading={isLoading}
          dataSource={allData || []}
          columns={useMarkTeacherAttendanceColumns({
            attendanceData: (allData as any) || [],
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

export default MarkTeachersAttendance;
