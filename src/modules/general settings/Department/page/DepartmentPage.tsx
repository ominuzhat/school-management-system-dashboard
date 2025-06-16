import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetDepartmentQuery } from "../api/departmentEndPoints";
import CreateDepartmentModal from "../components/CreateDepartmentModal";
import useDepartmentColumns from "../utils/departmentColumns";
import { IGetDepartment } from "../types/departmentType";
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

const DepartmentPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useDepartmentColumns();
  const navigate = useNavigate();

  const {
    data: departmentData,
    isLoading,
    isFetching,
    refetch,
  } = useGetDepartmentQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (departmentData?.data as IGetDepartment[] | undefined)?.length ?? 0;

  const dataSource =
    (departmentData?.data as IGetDepartment[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.department,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.department,
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
                      title: "Add Department ",
                      content: <CreateDepartmentModal />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Department
              </Button>

              <Col lg={10}>
                <p
                  onClick={() => navigate("/employees")}
                  className="w-fit  underline text-blue-400  cursor-pointer"
                >
                  Manage Employee
                </p>
              </Col>
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

export default DepartmentPage;
