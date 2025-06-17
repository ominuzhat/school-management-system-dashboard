import { Card, Col, DatePicker, Row } from "antd";
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
import useInvoiceColumns from "../utils/invoiceColumns";
import { useGetInvoiceQuery } from "../api/invoiceEndPoints";
import dayjs from "dayjs";

const InvoicePage = () => {
  const [search, setSearch] = useState("");

  // Filters
  const [monthOnly, setMonthOnly] = useState<number | undefined>();
  const [yearOnly, setYearOnly] = useState<number | undefined>();
  const [yearMonth, setYearMonth] = useState<string | undefined>();

  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useInvoiceColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.view
  );

  const {
    data: collectFee,
    isLoading,
    isFetching,
    refetch,
  } = useGetInvoiceQuery({
    search,
    page_size,
    page: Number(page) || undefined,
    month: monthOnly,
    year: yearOnly,
    year_month: yearMonth,
  });

  // Handlers
  const handleMonthOnly = (date: dayjs.Dayjs | null) => {
    setMonthOnly(date ? date.month() + 1 : undefined);
  };

  const handleYearOnly = (date: dayjs.Dayjs | null) => {
    setYearOnly(date ? date.year() : undefined);
  };

  const handleYearMonth = (date: dayjs.Dayjs | null) => {
    setYearMonth(date ? date.format("YYYY-MM") : undefined);
  };

  return (
    <div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={6} xs={24}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Search Invoice by Student"
            />
          </Col>

          <Col lg={6} xs={24}>
            <DatePicker
              picker="month"
              onChange={handleMonthOnly}
              placeholder="Filter: Month Only"
              allowClear
              className="w-full"
              format="MMMM"
            />
          </Col>

          <Col lg={6} xs={24}>
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
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey="id"
          loading={isLoading || isFetching}
          refetch={refetch}
          total={collectFee?.data?.count}
          dataSource={collectFee?.data}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default InvoicePage;
