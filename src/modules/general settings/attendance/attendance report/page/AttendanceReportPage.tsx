/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Card, Col, DatePicker, Row, Select } from "antd";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

import { useGetAttendanceReportQuery } from "../api/attendanceReportEndPoints";
import useAttendanceReportColumns from "../utils/attendanceReportColumns";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetClassesBigListQuery } from "../../../classes/api/classesEndPoints";
import { useGetShiftQuery } from "../../../shift/api/shiftEndPoints";
import { useGetSectionQuery } from "../../../Section/api/sectionEndPoints";

const AttendanceReportPage = () => {
  const [search, setSearch] = useState("");

  // Filters
  const [monthOnly, setMonthOnly] = useState<number | undefined>();

  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const { data: classData } = useGetClassesBigListQuery({});
  const { data: shiftData } = useGetShiftQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });

  const currentMonth = dayjs().format("YYYY-MM") + "-01";
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const handleDateRange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
    _dateStrings: [string, string]
  ) => {
    setDateRange(dates ?? [null, null]);
  };

  const [filters, setFilters] = useState({
    search: "",
    is_active: "",
    grade_level: "",
    session: "",
    section: "",
    shift: "",
    status: "",
    month: currentMonth,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.view
  );

  const {
    data: attendanceReport,
    isLoading,
    isFetching,
    refetch,
  } = useGetAttendanceReportQuery({
    grade_level: filters.grade_level,
    session: filters.session,
    section: filters.section,
    shift: filters.shift,
    search,
    page_size,
    page: Number(page) || undefined,
    month: monthOnly,

    date_range_after: dateRange[0]?.format("YYYY-MM-DD"),
    date_range_before: dateRange[1]?.format("YYYY-MM-DD"),
  });


  // Handlers
  const handleMonthOnly = (date: dayjs.Dayjs | null) => {
    setMonthOnly(date ? date.month() + 1 : undefined);
  };

  return (
    <div>
      <Card>
        <Row justify="start" gutter={[6, 6]}>
          <Col lg={4} xs={24}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Search by Student"
            />
          </Col>

          {/* Session */}
          <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Session"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, section: value }))
              }
            >
              {Array.isArray(sessionData?.data) &&
                sessionData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Class */}
          <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Class"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, grade_level: value }))
              }
            >
              {Array.isArray(classData?.data) &&
                classData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Section */}
          <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Section"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, session: value }))
              }
            >
              {Array.isArray(sectionData?.data) &&
                sectionData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Shift */}
          <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Shift"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, shift: value }))
              }
            >
              {Array.isArray(shiftData?.data) &&
                shiftData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          <Col lg={3} xs={24}>
            <DatePicker
              picker="month"
              onChange={handleMonthOnly}
              placeholder="Filter: Month Only"
              allowClear
              className="w-full"
              format="MMMM"
            />
          </Col>

          <Col xs={24} sm={24} md={4} lg={3} xl={3} xxl={4}>
            <RangePicker
              className="w-full"
              onChange={handleDateRange}
              value={dateRange}
              placeholder={["Start Date", "End Date"]}
              allowClear
              format="YYYY-MM-DD"
            />
          </Col>

          {/* <Col lg={6} xs={24}>
            <DatePicker
              picker="year"
              onChange={handleYearOnly}
              placeholder="Filter: Year Only"
              allowClear
              className="w-full"
            />
          </Col>

          <Col lg={6} xs={24}>
            <DatePicker
              picker="month"
              onChange={handleYearMonth}
              placeholder="Filter: Year + Month"
              allowClear
              className="w-full"
              format="MMMM YYYY"
            />
          </Col> */}
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey="roll"
          loading={isLoading || isFetching}
          refetch={refetch}
          total={attendanceReport?.data?.students?.length || 0}
          dataSource={attendanceReport?.data?.students || []}
          columns={useAttendanceReportColumns(
            attendanceReport?.data?.students || []
          )}
          scroll={{ x: "max-content" }}
          bordered
          size="middle"
          style={{ marginTop: 16 }}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default AttendanceReportPage;
