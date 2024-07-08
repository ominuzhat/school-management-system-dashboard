import { useState } from "react";
import { Card, Col, DatePicker, Row } from "antd";
import { columns, data } from "../utils/passportUtils";
import { Table } from "../../../common/CommonAnt";
import {
  CreateCommonButton,
  RangePickerComponent,
  SearchComponent,
} from "../../../common/CommonAnt/CommonSearch/CommonSearch";

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const PassportManagement = () => {
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
      <Card className="mb-5">
        <Row justify="space-between">
          <Col>
            <CreateCommonButton
              to="/passport/create-passport"
              btnName="Create Passport"
            />
          </Col>
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
      <Table total={50} columns={columns} dataSource={data} />
      {/* <Table size="middle" columns={columns} dataSource={data} /> */}
    </div>
  );
};
export default PassportManagement;
