import { Button, Card, Col, DatePicker, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import CreatePayrollModal from "../components/CreatePayrollModal";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Table } from "../../../../common/CommonAnt";

import usePayrollColumns from "../utils/payrollColumns";
import { useGetPayrollQuery } from "../api/payrollEndPoints";
import { useState } from "react";
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

  const {
    data: payrollData,
    isLoading,
    isFetching,
    refetch,
  } = useGetPayrollQuery({
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

  return (
    <div className="space-y-5">
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
          <Col lg={12}>
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
              <Col xs={12} sm={12} md={8} lg={6} xl={6} xxl={6}>
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
              <Col lg={12}>
                <SearchComponent
                  onSearch={(value: any) => setSearch(value)}
                  placeholder="Enter Your Payroll"
                />
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
