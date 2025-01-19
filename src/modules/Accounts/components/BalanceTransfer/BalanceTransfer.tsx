import { useState } from "react";
import { Button, Card, Col, Row } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import {
  RangePickerComponent,
  SearchComponent,
} from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { showModal } from "../../../../app/features/modalSlice";
import CreateBalanceTransfer from "./CreateBalanceTransfer";
import { useDispatch } from "react-redux";

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const BalanceTransfer = () => {
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

  const dispatch = useDispatch();

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
CreateBalanceTransfer

          </Col> */}
          {/* <Link to="/passport/create-passport">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Balance Transfer
            </Button>
          </Link> */}

          <Col>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Create Client",
                    content: <CreateBalanceTransfer />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Create Client
            </Button>
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

      {/* <Table size="middle" columns={columns} dataSource={data} /> */}
    </div>
  );
};
export default BalanceTransfer;
