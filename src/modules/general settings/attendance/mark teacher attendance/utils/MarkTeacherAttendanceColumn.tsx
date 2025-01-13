import { Radio, Space, Button } from "antd";
import { ColumnsType } from "antd/es/table";

const MarkTeachersAttendanceColumns = (
  students: any[],
  statusMap: any,
  setStatusMap: any,
  handleSetAllStatus: any
): ColumnsType<any> => {
  const handleStatusChange = (e: any, recordId: any) => {
    const value = e.target.value;
    setStatusMap((prevStatusMap: any) => ({
      ...prevStatusMap,
      [recordId]: value,
    }));
  };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Teacher Name",
      dataIndex: "studentName",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Father Name",
      dataIndex: "fatherName",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Employee Type",
      dataIndex: "fatherName",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      title: (
        <div className="flex items-center justify-center gap-5">
          <Button onClick={() => handleSetAllStatus("present")}>
            All Present
          </Button>
          <Button onClick={() => handleSetAllStatus("late")}>All Late</Button>
          <Button onClick={() => handleSetAllStatus("absent")}>
            All Absent
          </Button>
        </div>
      ),
      width: 400,
      align: "center",
      render: (record) => (
        <Space>
          <Radio.Group
            onChange={(e) => handleStatusChange(e, record?.id)}
            value={statusMap[record?.id] || "present"}
          >
            <Radio value={"present"}>P</Radio>
            <Radio value={"late"}>L</Radio>
            <Radio value={"absent"}>A</Radio>
          </Radio.Group>
        </Space>
      ),
    },
  ];
};

export default MarkTeachersAttendanceColumns;
