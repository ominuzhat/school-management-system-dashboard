/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import CreateShift from "../components/CreateShift";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const ShiftPage = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  // const columns = useShiftColumns();

  const dispatch = useDispatch();
  // const { page_size, page } = useAppSelector(FilterState);

  // const {
  //   data: shiftList,
  //   isLoading,
  //   isFetching,
  //   refetch,
  // } = useGetShiftQuery({
  //   page_size: page_size,
  //   page: Number(page) || undefined,
  // });

  // const dataLength = (shiftList?.data as IGetShift[] | undefined)?.length ?? 0;

  // const dataSource = (shiftList?.data as IGetShift[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.shift,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.shift,
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
          )}
        </Row>
      </Card>
      {viewPermission ? (
        "k"
      ) : (
        // <Table
        //   rowKey={"id"}
        //   loading={isLoading || isFetching}
        //   refetch={refetch}
        //   total={dataLength}
        //   dataSource={dataSource}
        //   columns={columns}
        // />
        <NoPermissionData />
      )}
    </div>
  );
};

export default ShiftPage;
