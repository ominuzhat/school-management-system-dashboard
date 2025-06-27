import { Button, Card, Col, DatePicker, Row } from "antd";
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
  } = useGetPaymentQuery({
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
