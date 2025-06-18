import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useGetAccountQuery } from "../api/accountEndPoints";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../../app/features/modalSlice";
import useAccountColumns from "../utils/accountColumns";
import { IGetAccount } from "../types/accountTypes";
import CreateAccount from "../components/CreateAccount";
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

const AccountPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useAccountColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.add
  );

  const {
    data: accountList,
    isLoading,
    isFetching,
    refetch,
  } = useGetAccountQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (accountList?.data as IGetAccount[] | any)?.length ?? 0;

  const dataSource = (accountList?.data as IGetAccount[] | undefined) ?? [];

  console.log(accountList, "accountList");

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
                      title: "Add Account",
                      content: <CreateAccount />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Account
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

export default AccountPage;
