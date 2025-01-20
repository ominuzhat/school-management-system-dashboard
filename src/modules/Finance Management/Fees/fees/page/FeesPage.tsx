import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateFees from "../components/CreateFees";
import { PlusOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetFeesQuery } from "../api/feesEndpoints";
import useFeesColumns from "../utils/FeesColumns";

const FeesPage = () => {
  const dispatch = useDispatch();
  const { data: feesList, isLoading } = useGetFeesQuery({});

  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Fees",
                    content: <CreateFees />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Fees
            </Button>
          </Col>
          <Col lg={10} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={12} xs={12}>
                <Select placeholder="Select Class" className="w-full">
                  {/* {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category?.id}>
                    {category?.name}
                  </Select.Option>
                ))} */}

                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Col>
              <Col lg={12} xs={12}>
                <SearchComponent
                  onSearch={(value) => setSearch(value)}
                  placeholder="Search students"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={feesList?.data && feesList?.data?.length}
        dataSource={feesList?.data && feesList?.data}
        columns={useFeesColumns()}
      />
    </div>
  );
};

export default FeesPage;
