import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";

const useStudentsAttendanceListColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      key: "2",
      title: "Session Name",
      dataIndex: "session",
      align: "center",
      render: (session) => (session ? session.name : "N/A"),
    },
    {
      key: "3",
      title: "Class Name",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level.name : "N/A"),
    },
    {
      key: "4",
      title: "Class Description",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level.description : "N/A"),
    },
    {
      key: "5",
      title: "Class Teacher",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) =>
        grade_level?.class_teacher
          ? `${grade_level.class_teacher.first_name} ${grade_level.class_teacher.last_name}`
          : "N/A",
    },
    {
      key: "6",
      title: "Total Present",
      dataIndex: "total_present",
      align: "center",
      render: (total_present) => <Tag color="green">{total_present || 0}</Tag>,
    },
    {
      key: "7",
      title: "Total Absent",
      dataIndex: "total_absent",
      align: "center",
      render: (total_absent) => <Tag color="red">{total_absent || 0}</Tag>,
    },
    {
      key: "8",
      title: "Total Leave",
      dataIndex: "total_leave",
      align: "center",
      render: (total_leave) => <Tag color="blue">{total_leave || 0}</Tag>,
    },
    {
      key: "9",
      title: "Total Records",
      dataIndex: "total_record",
      align: "center",
      render: (total_record) => (total_record ? total_record : "N/A"),
    },
    {
      key: "10",
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {/* Add actions like edit, view, or delete here */}
        </Space>
      ),
    },
  ];
};

export default useStudentsAttendanceListColumns;
