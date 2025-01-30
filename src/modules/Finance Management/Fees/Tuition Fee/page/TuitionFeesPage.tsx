import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import { PlusOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetTuitionFeesQuery } from "../api/tuitionFeeEndPoints";
import useTuitionFeesColumns from "../utils/tuitionFeesColumns";
import { IGetTuitionFee } from "../type/tuitionFeeTypes";
import CreateTuitionFees from "../component/CreateTuitionFees";

const TuitionFeesPage = () => {
  const dispatch = useDispatch();
  const { data: tuitionFees, isLoading } = useGetTuitionFeesQuery({});
  const [search, setSearch] = useState("");

  const dataLength =
    (tuitionFees?.data as IGetTuitionFee[] | undefined)?.length ?? 0;

  const dataSource = (tuitionFees?.data as IGetTuitionFee[] | undefined) ?? [];

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
                    title: "Add Tuition Fees",
                    content: <CreateTuitionFees />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Tuition Fees
            </Button>
          </Col>
          <Col lg={10} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
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
        total={dataLength}
        dataSource={dataSource}
        columns={useTuitionFeesColumns()}
      />
    </div>
  );
};

export default TuitionFeesPage;
