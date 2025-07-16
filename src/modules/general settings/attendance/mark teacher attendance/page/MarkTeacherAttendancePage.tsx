import { Button, Card, Col, DatePicker, notification, Row, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import {
  useCreateTeacherAttendanceMutation,
  useCreateTeacherSyncAttendanceMutation,
  useLazyGetMarkTeacherAttendanceQuery,
} from "../api/teacherAttendanceEndPoints";
import useMarkTeacherAttendanceColumns from "../utils/MarkTeacherAttendanceColumn";
import Iconify from "../../../../../common/IconifyConfig/IconifyConfig";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { IoMdSync } from "react-icons/io";

const MarkTeachersAttendance = () => {
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [create] = useCreateTeacherAttendanceMutation();
  const [syncAttendance] = useCreateTeacherSyncAttendanceMutation<any>({});

  const [fetchAttendanceData, { data: attendanceData, isLoading }] =
    useLazyGetMarkTeacherAttendanceQuery<any>({});

  const columns: any = useMarkTeacherAttendanceColumns({
    attendanceData: attendanceData?.data?.records || [],
    formData,
    setResult,
  });

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

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.employeeattendance,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.employeeattendance,
    actionNames.add
  );

  return (
    <div className="space-y-5">
      {/* <div className="my-5">
        <BreadCrumb />
      </div> */}

      {viewPermission && (
        <div className="w-full flex items-center justify-between">
          <Link to="/attendance/mark-employee-attendance-list">
            <p className=" flex items-center gap-2 text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-blue-500 p-2 sm:p-3 md:p-2 lg:p-2 xl:p-2 2xl:p-2 cursor-pointer transition-all w-full sm:w-64">
              View List of Attendance{" "}
              <MdOutlineArrowRightAlt className="text-xl" />
            </p>
          </Link>
          <Button
            onClick={() => syncAttendance({})}
            className="text-green-700 border-green-700"
          >
            <IoMdSync />
            Sync Attendance
          </Button>
        </div>
      )}

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
        {createPermission ? (
          <>
            <Table
              loading={isLoading}
              dataSource={attendanceData?.data?.records || []}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.teacher?.id || record.employee?.id}
            />
            <Button
              className="mt-5"
              type="primary"
              onClick={handleAttendanceSubmit}
            >
              Submit Attendance
            </Button>
          </>
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default MarkTeachersAttendance;
