import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateFees from "../components/CreateFees";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../../common/CommonAnt";
import { useGetFeesQuery } from "../api/feesEndpoints";
import useFeesColumns from "../utils/FeesColumns";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

const FeesPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useFeesColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.feestructure,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.feestructure,
    actionNames.add
  );

  const {
    data: feesList,
    isLoading,
    isFetching,
    refetch,
  } = useGetFeesQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (feesList?.data as any[] | undefined)?.length ?? 0;

  const dataSource = (feesList?.data as any[] | undefined) ?? [];

  return (
    <div>
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
          )}
        </Row>
      </Card>

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
    </div>
  );
};

export default FeesPage;
