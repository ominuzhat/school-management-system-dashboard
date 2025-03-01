import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import { PlusOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetAdditionalFeesQuery } from "../api/additionalFeeEndPoints";
import useAdditionalFeesColumns from "../utils/additionalFeesColumns";
import CreateAdditionalFees from "../component/CreateAdditionalFees";
import { IGetAdditionalFee } from "../type/additionalFeeTypes";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";

const AdditionalFeesPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: additionalFee,
    isLoading,
    isFetching,
    refetch,
  } = useGetAdditionalFeesQuery({
    search: search,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (additionalFee?.data as IGetAdditionalFee[] | undefined)?.length ?? 0;

  const dataSource =
    (additionalFee?.data as IGetAdditionalFee[] | undefined) ?? [];

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
                    title: "Add Additional Fees",
                    content: <CreateAdditionalFees />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Additional Fees
            </Button>
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
        rowKey={"id"}
        loading={isLoading || isFetching}
        refetch={refetch}
        total={dataLength}
        dataSource={dataSource}
        columns={useAdditionalFeesColumns()}
      />
    </div>
  );
};

export default AdditionalFeesPage;
