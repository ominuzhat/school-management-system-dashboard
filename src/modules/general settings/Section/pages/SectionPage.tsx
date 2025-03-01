import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetSectionQuery } from "../api/sectionEndPoints";
import CreateSection from "../components/CreateSection";
import useSectionColumns from "../utils/SectionColumns";
import { IGetSection } from "../types/sectionTypes";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";

const SectionPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: getSectionData,
    isLoading,
    isFetching,
    refetch,
  } = useGetSectionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (getSectionData?.data as IGetSection[] | undefined)?.length ?? 0;

  const dataSource = (getSectionData?.data as IGetSection[] | undefined) ?? [];

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
                    title: "Add Section",
                    content: <CreateSection />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Section
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={dataLength}
          dataSource={dataSource}
          columns={useSectionColumns()}
        />
      </Card>
    </div>
  );
};

export default SectionPage;
