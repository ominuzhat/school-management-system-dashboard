import { useParams } from "react-router-dom";
import { useGetSingleStudentAttendanceListQuery } from "../api/studentAttendanceEndPoints";
import { Table, Tag, Row, Col, Card } from "antd";

const ViewSingleStudentsAttendanceList = () => {
  const { attendanceId } = useParams();

  const {
    data: singleAttendanceData,
    isLoading,
    error,
  } = useGetSingleStudentAttendanceListQuery(Number(attendanceId));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Student Name",
      key: "studentName",
      render: (_: any, record: any) => {
        const { first_name, last_name } = record.admission.student;
        return `${first_name} ${last_name}`;
      },
    },
    {
      title: "Registration Number",
      dataIndex: ["admission", "registration_number"],
      key: "registration_number",
    },
    {
      title: "Grade Level",
      dataIndex: ["admission", "grade_level"],
      key: "grade_level",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          present: "green",
          late: "purple",
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
    const { admission } = record;
    const { student } = admission;

    const subjectColumns = [
      {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
        align: "center",
      },
      {
        title: "Class Teacher",
        dataIndex: "classTeacher",
        key: "classTeacher",
        align: "center",
      },
    ];

    const subjectData = admission.subjects.map((subject: any) => ({
      key: subject.id,
      subject: subject.name,
      classTeacher: subject.grade_level?.class_teacher?.first_name || "N/A",
    }));

    return (
      <div style={{ paddingLeft: "20px" }}>
        <Card className="">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Phone Number:</strong> {student.phone_number}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Enrollment Date:</strong> {student.enrollment_date}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Date of Birth:</strong> {student.date_of_birth}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Guardian Name:</strong> {student.guardian_name}
              </p>
            </Col>
            <Col span={8}>
              <p>
                <strong>Guardian Phone:</strong> {student.guardian_phone_number}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <strong>Address:</strong> {student.address}
              </p>
            </Col>
          </Row>
        </Card>

        <Table
          columns={subjectColumns as any}
          dataSource={subjectData}
          pagination={false}
          rowKey="key"
          bordered
          size="small"
        />
      </div>
    );
  };

  return (
    <div>
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
          expandable={{
            expandedRowRender,
          }}
          rowClassName={(_, index) =>
            index % 2 !== 0 ? "ant-table-row-even" : "ant-table-row-odd"
          }
        />
      )}
    </div>
  );
};

export default ViewSingleStudentsAttendanceList;
