import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../../app/features/modalSlice";

import { Table } from "../../../../../common/CommonAnt";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { useGetCashQuery } from "../api/cashEndPoints";
import { IGetCash } from "../types/cashTypes";
import useCashColumns from "../utils/cashColumns";
import CreateCash from "../components/CreateCash";

const CashPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useCashColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.add
  );

  const {
    data: transactionList,
    isLoading,
    isFetching,
    refetch,
  } = useGetCashQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (transactionList?.data?.results as IGetCash[] | undefined)?.length ?? 0;

  const dataSource =
    (transactionList?.data?.results as IGetCash[] | undefined) ?? [];

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
                      title: "Add Cash",
                      content: <CreateCash />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Cash
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

export default CashPage;
