import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateSubjects from "../components/CreateSubjects";
import { useGetSubjectsQuery } from "../api/subjectsEndPoints";
import useSubjectColumns from "../utils/SubjectsColumns";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const SubjectsPage = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useSubjectColumns();

  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: getSubjectsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetSubjectsQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
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
                      title: "Add Subjects",
                      content: <CreateSubjects />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Subjects
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
            total={getSubjectsData?.data?.count}
            dataSource={getSubjectsData?.data?.results}
            columns={columns}
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default SubjectsPage;
