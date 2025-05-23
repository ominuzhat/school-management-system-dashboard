// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
import { GetPermission } from "../../../../../utilities/permission";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { useGetShiftQuery } from "../../../shift/api/shiftEndPoints";
import { useGetSectionQuery } from "../../../Section/api/sectionEndPoints";

const { Option } = Select;

const MarkStudentsAttendance = () => {
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    grade_level: undefined,
    session: undefined,
    shift: undefined,
    section: undefined,
  });
  const [create] = useCreateStudentAttendanceMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const { data: classData } = useGetClassesQuery({});
  const { data: shiftData } = useGetShiftQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const [fetchAdmissionData, { data: attendanceData, isLoading }] =
    useLazyGetMarkStudentAttendanceQuery<any>({});

  const columns = useMarkStudentsAttendanceColumns({
    attendanceData: (attendanceData?.data?.records as any) || [],
    gradeLevel: (attendanceData?.data?.grade_level as any) || {},
    session: (attendanceData?.data?.session as any) || {},
    formData,
    setResult,
  });

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.attendance,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.attendance,
    actionNames.add
  );

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
      {viewPermission && (
        <Link to="/attendance/mark-student-attendance-list">
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-blue-500 p-2 sm:p-3 md:p-2 lg:p-2 xl:p-2 2xl:p-2 cursor-pointer transition-all w-full sm:w-64">
            View List of Attendance{" "}
            <MdOutlineArrowRightAlt className="text-xl" />
          </p>
        </Link>
      )}
      <Card>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
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
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
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

              <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  onChange={(value) => handleChange("grade_level", value)}
                  allowClear
                >
                  {Array.isArray(classData?.data) &&
                    classData?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data.name}
                      </Option>
                    ))}
                </Select>
              </Col>

              <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
                <Select
                  className="w-full"
                  placeholder="Select shift"
                  onChange={(value) => handleChange("shift", value)}
                  allowClear
                >
                  {Array.isArray(shiftData?.data) &&
                    shiftData?.data?.map((shift: any) => (
                      <Option key={shift.id} value={shift.id}>
                        {shift.name}
                      </Option>
                    ))}
                </Select>
              </Col>

              <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
                <Select
                  className="w-full"
                  placeholder="Select Section"
                  onChange={(value) => handleChange("section", value)}
                  allowClear
                >
                  {Array.isArray(sectionData?.data) &&
                    sectionData?.data?.map((shift: any) => (
                      <Option key={shift.id} value={shift.id}>
                        {shift.name}
                      </Option>
                    ))}
                </Select>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
            <Button
              type="primary"
              htmlType="button"
              icon={<Iconify name="iconamoon:send-fill" />}
              className="w-full"
              onClick={handleSearch}
            >
              <span className="xs:hidden">Search</span>
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        {createPermission ? (
          <>
            <div className="overflow-x-auto">
              <Table
                loading={isLoading}
                dataSource={attendanceData?.data?.records || []}
                columns={columns}
                pagination={false}
                rowKey="id"
                scroll={{ x: true }}
              />
            </div>
            <Button
              className="mt-5 w-full sm:w-auto"
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

export default MarkStudentsAttendance;
