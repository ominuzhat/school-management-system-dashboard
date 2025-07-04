import { useGetSingleCollectionQuery } from "../api/accountEndPoints";
import {
  Card,
  Typography,
  Divider,
  List,
  Avatar,
  Tag,
  Space,
  Grid,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  TransactionOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { useBreakpoint } = Grid;

const ViewCollections = ({ record }: any) => {
  const { data } = useGetSingleCollectionQuery<any>(Number(record));
  const screens = useBreakpoint();
  const collection = data?.data;

  if (!collection) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Typography.Text type="secondary">
          Loading collection data...
        </Typography.Text>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Card
        bordered={false}
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: screens.xs ? "column" : "row",
            gap: "24px",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography.Title
              level={3}
              style={{ color: "#1890ff", marginBottom: "8px" }}
            >
              Collection Summary
            </Typography.Title>
            <Typography.Text type="secondary">
              <CalendarOutlined style={{ marginRight: "8px" }} />
              {dayjs(collection.date).format("MMMM D, YYYY")}
            </Typography.Text>

            <div style={{ marginTop: "24px" }}>
              <Space size="large">
                <div>
                  <Typography.Text
                    strong
                    style={{ display: "block", color: "#595959" }}
                  >
                    Total Collection
                  </Typography.Text>
                  <Typography.Title
                    level={2}
                    style={{ color: "#52c41a", margin: "8px 0 0" }}
                  >
                    ৳{collection.total_collection.toLocaleString()}
                  </Typography.Title>
                </div>
                <div>
                  <Typography.Text
                    strong
                    style={{ display: "block", color: "#595959" }}
                  >
                    Total Transactions
                  </Typography.Text>
                  <Typography.Title
                    level={2}
                    style={{ color: "#1890ff", margin: "8px 0 0" }}
                  >
                    {collection.total_transactions}
                  </Typography.Title>
                </div>
              </Space>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              padding: "16px",
              borderRadius: "8px",
              minWidth: screens.xs ? "100%" : "250px",
            }}
          >
            <Typography.Text
              strong
              style={{ display: "block", marginBottom: "12px" }}
            >
              Collected By
            </Typography.Text>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Avatar
                style={{ backgroundColor: "#f56a00" }}
                icon={<UserOutlined />}
              />
              <Typography.Text strong style={{ textTransform: "capitalize" }}>
                {collection.collected_by}
              </Typography.Text>
            </div>
            <Divider style={{ margin: "16px 0" }} />
            <Typography.Text
              strong
              style={{ display: "block", marginBottom: "8px" }}
            >
              Collection Date
            </Typography.Text>
            <Typography.Text>
              {dayjs(collection.created_at).format("MMMM D, YYYY h:mm A")}
            </Typography.Text>
          </div>
        </div>
      </Card>

      <Card
        title={
          <Space>
            <TransactionOutlined />
            <span>Transaction Details</span>
            <Tag color="blue">
              {collection.transactions.length} transactions
            </Tag>
          </Space>
        }
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <List
          itemLayout="vertical"
          dataSource={collection.transactions}
          renderItem={(transaction: any) => (
            <List.Item
              key={transaction.id}
              style={{
                padding: "16px",
                margin: "8px 0",
                borderRadius: "8px",
                background: "#fafafa",
                borderLeft: `4px solid ${
                  transaction.transaction_type === "credit"
                    ? "#52c41a"
                    : "#f5222d"
                }`,
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor:
                        transaction.transaction_type === "credit"
                          ? "#d9f7be"
                          : "#ffccc7",
                      color:
                        transaction.transaction_type === "credit"
                          ? "#389e0d"
                          : "#cf1322",
                    }}
                    icon={
                      <ArrowUpOutlined
                        rotate={
                          transaction.transaction_type === "debit" ? 180 : 0
                        }
                      />
                    }
                  />
                }
                title={
                  <Typography.Text strong>
                    {transaction.description}
                  </Typography.Text>
                }
                description={
                  <Space direction="vertical" size={4}>
                    <Typography.Text type="secondary">
                      {dayjs(transaction?.transaction_date).format(
                        "MMMM D, YYYY h:mm A"
                      )}
                    </Typography.Text>
                    <Tag
                      color={
                        transaction.transaction_type === "credit"
                          ? "success"
                          : "error"
                      }
                    >
                      {transaction?.transaction_type.toUpperCase()}
                    </Tag>
                  </Space>
                }
              />
              <div style={{ textAlign: "right" }}>
                <Typography.Title
                  level={4}
                  style={{
                    color:
                      transaction.transaction_type === "credit"
                        ? "#52c41a"
                        : "#f5222d",
                    margin: 0,
                  }}
                >
                  {transaction.transaction_type === "credit" ? "+" : "-"}৳
                  {transaction.amount.toLocaleString()}
                </Typography.Title>
                {transaction.account && (
                  <Typography.Text type="secondary">
                    Account: {transaction.account.type}
                  </Typography.Text>
                )}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ViewCollections;
