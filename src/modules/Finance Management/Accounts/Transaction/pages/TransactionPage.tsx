import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../../app/features/modalSlice";
import { useGetTransactionQuery } from "../api/transactionEndPoints";
import { IGetTransaction } from "../types/transactionTypes";
import useTransactionColumns from "../utils/transactionColumns";
import CreateTransaction from "../components/CreateTransaction";
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

const TransactionPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useTransactionColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.add
  );

  const {
    data: transactionList,
    isLoading,
    isFetching,
    refetch,
  } = useGetTransactionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (transactionList?.data?.results as IGetTransaction[] | undefined)?.length ??
    0;

  const dataSource =
    (transactionList?.data?.results as IGetTransaction[] | undefined) ?? [];

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
                      title: "Add Transaction",
                      content: <CreateTransaction />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Transaction
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

export default TransactionPage;
