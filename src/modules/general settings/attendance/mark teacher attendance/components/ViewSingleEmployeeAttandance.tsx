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
        return person ? `${person.first_name} ${person.last_name}` : "N/A";
      },
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: any) => {
        const person = record.employee || record.teacher;
        return person?.email || "N/A";
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
                <strong>Email:</strong> {person?.email || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Phone:</strong> {person?.phone_number || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Hire Date:</strong> {person?.hire_date || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Base Salary:</strong> {person?.base_salary || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Position:</strong> {person?.position || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Department:</strong> {person?.department?.name || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Username:</strong> {user?.username || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Role:</strong> {user?.role?.name || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Institution:</strong>{" "}
                {user?.role?.institution?.name || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Joined:</strong> {user?.date_joined || "N/A"}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Last Login:</strong> {user?.last_login || "N/A"}
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
