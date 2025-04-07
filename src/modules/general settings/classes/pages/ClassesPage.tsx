import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateClass from "../components/CreateClass";
import { useGetClassesQuery } from "../api/classesEndPoints";
import useClassesColumns from "../utils/ClassesColumns";
import { IClasses } from "../type/classesType";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const ClassesPage = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useClassesColumns();

  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: classList,
    isLoading,
    isFetching,
    refetch,
  } = useGetClassesQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (classList?.data as IClasses[] | undefined)?.length ?? 0;

  const dataSource = (classList?.data as IClasses[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradelevel,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradelevel,
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
                      title: "Add Class",
                      content: <CreateClass />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Class
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

export default ClassesPage;
