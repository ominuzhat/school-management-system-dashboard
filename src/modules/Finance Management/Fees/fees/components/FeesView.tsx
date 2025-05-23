/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useGetSingleFeesQuery } from "../api/feesEndpoints";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { Badge, Col, Row, Table, Card, Divider, Grid, Tag } from "antd";
import useClassesColumns from "../utils/ClassesColumns";
import useSingleFeesColumns from "../utils/FessColumns";
import { ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../../../../common/capitalize/Capitalize";

const { useBreakpoint } = Grid;

const FeesView = () => {
  const { feesId } = useParams();
  const { data, isLoading } = useGetSingleFeesQuery(Number(feesId));
  const screens = useBreakpoint();

  const { fee_type, grade_level, fees } = data?.data || {};

  // Responsive layout configuration
  const getTableSpan = () => {
    if (screens.xxl) return 12;
    if (screens.xl) return 12;
    if (screens.lg) return 12;
    if (screens.md) return 24;
    if (screens.sm) return 24;
    return 24;
  };

  // Safe capitalize function
  const safeCapitalize = (str: string | undefined) => {
    return str ? capitalize(str) : "Fee Details";
  };

  return (
    <div className="fees-view-container">
      <div className="my-4">
        <BreadCrumb />
      </div>

      {/* Header Section */}
      <Card className="fees-header-card" bordered={false}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {safeCapitalize(fee_type)}
            </h1>
            <Tag color="blue" className="mt-2 text-sm md:text-base">
              Fee Management
            </Tag>
          </div>
          <div className="mt-3 md:mt-0">
            <Tag
              color="green"
              icon={<ArrowUpOutlined />}
              className="text-sm md:text-base"
            >
              Active
            </Tag>
          </div>
        </div>
      </Card>

      {/* Statistics Section */}
      {/* <Row gutter={[16, 16]} className="my-6">
        <Col
          xs={24}
          sm={24}
          md={getStatisticSpan()}
          lg={getStatisticSpan()}
          xl={6}
          xxl={6}
        >
          <Card className="stat-card student-stat" bordered={false}>
            <Statistic
              title="Total Students"
              value={totalStudents}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={getStatisticSpan()}
          lg={getStatisticSpan()}
          xl={6}
          xxl={6}
        >
          <Card className="stat-card class-stat" bordered={false}>
            <Statistic
              title="Total Classes"
              value={totalClasses}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={getStatisticSpan()}
          lg={getStatisticSpan()}
          xl={6}
          xxl={6}
        >
          <Card className="stat-card subject-stat" bordered={false}>
            <Statistic
              title="Total Subjects"
              value={totalSubjects}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={getStatisticSpan()}
          lg={getStatisticSpan()}
          xl={6}
          xxl={6}
        >
          <Card className="stat-card fee-stat" bordered={false}>
            <Statistic
              title="Total Fees Amount"
              value={totalFeesAmount}
              prefix={<MoneyCollectOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row> */}

      <Divider className="custom-divider" />

      {/* Data Tables Section */}
      <Row gutter={[16, 16]}>
        {grade_level && grade_level.length > 0 && (
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={getTableSpan()}
            xl={getTableSpan()}
            xxl={getTableSpan()}
          >
            <Badge.Ribbon
              text="Classes"
              placement="start"
              color="blue"
              className="table-ribbon"
            >
              <Card className="data-table-card">
                <Table
                  loading={isLoading}
                  pagination={false}
                  dataSource={grade_level}
                  columns={useClassesColumns()}
                  scroll={{ x: true }}
                  size={screens.xs ? "small" : "middle"}
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        )}

        {fees && fees.length > 0 && (
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={getTableSpan()}
            xl={getTableSpan()}
            xxl={getTableSpan()}
          >
            <Badge.Ribbon
              text="Fees"
              placement="start"
              color="red"
              className="table-ribbon"
            >
              <Card className="data-table-card">
                <Table
                  loading={isLoading}
                  pagination={false}
                  dataSource={fees}
                  columns={useSingleFeesColumns()}
                  scroll={{ x: true }}
                  size={screens.xs ? "small" : "middle"}
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FeesView;
