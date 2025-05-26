/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Row,
  Col,
  Space,
  Statistic,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  BankOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  SettingOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

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

  const transfers = [
    {
      id: 1,
      date: "2024-01-24",
      from: "Fee Collection Account",
      to: "Main School Account",
      amount: 50000,
      status: "completed",
      reference: "TXN123456",
      purpose: "Monthly fee consolidation",
    },
    {
      id: 2,
      date: "2024-01-23",
      from: "Main School Account",
      to: "Emergency Fund",
      amount: 25000,
      status: "pending",
      reference: "TXN123457",
      purpose: "Emergency fund replenishment",
    },
    {
      id: 3,
      date: "2024-01-22",
      from: "Main School Account",
      to: "Petty Cash Account",
      amount: 10000,
      status: "completed",
      reference: "TXN123458",
      purpose: "Daily operational expenses",
    },
    {
      id: 4,
      date: "2024-01-21",
      from: "Fee Collection Account",
      to: "Main School Account",
      amount: 75000,
      status: "completed",
      reference: "TXN123459",
      purpose: "Weekly fee collection transfer",
    },
  ];

  // Use the Breakpoint type from Ant Design for type safety
  type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

  const transferColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"] as Breakpoint[],
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (text: any) => (
        <div className="flex items-center">
          <ArrowUpOutlined className="text-red-500 mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      responsive: ["md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (text: any) => (
        <div className="flex items-center">
          <ArrowDownOutlined className="text-green-500 mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (amount: any) => (
        <span className="font-semibold">₹{amount.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["sm", "md", "lg", "xl", "xxl"] as Breakpoint[],
      render: (status: any) => {
        let color = "";
        let icon = <ClockCircleOutlined />;
        if (status === "completed") {
          color = "green";
          icon = <CheckCircleOutlined />;
        } else if (status === "pending") {
          color = "orange";
        }
        return (
          <Tag icon={icon} color={color} className="capitalize">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      responsive: ["lg", "xl", "xxl"] as Breakpoint[],
      render: (_: any, record: any) => (
        <Button type="link" size="small">
          Details
        </Button>
      ),
    },
  ];

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
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card
            className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
            title={
              <div className="flex items-center">
                <ArrowUpOutlined className="text-blue-600 mr-2" />
                <span>Quick Transfer</span>
              </div>
            }
          >
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  From Account
                </label>
                <Select placeholder="Select source account" className="w-full">
                  {accounts.map((account) => (
                    <Option key={account.id} value={account.id.toString()}>
                      {account.name} (₹{account.balance.toLocaleString()})
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  To Account
                </label>
                <Select
                  placeholder="Select destination account"
                  className="w-full"
                >
                  {accounts.map((account) => (
                    <Option key={account.id} value={account.id.toString()}>
                      {account.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Purpose
                </label>
                <Input
                  placeholder="Transfer purpose/description"
                  className="w-full"
                />
              </div>

              <Button
                type="primary"
                icon={<CreditCardOutlined />}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Transfer Funds
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Transfer History */}
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <Card
            className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
            title="Transfer History"
          >
            <Table
              columns={transferColumns}
              dataSource={transfers}
              rowKey="id"
              size="middle"
              scroll={{ x: true }}
              pagination={{ pageSize: 5 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center">
                        <ArrowUpOutlined className="text-red-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">From</p>
                          <p className="text-sm">{record.from}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ArrowDownOutlined className="text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">To</p>
                          <p className="text-sm">{record.to}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p>
                        <span className="font-medium">Purpose:</span>{" "}
                        {record.purpose}
                      </p>
                      <p>
                        <span className="font-medium">Reference:</span>{" "}
                        {record.reference}
                      </p>
                    </div>
                  </div>
                ),
                rowExpandable: (record) => true,
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card
        className="bg-white/60 backdrop-blur-sm border-blue-100"
        title="Quick Actions"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <Button icon={<PlusOutlined />} className="w-full">
              Add New Account
            </Button>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <Button icon={<SettingOutlined />} className="w-full">
              Bank Reconciliation
            </Button>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <Button icon={<ScheduleOutlined />} className="w-full">
              Scheduled Transfers
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
