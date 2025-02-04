import { Button, Card, Col, DatePicker, notification, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import {
  useCreateTeacherAttendanceMutation,
  useLazyGetMarkTeacherAttendanceQuery,
} from "../api/teacherAttendanceEndPoints";
import { Table } from "../../../../../common/CommonAnt";
import useMarkTeacherAttendanceColumns from "../utils/MarkTeacherAttendanceColumn";
import Iconify from "../../../../../common/IconifyConfig/IconifyConfig";

const MarkTeachersAttendance = () => {
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [create] = useCreateTeacherAttendanceMutation();

  const [fetchAttendanceData, { data: attendanceData, isLoading }] =
    useLazyGetMarkTeacherAttendanceQuery({});

  const handleSearch = () => {
    if (formData) {
      fetchAttendanceData(formData);
    } else {
      notification.open({
        message: "Alert",
        description: "Select Date First",
      });
    }
  };

  const handleAttendanceSubmit = () => {
    if (result) {
      create(result as any)
        .unwrap()
        .then(() => {
          notification.success({
            message: "Success",
            description: "Attendance submitted successfully!",
          });
        })
        .catch(() => {
          notification.error({
            message: "Error",
            description: "Failed to submit attendance.",
          });
        });
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
      <Link to="/attendance/mark-employee-attendance-list">
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

          <Col lg={4} xs={24}>
            <Button
              type="primary"
              htmlType="button"
              icon={<Iconify name="iconamoon:send-fill" />}
              className="w-full"
              onClick={handleSearch}
            >
              Search Employee
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          loading={isLoading}
          dataSource={attendanceData?.data?.records || []}
          columns={useMarkTeacherAttendanceColumns({
            attendanceData: attendanceData?.data?.records || [],
            formData,
            setResult,
          })}
          pagination={false}
          rowKey={Math.random()}
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
