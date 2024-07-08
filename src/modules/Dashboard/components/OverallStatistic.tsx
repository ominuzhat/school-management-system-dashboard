import { Card, Col, Flex, Row, Typography } from "antd";
import React from "react";

const statistic = [
  {
    title: "Total Collection",
    count: 153,
  },
  {
    title: "Today Expense",
    count: 47,
  },
  {
    title: "Today Earning",
    count: 25,
  },
  {
    title: "Total Client",
    count: 13,
  },
];

const OverallStatistic: React.FC = () => {
  return (
    <React.Fragment>
      <Row gutter={[10, 10]}>
        {statistic.map(({ title, count }) => (
          <Col span={24} md={12} lg={6}>
            <Card>
              <Flex justify="space-between" align="start">
                <div>
                  <Typography.Text strong style={{ display: "block" }}>
                    {title}
                  </Typography.Text>
                  <Typography.Text
                    strong
                    style={{ display: "block", fontSize: "3rem" }}
                  >
                    {count}
                  </Typography.Text>
                  <Typography.Text
                    type="secondary"
                    style={{ display: "block" }}
                  >
                    <Typography.Text strong type="success">
                      +1.2%
                    </Typography.Text>{" "}
                    from last week
                  </Typography.Text>
                </div>
                <div>
                  {/* <Iconify name="maki:restaurant-pizza" width={50} /> */}
                </div>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default OverallStatistic;
