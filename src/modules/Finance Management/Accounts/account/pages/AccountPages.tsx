import { Card, Col, Row, Statistic, Tag } from "antd";
import {
  ArrowUpOutlined,
  BankOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { useGetAccountQuery } from "../api/accountEndPoints";
import useAccountColumns from "../utils/accountColumns";
import { IGetAccount } from "../types/accountTypes";
import CreateAccount from "../components/CreateAccount";
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

const AccountPage = () => {
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
  const columns = useAccountColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.add
  );

  const {
    data: accountList,
    isLoading,
    isFetching,
    refetch,
  } = useGetAccountQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (accountList?.data as IGetAccount[] | any)?.length ?? 0;

  const dataSource = (accountList?.data as IGetAccount[] | undefined) ?? [];

  console.log(accountList, "accountList");

  return (
    <div className="space-y-5">
      {/* <div className="my-5">
        <BreadCrumb />
      </div> */}

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
        {/* Account Form */}
        {createPermission && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex items-center">
                  <ArrowUpOutlined className="text-blue-600 mr-2" />
                  <span>Quick Account</span>
                </div>
              }
            >
              <CreateAccount />
            </Card>
          </Col>
        )}

        {/* Account History */}
        {viewPermission ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title="Accounts"
            >
              <Table
                rowKey={"id"}
                loading={isLoading || isFetching}
                refetch={refetch}
                total={dataLength}
                dataSource={dataSource}
                columns={columns}
              />
            </Card>
          </Col>
        ) : (
          <NoPermissionData />
        )}
      </Row>

      {/* <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Account",
                      content: <CreateAccount />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Account
              </Button>
            </Col>
          )}
        </Row>
      </Card> */}
      {/* 
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
      )} */}
    </div>
  );
};

export default AccountPage;
