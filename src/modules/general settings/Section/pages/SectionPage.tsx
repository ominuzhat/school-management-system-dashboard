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

const SectionPage = () => {
  const dispatch = useDispatch();
  const { data: getSectionData, isLoading } = useGetSectionQuery({});
  
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
          loading={isLoading}
          total={dataLength}
          dataSource={dataSource}
          columns={useSectionColumns()}
        />
      </Card>
    </div>
  );
};

export default SectionPage;
