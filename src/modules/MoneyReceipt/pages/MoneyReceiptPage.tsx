import { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import {
  RangePickerComponent,
  SearchComponent,
} from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const MoneyReceiptPage = () => {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  console.log("date Range", dateRange);
  const handleDateRangeChange = (dates: [string | null, string | null]) => {
    setDateRange(dates);
  };

  const handleSearch = (value: string) => {
    console.log("Search Value:", value);
  };
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card className="mb-5">
        <Row justify="space-between">
          {/* <Col>
            <CreateCommonButton
              to="/passport/create-passport"
              btnName="Create Passport"
            />
          </Col> */}
          <Link to="/moneyreceipt/add">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Money Receipt
            </Button>
          </Link>
          <Col>
            <Row justify="space-between" gutter={16}>
              <Col lg={12} md={12} sm={24}>
                <RangePickerComponent
                  onChange={handleDateRangeChange}
                  format="YYYY-MM-DD"
                />
              </Col>
              <Col lg={12} md={12} sm={24}>
                <SearchComponent
                  onSearch={handleSearch}
                  placeholder="Enter Your Invoice"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* <Table size="middle" columns={columns} dataSource={data} /> */}
    </div>
  );
};

export default MoneyReceiptPage;
