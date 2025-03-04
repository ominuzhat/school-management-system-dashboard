import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";

import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetExamQuery } from "../api/examEndPoints";
import { IGetExam } from "../type/examType";
import useExamColumns from "../utils/ExamColumns";
import { Link } from "react-router-dom";

const ExamPage = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: examList,
    isLoading,
    isFetching,
    refetch,
  } = useGetExamQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (examList?.data as IGetExam[] | undefined)?.length ?? 0;

  const dataSource = (examList?.data as IGetExam[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Link to={"/exam/create"}>
              <Button type="primary" icon={<PlusOutlined />} className="w-full">
                Add Exam
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>

      <Table
        rowKey={"id"}
        loading={isLoading || isFetching}
        refetch={refetch}
        total={dataLength}
        dataSource={dataSource}
        columns={useExamColumns()}
      />
    </div>
  );
};

export default ExamPage;
