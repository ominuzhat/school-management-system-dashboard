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
import { useNavigate } from "react-router-dom";

const AdmissionSessionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <Row  gutter={[10, 10]} className="flex items-center" >
          {createPermission && (
            <Col lg={2} xs={24}>
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
                Session
              </Button>
            </Col>
          )}
          <Col lg={20}>
            <p
              onClick={() => navigate("/admission")}
              className="w-fit  underline text-blue-400  cursor-pointer"
            >
              Manage Admission
            </p>
          </Col>
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
