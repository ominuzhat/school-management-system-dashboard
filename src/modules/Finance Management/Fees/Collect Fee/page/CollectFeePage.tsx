import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { PlusOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetCollectFeesQuery } from "../api/collectFeeEndPoints";
import useCollectFeeColumns from "../utils/collectFeeColumns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";

const CollectFeePage = () => {
  const [search, setSearch] = useState("");

  const { page_size, currentPage } = useSelector(
    (state: RootState) => state.filter
  );

  const { data: collectFee, isLoading } = useGetCollectFeesQuery({
    search: search,
    page_size: page_size,
    page: currentPage,
  });

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Link to={"/collect-fee"}>
              <Button type="primary" icon={<PlusOutlined />} className="w-full">
                Add Collect Fee
              </Button>
            </Link>
          </Col>
          <Col lg={6} xs={24}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Search Additional"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={collectFee?.data?.count}
        dataSource={collectFee?.data?.results}
        columns={useCollectFeeColumns()}
      />
    </div>
  );
};

export default CollectFeePage;
