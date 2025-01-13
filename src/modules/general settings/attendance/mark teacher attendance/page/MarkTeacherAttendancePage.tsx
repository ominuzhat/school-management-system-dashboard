import { Button, Card, Col, DatePicker, Row, Select, Table } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import Iconify from "../../../../../common/IconifyConfig/IconifyConfig";
import { useState } from "react";
import MarkTeachersAttendanceColumns from "../utils/MarkTeacherAttendanceColumn";

const dataSource = [
  {
    key: "1",
    id: "101",
    photo: "https://via.placeholder.com/50", // Placeholder for student photo
    studentName: "John Doe",
    fatherName: "Michael Doe",
    status: "",
    description: "john Doe has due",
  },
  {
    key: "2",
    id: "102",
    photo: "https://via.placeholder.com/50",
    studentName: "Jane Smith",
    fatherName: "Robert Smith",
    status: "",
  },
  {
    key: "3",
    id: "103",
    photo: "https://via.placeholder.com/50",
    studentName: "Emily Johnson",
    fatherName: "David Johnson",
    status: "",
  },
];

const MarkTeachersAttendance = () => {
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>(
    dataSource.reduce((acc, student) => {
      acc[student.id] = student.status || "present";
      return acc;
    }, {} as { [key: string]: string })
  );

  const handleSetAllStatus = (status: string) => {
    const updatedStatusMap: { [key: string]: string } = {};
    dataSource.forEach((student) => {
      updatedStatusMap[student.id] = status;
    });
    setStatusMap(updatedStatusMap);
  };

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" align="middle" gutter={[10, 10]}>
          <Col lg={8}>
            <Row gutter={[16, 16]}>
              <Col lg={12} xs={24}>
                <DatePicker
                  className="w-full"
                  defaultValue={dayjs()}
                  format="YYYY-MM-DD"
                />
              </Col>
              <Col lg={12} xs={24}>
                <Select placeholder="Select Class" className="w-full">
                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Col>
            </Row>
          </Col>

          <Col lg={4} xs={24}>
            <Button
              type="primary"
              htmlType="submit"
              loading={false}
              icon={<Iconify name="iconamoon:send-fill" />}
              className="w-full"
            >
              Submit Attendance
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={MarkTeachersAttendanceColumns(
          dataSource,
          statusMap,
          setStatusMap,
          handleSetAllStatus
        )}
        dataSource={dataSource}
        pagination={false}
        loading={false}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
      {/* <Table
          loading={false}
          total={0}
          dataSource={dataSource}
          columns={MarkStudentsAttendanceColumns(
            dataSource,
            statusMap,
            setStatusMap,
            handleSetAllStatus
          )}
          pagination={false}
        /> */}
    </div>
  );
};

export default MarkTeachersAttendance;
