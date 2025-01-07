import { Card, Col, Flex, Row, Typography } from "antd";
import React from "react";

const statistic = [
  {
    id: 1,
    title: "Total Collection",
    count: 153,
  },
  {
    id: 2,
    title: "Today Expense",
    count: 47,
  },
  {
    id: 3,
    title: "Today Earning",
    count: 25,
  },
  {
    id: 4,
    title: "Total Client",
    count: 13,
  },
];

const OverallStatistic: React.FC = () => {
  return (
    <React.Fragment>
      <Row gutter={[10, 10]}>
        {statistic.map(({ title, count, id }) => (
          <Col span={24} md={12} lg={6} key={count}>
            <Card
              className={
                id === 1
                  ? "bg-gradient-to-r from-[#1d97a3] to-[#14141428]"
                  : id === 2
                  ? "bg-gradient-to-r from-[#1da381] to-[#14141428]"
                  : id === 3
                  ? "bg-gradient-to-r from-[#1d57a3] to-[#1414141f]"
                  : "bg-gradient-to-r from-[#a31d91be] to-[#14141444]"
              }
            >
              <Flex justify="space-between" align="start">
                <div>
                  <Typography.Text
                    strong
                    style={{ display: "block", color: "white" }}
                  >
                    {title}
                  </Typography.Text>
                  <Typography.Text
                    strong
                    style={{
                      display: "block",
                      fontSize: "3rem",
                      color: "white",
                    }}
                  >
                    {count}
                  </Typography.Text>
                  <Typography.Text
                    type="secondary"
                    style={{ display: "block", color: "white" }}
                  >
                    <Typography.Text strong type="warning">
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
