import {
  Card,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Statistic,
  Progress,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PieChartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export const ExpenseTracking = () => {
  const expenses = [
    {
      id: 1,
      date: "2024-01-24",
      category: "Utilities",
      description: "Monthly electricity bill",
      amount: 8500,
      method: "Bank Transfer",
      receipt: "ELEC-001",
      approvedBy: "Principal",
    },
    {
      id: 2,
      date: "2024-01-23",
      category: "Stationery",
      description: "Office supplies and printing materials",
      amount: 3200,
      method: "Cash",
      receipt: "STAT-045",
      approvedBy: "Admin Head",
    },
    {
      id: 3,
      date: "2024-01-22",
      category: "Maintenance",
      description: "Classroom furniture repair",
      amount: 12000,
      method: "Cheque",
      receipt: "MAIN-012",
      approvedBy: "Principal",
    },
    {
      id: 4,
      date: "2024-01-21",
      category: "Transportation",
      description: "School bus fuel and maintenance",
      amount: 15000,
      method: "Bank Transfer",
      receipt: "TRANS-003",
      approvedBy: "Transport Head",
    },
    {
      id: 5,
      date: "2024-01-20",
      category: "Food & Beverage",
      description: "Cafeteria supplies and groceries",
      amount: 7800,
      method: "Cash",
      receipt: "FOOD-018",
      approvedBy: "Cafeteria Manager",
    },
  ];

  const categoryColors = {
    Utilities: "blue",
    Stationery: "green",
    Maintenance: "orange",
    Transportation: "purple",
    "Food & Beverage": "pink",
    Technology: "indigo",
    Sports: "yellow",
  };

  const monthlyExpenses = [
    { category: "Transportation", amount: 45000, percentage: 32 },
    { category: "Utilities", amount: 28000, percentage: 20 },
    { category: "Maintenance", amount: 25000, percentage: 18 },
    { category: "Food & Beverage", amount: 20000, percentage: 14 },
    { category: "Stationery", amount: 15000, percentage: 11 },
    { category: "Technology", amount: 7000, percentage: 5 },
  ];

  const expenseColumns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => (
        <Tag color={categoryColors[category as keyof typeof categoryColors]}>
          {category}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: any) => (
        <span className="text-red-600 font-medium">
          -₹{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_: any, record: any) => (
        <div className="text-sm text-gray-500">
          <div>Payment: {record.method}</div>
          <div>Receipt: {record.receipt}</div>
          <div>Approved by: {record.approvedBy}</div>
        </div>
      ),
    },
  ];

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
        {/* Expense List */}
        <Col xs={24} lg={16}>
          <Card
            title="Daily Expense Tracking"
            className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Add Expense
              </Button>
            }
          >
            <div className="mb-6">
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
            </div>

            <Table
              columns={expenseColumns}
              dataSource={expenses}
              rowKey="id"
              pagination={false}
              size="middle"
              className="rounded-lg border border-gray-200"
            />
          </Card>
        </Col>

        {/* Category Breakdown */}
        <Col xs={24} lg={8}>
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
        </Col>
      </Row>
    </div>
  );
};
