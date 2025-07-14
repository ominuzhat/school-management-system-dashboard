/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  Table,
  Row,
  Col,
  Statistic,
  Tabs,
  DatePicker,
  Select,
  Button,
} from "antd";
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
import {
  useGetTransactionQuery,
  useLazyGetTransactionsFormQuery,
} from "../../../Accounts/Transaction/api/transactionEndPoints";
import { IGetTransaction } from "../../../Accounts/Transaction/types/transactionTypes";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import CreateTransaction from "../../../Accounts/Transaction/components/CreateTransaction";
import CreateFundTransfer from "../../../Accounts/Transaction/components/CreateFundTransfer";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { useGetAccountQuery } from "../../../Accounts/account/api/accountEndPoints";

const { Option } = Select;
const { MonthPicker } = DatePicker;

export const AccountTransfer = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const currentMonth = dayjs().format("YYYY-MM") + "-01";

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    transaction_type: "",
    account_id: "",
    file_format: "pdf",
    year_month: dayjs(currentMonth).format("YYYY-MM"),
  });

  const [getPayrollForm, { data: singleFeeForm }] =
    useLazyGetTransactionsFormQuery<any>();
  const { data: accountList } = useGetAccountQuery({});
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

  const { data: transactionList } = useGetTransactionQuery<any>({
    page_size: page_size,
    page: Number(page) || undefined,
    year_month: dayjs(currentMonth).format("YYYY-MM"),
  });

  const dataSource =
    (transactionList?.data?.results as IGetTransaction[] | undefined) ?? [];

  useEffect(() => {
    if (singleFeeForm) {
      const url = URL.createObjectURL(singleFeeForm);

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Transfer History</title>
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
      ...filters,
    });
  };

  return (
    <div className="space-y-6">
      {/* Account Overview */}

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
                  {filters?.year_month
                    ? `Transactions ${dayjs(filters.year_month).format(
                        "MMMM YYYY"
                      )}`
                    : "Current Month Transactions"}
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

      <Row gutter={[16, 16]}>
        {/* Transfer Form */}
        {createPermission && (
          <Col xs={24}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <Tabs defaultActiveKey="internal">
                  <Tabs.TabPane tab="Internal Transfer" key="internal">
                    <CreateTransaction />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="My Fund Transfer Request" key="fund">
                    <CreateFundTransfer />
                  </Tabs.TabPane>
                </Tabs>
              }
            />
          </Col>
        )}

        {/* Transfer History */}
        {viewPermission ? (
          <Col xs={24}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex flex-col gap-4 py-4">
                  <p className="font-semibold text-lg">Transfer History</p>
                  <Row gutter={[12, 12]} justify="start" align="middle">
                    {/* Start Date */}
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <DatePicker
                        className="w-full"
                        placeholder="Start Date"
                        onChange={(date) =>
                          setFilters((prev) => ({
                            ...prev,
                            start_date: date ? date.format("YYYY-MM-DD") : "",
                          }))
                        }
                      />
                    </Col>

                    {/* End Date */}
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <DatePicker
                        className="w-full"
                        placeholder="End Date"
                        onChange={(date) =>
                          setFilters((prev) => ({
                            ...prev,
                            end_date: date ? date.format("YYYY-MM-DD") : "",
                          }))
                        }
                      />
                    </Col>

                    {/* Transaction Type */}
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        className="w-full"
                        placeholder="Transaction Type"
                        allowClear
                        onChange={(value) =>
                          setFilters((prev) => ({
                            ...prev,
                            transaction_type: value,
                          }))
                        }
                      >
                        <Option value="credit">Credit</Option>
                        <Option value="debit">Debit</Option>
                      </Select>
                    </Col>

                    {/* Account */}
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        className="w-full"
                        placeholder="Select Account"
                        allowClear
                        onChange={(value) =>
                          setFilters((prev) => ({
                            ...prev,
                            account_id: value,
                          }))
                        }
                      >
                        {Array.isArray(accountList?.data) &&
                          accountList?.data?.map((account: any) => (
                            <Option key={account.id} value={account.id}>
                              {account.type} - {account.account_name}{" "}
                              {account.account_type} -{" "}
                              {account.account_or_merchant_number} (
                              {account.balance})
                            </Option>
                          ))}
                      </Select>
                    </Col>

                    {/* Year Month */}
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <MonthPicker
                        placeholder="Year & Month"
                        className="w-full"
                        defaultValue={dayjs(currentMonth, "YYYY-MM-DD")}
                        onChange={(date) => {
                          const formattedDate = date
                            ? date.format("YYYY-MM") + "-01"
                            : currentMonth;
                          setFilters((prev) => ({
                            ...prev,
                            year_month: formattedDate,
                          }));
                        }}
                        format="MMMM YYYY"
                      />
                    </Col>

                    {/* Generate File */}
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Button
                        title="Generate File"
                        size="middle"
                        type="default"
                        style={{
                          color: "#c20a0a",
                          border: "1px solid gray",
                          width: "100%",
                        }}
                        onClick={handleForm}
                      >
                        <FaFilePdf /> Generate File
                      </Button>
                    </Col>
                  </Row>
                </div>
              }
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
                              {record.account?.type === "cash"
                                ? `cash (My Account)`
                                : record.account?.type === "bank"
                                ? `bank - ${record.account?.account_name} - ${record.account?.bank_name} (${record.account?.balance})`
                                : `${record.account?.type} - ${record.account?.account_type} (${record.account?.balance})`}
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
