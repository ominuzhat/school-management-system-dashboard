import { Button, Card, Col, DatePicker, Row, Statistic } from "antd";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetPaymentQuery } from "../api/paymentEndPoints";
import usePaymentColumns from "../utils/paymentColumns";
import CreatePayment from "../components/CreatePayment";
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
import { useState } from "react";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";

const { MonthPicker } = DatePicker;

const PaymentPage = () => {
  const dispatch = useDispatch();
  const currentMonth = dayjs().format("YYYY-MM") + "-01";
  const [search, setSearch] = useState();
  const [filters, setFilters] = useState({
    month: currentMonth,
  });

  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = usePaymentColumns();

  const {
    data: paymentData,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaymentQuery<any>({
    page_size: page_size,
    page: Number(page) || undefined,
    year_month: filters.month,
    search: search,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payment,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payment,
    actionNames.add
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <Statistic
            title={<span className="text-green-100">Overall Amount</span>}
            value={`৳ ${
              paymentData?.data?.reports?.overall?.total_amount || 0
            }`}
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
          />
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          <Statistic
            title={
              <span className="text-yellow-100">
                Payment{" "}
                <span className="text-white underline font-bold">
                  {paymentData?.data?.reports?.applied_filters?.year_month
                    ? dayjs(
                        paymentData?.data?.reports?.applied_filters.year_month
                      ).format("MMMM YYYY")
                    : "All Time"}
                </span>
              </span>
            }
            value={`৳ ${
              paymentData?.data?.reports?.filtered?.total_amount || 0
            }`}
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
          />
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
          <Statistic
            title={<span className="text-blue-100">Total Transactions</span>}
            value={paymentData?.data?.reports?.overall?.total_payments || 0}
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
          />
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0">
          <Statistic
            title={
              <span className="text-purple-100">Filtered Transactions</span>
            }
            value={paymentData?.data?.reports?.filtered?.total_payments || 0}
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
          />
        </Card>
      </div>

      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Payment ",
                      content: <CreatePayment />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Payment
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
      <Card>
        {viewPermission ? (
          <Table
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={paymentData?.data?.count}
            dataSource={paymentData?.data?.results}
            columns={columns}
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default PaymentPage;
