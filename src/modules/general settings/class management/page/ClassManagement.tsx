import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Statistic,
  Form as AntForm,
  Form,
} from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { IoMdBook } from "react-icons/io";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { showModal } from "../../../../app/features/modalSlice";
import CreateClass from "../../classes/components/CreateClass";
import {
  useCreateClassesMutation,
  useGetClassesQuery,
} from "../../classes/api/classesEndPoints";
import { IClasses } from "../../classes/type/classesType";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import UpdateClass from "../../classes/components/UpdateClass";
import { MdFilterTiltShift } from "react-icons/md";
import { Table } from "../../../../common/CommonAnt";
import NoPermissionData from "../../../../utilities/NoPermissionData";
import { IGetShift } from "../../shift/type/shiftTypes";
import { useGetShiftQuery } from "../../shift/api/shiftEndPoints";
import useShiftColumns from "../../shift/utils/ShiftColumns";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import CreateShift from "../../shift/components/CreateShift";
import CreateSubject from "../../subjects/components/CreateSubjects";
import { LuBookOpenText } from "react-icons/lu";
import useSubjectColumns from "../../subjects/utils/SubjectsColumns";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";

const ClassManagement = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const [form] = AntForm.useForm();
  const gradeLevel = AntForm.useWatch("grade_level", form);

  const dispatch = useDispatch();
  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradelevel,
    actionNames.change
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradelevel,
    actionNames.add
  );
  const [create, { isLoading, isSuccess }] = useCreateClassesMutation();

  const { data: classData, isFetching: isFetchingClasses } = useGetClassesQuery(
    {}
  );

  const columns = useShiftColumns();

  const { page_size, page } = useAppSelector(FilterState);
  const {
    data: shiftList,
    isFetching,
    refetch,
  } = useGetShiftQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (shiftList?.data as IGetShift[] | undefined)?.length ?? 0;

  const dataSource = (shiftList?.data as IGetShift[] | undefined) ?? [];

  const viewShiftPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.shift,
    actionNames.view
  );
  const createShiftPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.shift,
    actionNames.add
  );

  const subjectColumns = useSubjectColumns();

  const { data: getSubjectsData } = useGetSubjectsQuery({
    gradelevel: gradeLevel,
    page_size: 900,
    page: Number(page) || undefined,
  });

  const viewSubjectsPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
    actionNames.view
  );
  const createSubjectsPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
    actionNames.add
  );

  const onFinish = (values: any): void => {
    // create(values);
  };

  return (
    <Card>
      <div className="text-center space-y-1">
        <h1 className="text-4xl font-semibold">Class Setup & Management</h1>
        <p className="font-sans text-slate-500">
          Configure your class with subjects, sections, and shift
        </p>
      </div>
      <Row gutter={[16, 16]} className="mt-5">
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-green-100">Class</span>}
              value={"0"}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<CheckCircleOutlined className="text-green-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-yellow-100">Sections</span>}
              value={"0"}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<ExclamationCircleOutlined className="text-yellow-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-blue-100">Subjects</span>}
              value={"0"}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<UsergroupAddOutlined className="text-blue-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-purple-100">Due Students</span>}
              value={"0"}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<UsergroupDeleteOutlined className="text-purple-100" />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-5">
        <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <Card
                className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
                title={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IoMdBook className="text-blue-600 mr-2" />
                      <span>Class Information</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      {gradeLevel && updatePermission && (
                        <EditButton
                          onClick={() =>
                            dispatch(
                              showModal({
                                title: "Update Class",
                                content: <UpdateClass record={gradeLevel} />,
                              })
                            )
                          }
                        />
                      )}

                      {createPermission && (
                        <Col lg={24} xs={24}>
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
                          >
                            Add Class
                          </Button>
                        </Col>
                      )}
                    </div>
                  </div>
                }
              >
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <Form.Item<any> label="Class" name="grade_level">
                        <Select
                          loading={isFetchingClasses}
                          placeholder="Select class"
                          allowClear
                        >
                          {Array.isArray(classData?.data) &&
                            classData?.data?.map((classItem: IClasses) => (
                              <Select.Option
                                key={classItem.id}
                                value={classItem.id}
                              >
                                {classItem.name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col lg={24}>
              {gradeLevel && (
                <Card
                  className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
                  title={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <LuBookOpenText className="text-blue-600 mr-2" />
                        <span>Subjects Information</span>
                      </div>
                      <div className="flex items-center justify-between ">
                        {createSubjectsPermission && (
                          <Col lg={24} xs={24}>
                            <Button
                              type="primary"
                              onClick={() =>
                                dispatch(
                                  showModal({
                                    title: "Add Subjects",
                                    content: <CreateSubject />,
                                  })
                                )
                              }
                              icon={<PlusOutlined />}
                            >
                              Add Subjects
                            </Button>
                          </Col>
                        )}
                      </div>
                    </div>
                  }
                >
                  {/* {viewSubjectsPermission ? (
                  <Table
                    rowKey="id"
                    loading={isLoading || isFetching}
                    dataSource={transformedData}
                    columns={columns}
                    pagination={false}
                  />
                ) : (
                  <NoPermissionData />
                )} */}

                  {/* {viewShiftPermission ? (
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
                )} */}
                </Card>
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14}>
          <Card
            className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MdFilterTiltShift className="text-blue-600 mr-2" />
                  <span>Shift Information</span>
                </div>
                <div className="flex items-center justify-between ">
                  {createShiftPermission && (
                    <Col lg={24} xs={24}>
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
                      >
                        Add Shift
                      </Button>
                    </Col>
                  )}
                </div>
              </div>
            }
          >
            {viewShiftPermission ? (
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
        </Col>
      </Row>
    </Card>
  );
};

export default ClassManagement;
