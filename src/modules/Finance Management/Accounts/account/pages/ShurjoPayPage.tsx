/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Table, Col, Row, Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import useTransactionColumns from "../../../Accounts/Transaction/utils/transactionColumns";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { useGetTransactionQuery } from "../../../Accounts/Transaction/api/transactionEndPoints";
import { IGetTransaction } from "../../../Accounts/Transaction/types/transactionTypes";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

const ShurjoPayPage = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useTransactionColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );

  const { data: transactionList } = useGetTransactionQuery<any>({
    page_size: page_size,
    page: Number(page) || undefined,
    type: "surjopay",
  });

  const dataSource =
    (transactionList?.data?.results as IGetTransaction[] | undefined) ?? [];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-red-100">Total Amount</span>}
              value={`৳ ${
                transactionList?.data?.reports?.overall?.total_amount || 0
              }`}
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
              title={
                <span className="text-yellow-100">Total Transactions</span>
              }
              value={`${
                transactionList?.data?.reports?.overall?.total_transactions || 0
              }`}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<ArrowUpOutlined className="text-yellow-100" />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 h-full">
            <Statistic
              title={
                <span className="text-green-100">
                  {"Current Month Transactions"}
                </span>
              }
              value={`${
                transactionList?.data?.reports?.filtered?.total_amount || 0
              }`}
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
              title={
                <span className="text-yellow-100">Total Transactions</span>
              }
              value={`${
                transactionList?.data?.reports?.filtered?.total_transactions ||
                0
              }`}
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
      <br />

      {viewPermission ? (
        <Card
          className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
          title="Transfer History"
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            size="middle"
            scroll={{ x: true }}
            pagination={{ pageSize: 10 }}
            expandable={{
              expandedRowRender: (record) => (
                <div className="p-4 bg-gray-50 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center">
                      <ArrowUpOutlined className="text-red-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm">
                          {record.account?.account_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ArrowDownOutlined className="text-green-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm">
                          {record.target_account?.account_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Purpose:</span>{" "}
                      {record.description}
                    </p>
                  </div>
                </div>
              ),
              rowExpandable: () => true,
            }}
          />
        </Card>
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default ShurjoPayPage;
