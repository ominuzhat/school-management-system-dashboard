import { Button, Card, Col, DatePicker, Row, Select, Statistic } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import CreatePayrollModal from "../components/CreatePayrollModal";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Table } from "../../../../common/CommonAnt";

import usePayrollColumns from "../utils/payrollColumns";
import {
  useGetPayrollQuery,
  useLazyGetPayrollFormQuery,
} from "../api/payrollEndPoints";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";
import dayjs from "dayjs";
import { FaFilePdf } from "react-icons/fa6";

const { Option } = Select;
const { MonthPicker } = DatePicker;

const PayrollPage = () => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = usePayrollColumns();
  const currentMonth = dayjs().format("YYYY-MM") + "-01";

  const [filters, setFilters] = useState({
    status: "",
    month: currentMonth,
  });

  const { page_size, page } = useAppSelector(FilterState);
  const [getPayrollForm, { data: singleFeeForm }] =
    useLazyGetPayrollFormQuery<any>();

  const {
    data: payrollData,
    isLoading,
    isFetching,
    refetch,
  } = useGetPayrollQuery<any>({
    search: search,
    page_size: page_size,
    page: Number(page) || undefined,
    year_month: filters.month,
    status: filters.status,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payroll,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payroll,
    actionNames.add
  );

  useEffect(() => {
    if (singleFeeForm) {
      const url = URL.createObjectURL(singleFeeForm);

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
  }, [singleFeeForm]);

  const handleForm = () => {
    getPayrollForm({
      month: filters.month,
      id: 0,
    });
  };

  return (
    <div className="space-y-5">
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
    <Statistic
      title={<span className="text-green-100">Total Gross Salary</span>}
      value={`৳ ${payrollData?.data?.reports?.overall?.total_gross_salary || 0}`}
      valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
    />
  </Card>

  <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
    <Statistic
      title={
        <span className="text-yellow-100">
          {payrollData?.data?.reports?.applied_filters?.year_month 
            ? dayjs(payrollData.data.reports.applied_filters.year_month).format("MMMM YYYY")
            : "All Time"} Net Salary
        </span>
      }
      value={`৳ ${payrollData?.data?.reports?.filtered?.total_net_salary || 0}`}
      valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
    />
  </Card>

  <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
    <Statistic
      title={<span className="text-blue-100">Total Paid</span>}
      value={`৳ ${payrollData?.data?.reports?.overall?.total_paid || 0}`}
      valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
    />
  </Card>

  <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0">
    <Statistic
      title={<span className="text-purple-100">Total Due</span>}
      value={`৳ ${payrollData?.data?.reports?.filtered?.total_due || 0}`}
      valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
    />
  </Card>
</div>
      <Card>
        <Row justify="space-between" align="middle">
          {createPermission && (
            <Col lg={4}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Payroll",
                      content: <CreatePayrollModal />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Payroll
              </Button>
            </Col>
          )}
          <Col lg={16}>
            <Row gutter={[16, 16]} justify="end" align="middle">
              {/* Month Picker */}
              <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                <MonthPicker
                  placeholder="Select month"
                  className="w-full text-green-500"
                  defaultValue={dayjs(currentMonth, "YYYY-MM-DD")}
                  onChange={(date) => {
                    if (date) {
                      const formattedDate = date.format("YYYY-MM") + "-01";
                      setFilters((prev) => ({ ...prev, month: formattedDate }));
                    } else {
                      setFilters((prev) => ({ ...prev, month: currentMonth }));
                    }
                  }}
                  format="MMMM YYYY"
                />
              </Col>

              {/* Status */}
              <Col xs={12} sm={12} md={8} lg={8} xl={6} xxl={6}>
                <Select
                  className="w-full"
                  placeholder="Status"
                  allowClear
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, status: value }))
                  }
                >
                  <Option value="paid">Paid</Option>
                  <Option value="partial">Partial</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Col>
              <Col lg={8}>
                <SearchComponent
                  onSearch={(value: any) => setSearch(value)}
                  placeholder="Enter Your Payroll"
                />
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
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={payrollData?.data?.count}
          dataSource={payrollData?.data?.results}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default PayrollPage;
