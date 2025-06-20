/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Table, Tag, Row, Col, Statistic, Tabs } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  BankOutlined,
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
import CreateTransaction from "../../../Accounts/Transaction/components/CreateTransaction";
import CreateFundTransfer from "../../../Accounts/Transaction/components/CreateFundTransfer";

export const AccountTransfer = () => {
  const accounts = [
    {
      id: 1,
      name: "Main School Account",
      type: "Current",
      balance: 567890,
      bank: "State Bank",
      accountNo: "****1234",
    },
    {
      id: 2,
      name: "Fee Collection Account",
      type: "Savings",
      balance: 245680,
      bank: "HDFC Bank",
      accountNo: "****5678",
    },
    {
      id: 3,
      name: "Emergency Fund",
      type: "Savings",
      balance: 150000,
      bank: "ICICI Bank",
      accountNo: "****9012",
    },
    {
      id: 4,
      name: "Petty Cash Account",
      type: "Current",
      balance: 25000,
      bank: "Axis Bank",
      accountNo: "****3456",
    },
  ];

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useTransactionColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.add
  );

  const { data: transactionList } = useGetTransactionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataSource =
    (transactionList?.data?.results as IGetTransaction[] | undefined) ?? [];

  return (
    <div className="space-y-6">
      {/* Account Overview */}
      <Row gutter={[16, 16]}>
        {accounts.map((account) => (
          <Col key={account.id} xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <WalletOutlined className="text-blue-600" />
                  <Tag>{account.type}</Tag>
                </div>
                <BankOutlined className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {account.name}
              </h3>
              <Statistic
                value={account.balance}
                prefix="₹"
                valueStyle={{
                  color: "#2563eb",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                className="mb-2"
              />
              <div className="text-xs text-gray-500">
                <p>{account.bank}</p>
                <p>{account.accountNo}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Transfer Form */}
        {createPermission && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <Tabs defaultActiveKey="internal">
                  <Tabs.TabPane tab="Internal Transfer" key="internal">
                    <CreateTransaction />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Create Fund Transfer Request" key="fund">
                    <CreateFundTransfer />
                  </Tabs.TabPane>
                </Tabs>
              }
            ></Card>
          </Col>
        )}

        {/* Transfer History */}
        {viewPermission ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
          </Col>
        ) : (
          <NoPermissionData />
        )}
      </Row>
    </div>
  );
};
