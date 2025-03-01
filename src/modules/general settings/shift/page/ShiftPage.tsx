import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";

import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { IGetShift } from "../type/shiftTypes";
import { useGetShiftQuery } from "../api/shiftEndPoints";
import useShiftColumns from "../utils/ShiftColumns";
import CreateShift from "../components/CreateShift";

const ShiftPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: shiftList,
    isLoading,
    isFetching,
    refetch,
  } = useGetShiftQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (shiftList?.data as IGetShift[] | undefined)?.length ?? 0;

  const dataSource = (shiftList?.data as IGetShift[] | undefined) ?? [];

  return (
    <div className="space-y-5">
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
                    title: "Add Shift",
                    content: <CreateShift />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Shift
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        rowKey={"id"}
        loading={isLoading || isFetching}
        refetch={refetch}
        total={dataLength}
        dataSource={dataSource}
        columns={useShiftColumns()}
      />
    </div>
  );
};

export default ShiftPage;
