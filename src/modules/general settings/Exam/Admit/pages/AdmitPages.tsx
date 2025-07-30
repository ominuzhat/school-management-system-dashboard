import { Button, Card, Col, Row, Select } from "antd";
import usePayrollColumns from "../utils/admitColumns";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import {
  useGetAdmitQuery,
  useLazyGetAdmitFormQuery,
} from "../api/admitEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { Table } from "../../../../../common/CommonAnt";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { useGetExamQuery } from "../../api/examEndPoints";
import { useGetClassesBigListQuery } from "../../../classes/api/classesEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetExamHallQuery } from "../../Exam-hall/api/examHallEndPoints";
const { Option } = Select;

const AdmitPage = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = usePayrollColumns();
  const { data: examList } = useGetExamQuery({});
  const { data: classList } = useGetClassesBigListQuery({});
  const { data: hallList } = useGetExamHallQuery({});
  const { data: admissionSessionList } = useGetAdmissionSessionQuery({});

  const [filters, setFilters] = useState({

    hall: "",
    exam: "",
    session: "",
    grade_level: "",
    shift: "",
    section: "",
    status: "",
  });

  const { page_size, page } = useAppSelector(FilterState);
  const [getAdmitForm, { data: admitForm }] = useLazyGetAdmitFormQuery<any>();

  const {
    data: payrollData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAdmitQuery<any>({
    page_size: page_size,
    page: Number(page) || undefined,
    ...filters,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payroll,
    actionNames.view
  );

  useEffect(() => {
    if (admitForm) {
      const url = URL.createObjectURL(admitForm);

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Salary Summary</title>
            </head>
            <body style="margin:0">
              <iframe 
                src="${url}" 
                frameborder="0" 
                style="width:100%;height:100vh;"
              ></iframe>
            </body>
          </html>
        `);
        newWindow.document.close();
      }

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [admitForm]);

  const handleForm = () => {
    getAdmitForm({ params: { ...filters } });
  };

  return (
    <div className="space-y-5">
      <Card bordered={false} className="bg-gray-50">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={4}>
            <Select
              className="w-full"
              placeholder="Hall"
              allowClear
              showSearch
              // onSearch={debounce(setSearch, 500)}
              filterOption={false}
              loading={isFetching}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, hall: value }))
              }
            >
              {Array.isArray(hallList?.data) &&
                hallList?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data?.name}
                  </Option>
                ))}
            </Select>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Select
              className="w-full"
              placeholder="Exam"
              allowClear
              showSearch
              // onSearch={debounce(setSearch, 500)}
              filterOption={false}
              loading={isFetching}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, exam: value }))
              }
            >
              {Array.isArray(examList?.data) &&
                examList?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data?.name}
                  </Option>
                ))}
            </Select>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Select
              className="w-full"
              placeholder="Session"
              allowClear
              showSearch
              // onSearch={debounce(setSearch, 500)}
              filterOption={false}
              loading={isFetching}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, session: value }))
              }
            >
              {Array.isArray(admissionSessionList?.data) &&
                admissionSessionList?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data?.name}
                  </Option>
                ))}
            </Select>
          </Col>

          <Col xs={24} md={12} lg={4}>
            <Select
              className="w-full"
              placeholder="Class"
              allowClear
              showSearch
              // onSearch={debounce(setSearch, 500)}
              filterOption={false}
              loading={isFetching}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, grade_level: value }))
              }
            >
              {Array.isArray(classList?.data) &&
                classList?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data?.name}
                  </Option>
                ))}
            </Select>
          </Col>

          <Col xs={24} md={12} lg={4}>
            <Select
              placeholder="Status"
              className="w-full"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, is_passed: value }))
              }
            >
              <Option value="assigned">Assigned</Option>
              <Option value="unassigned">Unassigned</Option>
            </Select>
          </Col>

          <Col xs={24} md={12} lg={4}>
            <Select
              className="w-full"
              placeholder="Shift"
              allowClear
              value={filters.shift}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  shift: value,
                  section: "",
                }))
              }
              disabled={!filters.grade_level}
            >
              {Array.isArray(classList?.data) &&
                classList?.data
                  ?.find((cls: any) => cls.id === filters.grade_level)
                  ?.shifts?.map((shift: any) => (
                    <Option key={shift.id} value={shift.id}>
                      {shift.name}
                    </Option>
                  ))}
            </Select>
          </Col>

          <Col xs={24} md={12} lg={4}>
            <Select
              className="w-full"
              placeholder="Section"
              allowClear
              value={filters.section}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, section: value }))
              }
              disabled={!filters.shift}
            >
              {Array.isArray(classList?.data) &&
                classList?.data
                  ?.find((cls: any) => cls.id === filters.grade_level)
                  ?.shifts?.find((sh: any) => sh.id === filters.shift)
                  ?.sections?.map((s: any) => (
                    <Option key={s.section.id} value={s.section.id}>
                      {s.section.name}
                    </Option>
                  ))}
            </Select>
          </Col>
          <Col lg={4}>
            <Button
              title="Invoice"
              size="middle"
              type="default"
              style={{
                color: "#c20a0a",
                border: "1px solid gray",
              }}
              onClick={() => handleForm()}
            >
              <FaFilePdf /> Generate Pdf
            </Button>
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={payrollData?.data?.count}
          dataSource={payrollData?.data}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default AdmitPage;
