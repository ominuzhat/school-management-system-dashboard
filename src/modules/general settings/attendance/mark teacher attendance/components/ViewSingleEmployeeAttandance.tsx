import { useParams } from "react-router-dom";
import { Table, Tag, Row, Col, Card } from "antd";
import { useGetSingleEmployeeAttendanceQuery } from "../api/teacherAttendanceEndPoints";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";

const ViewSingleEmployeeAttendance = () => {
  const { attendanceId } = useParams();
  const {
    data: singleAttendanceData,
    isLoading,
    error,
  } = useGetSingleEmployeeAttendanceQuery(Number(attendanceId));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, record: any) => {
        const person = record.employee || record.teacher;
        return person ? `${person.first_name} ${person.last_name}` : "-";
      },
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: any) => {
        const person = record.employee || record.teacher;
        return person?.email || "-";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          present: "green",
          leave: "purple",
          absent: "red",
        };
        return (
          <Tag color={statusColors[status] || "default"}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const expandedRowRender = (record: any) => {
    const person = record.employee || record.teacher;
    const user = person?.user;

    return (
      <div style={{ paddingLeft: "20px" }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <p>
                <strong>Email:</strong> {person?.email || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Phone:</strong> {person?.phone_number || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Hire Date:</strong> {person?.hire_date || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Base Salary:</strong> {person?.base_salary || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Position:</strong> {person?.position || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Department:</strong> {person?.department?.name || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Username:</strong> {user?.username || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Role:</strong> {user?.role?.name || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Institution:</strong>{" "}
                {user?.role?.institution?.name || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Joined:</strong> {user?.date_joined || "-"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Last Login:</strong> {user?.last_login || "-"}
              </p>
            </Col>
          </Row>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      {error ? (
        <div>Error loading attendance data</div>
      ) : (
        <Table
          bordered
          loading={isLoading}
          dataSource={singleAttendanceData?.data?.records || []}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          expandable={{ expandedRowRender }}
          rowClassName={(_, index) =>
            index % 2 !== 0 ? "ant-table-row-even" : "ant-table-row-odd"
          }
        />
      )}
    </div>
  );
};

export default ViewSingleEmployeeAttendance;
