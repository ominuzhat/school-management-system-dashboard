import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetAdmissionSessionQuery } from "../api/admissionSessionEndPoints";
import useAdmissionSessionsColumns from "../utils/admissionSessionColumns";
import CreateAdmissionSessions from "../components/CreateAdmissionSessions";
import { IAdmissionSession } from "../type/admissionSessionType";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const AdmissionSessionPage = () => {
  const dispatch = useDispatch();

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useAdmissionSessionsColumns();

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: getAdmissionSessions,
    isLoading,
    isFetching,
    refetch,
  } = useGetAdmissionSessionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (getAdmissionSessions?.data as IAdmissionSession[] | undefined)?.length ??
    0;

  const dataSource =
    (getAdmissionSessions?.data as IAdmissionSession[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionsession,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionsession,
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
                      title: "Add Admission Session",
                      content: <CreateAdmissionSessions />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Admission Session
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

export default AdmissionSessionPage;
