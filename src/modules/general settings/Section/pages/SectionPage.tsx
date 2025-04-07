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
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const SectionPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useSectionColumns();

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

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.section,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.section,
    actionNames.add
  );

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
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
          )}
        </Row>
      </Card>
      <Card>
        {viewPermission ? (
          <Table
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={dataLength}
            dataSource={dataSource}
            columns={columns}
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default SectionPage;
