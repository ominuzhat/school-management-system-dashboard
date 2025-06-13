import { Card, Statistic, Row, Col } from "antd";
import {
  ArrowDownOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PieChartOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import useCashColumns from "../../../Accounts/cash management/utils/cashColumns";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { useGetCashQuery } from "../../../Accounts/cash management/api/cashEndPoints";
import { IGetCash } from "../../../Accounts/cash management/types/cashTypes";
import CreateCash from "../../../Accounts/cash management/components/CreateCash";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { Table } from "../../../../../common/CommonAnt";

export const ExpenseTracking = () => {
  // const categoryColors = {
  //   Utilities: "blue",
  //   Stationery: "green",
  //   Maintenance: "orange",
  //   Transportation: "purple",
  //   "Food & Beverage": "pink",
  //   Technology: "indigo",
  //   Sports: "yellow",
  // };

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useCashColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.add
  );

  const {
    data: transactionList,
    isLoading,
    isFetching,
    refetch,
  } = useGetCashQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (transactionList?.data?.results as IGetCash[] | undefined)?.length ?? 0;

  const dataSource =
    (transactionList?.data?.results as IGetCash[] | undefined) ?? [];

  return (
    <div className="space-y-6">
      {/* Expense Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-red-100">Total Expenses</span>}
              value="₹1,40,000"
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<ArrowDownOutlined className="text-red-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-yellow-100">This Month</span>}
              value="₹89,420"
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<CalendarOutlined className="text-yellow-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-green-100">Budget Remaining</span>}
              value="₹10,580"
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<PieChartOutlined className="text-green-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-blue-100">Total Receipts</span>}
              value="156"
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<FileTextOutlined className="text-blue-100" />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {createPermission && (
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex items-center">
                  <ArrowUpOutlined className="text-blue-600 mr-2" />
                  <span>Quick Cash Management</span>
                </div>
              }
            >
              <CreateCash />
            </Card>
          </Col>
        )}

        {/* Expense List */}
        <Col xs={24} lg={16}>
          <Card
            title="Daily Cash Tracking"
            className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
          >
            {/* <div className="mb-6">
              <Space size="middle">
                <Input
                  placeholder="Search expenses..."
                  prefix={<SearchOutlined />}
                  className="w-full"
                />
                <Select placeholder="Category" style={{ width: 180 }}>
                  <Option value="all">All Categories</Option>
                  <Option value="utilities">Utilities</Option>
                  <Option value="stationery">Stationery</Option>
                  <Option value="maintenance">Maintenance</Option>
                  <Option value="transport">Transportation</Option>
                  <Option value="food">Food & Beverage</Option>
                </Select>
              </Space>
            </div> */}
            {viewPermission ? (
              <Table
                rowKey={"id"}
                loading={isLoading || isFetching}
                refetch={refetch}
                total={dataLength}
                dataSource={dataSource}
                columns={columns}
              />
            ) : (
              <NoPermissionData />
            )}
          </Card>
        </Col>

        {/* Category Breakdown */}
        {/* <Col xs={24} lg={8}>
          <Card
            title="Monthly Breakdown"
            className="bg-white/60 backdrop-blur-sm border-blue-100 mb-6"
          >
            {monthlyExpenses.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.category}</span>
                  <span>₹{item.amount.toLocaleString()}</span>
                </div>
                <Progress
                  percent={item.percentage}
                  strokeColor={{
                    "0%": "#3b82f6",
                    "100%": "#6366f1",
                  }}
                  showInfo={false}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {item.percentage}% of total
                </div>
                {index < monthlyExpenses.length - 1 && (
                  <Divider className="my-3" />
                )}
              </div>
            ))}
          </Card>
          
          <Card
            title="Quick Actions"
            className="bg-white/60 backdrop-blur-sm border-blue-100"
          >
            <Space direction="vertical" className="w-full">
              <Button
                type="primary"
                icon={<FileTextOutlined />}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
              >
                Record Expense
              </Button>
              <Button icon={<DownloadOutlined />} className="w-full">
                Export Report
              </Button>
              <Button icon={<PieChartOutlined />} className="w-full">
                View Analytics
              </Button>
            </Space>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};
