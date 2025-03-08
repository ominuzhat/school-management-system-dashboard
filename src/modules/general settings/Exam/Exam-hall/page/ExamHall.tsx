import { Button, Card, Col, Row } from "antd";

import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { IGetExamHall } from "../Type/examHallType";
import { useGetExamHallQuery } from "../api/examHallEndPoints";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../../app/features/modalSlice";
import { Table } from "../../../../../common/CommonAnt";
import useExamHallColumns from "../utils/ExamColumns";
import CreateExamHall from "../Components/CreateExamHall";

const ExamHallPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: examHallList,
    isLoading,
    isFetching,
    refetch,
  } = useGetExamHallQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (examHallList?.data as IGetExamHall[] | undefined)?.length ?? 0;

  const dataSource = (examHallList?.data as IGetExamHall[] | undefined) ?? [];

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
                    title: "Add Exam Hall",
                    content: <CreateExamHall />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Exam Hall
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
        columns={useExamHallColumns()}
      />
    </div>
  );
};

export default ExamHallPage;
