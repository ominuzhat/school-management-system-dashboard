import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";

const useStudentsAttendanceListColumns = (): ColumnsType<any> => {
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
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      key: "2",
      title: "Session Name",
      dataIndex: "session",
      align: "center",
      render: (session) => (session ? session.name : "-"),
    },
    {
      key: "3",
      title: "Class Name",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level.name : "-"),
    },
    {
      key: "4",
      title: "Class Description",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level.description : "-"),
    },
    {
      key: "5",
      title: "Class Teacher",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) =>
        grade_level?.class_teacher
          ? `${grade_level.class_teacher.first_name} ${grade_level.class_teacher.last_name}`
          : "-",
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
      title: "Total Half",
      dataIndex: "total_half",
      align: "center",
      render: (total_half) => <Tag color="blue">{total_half || 0}</Tag>,
    },
    {
      key: "9",
      title: "Total Records",
      dataIndex: "total_record",
      align: "center",
      render: (total_record) => (total_record ? total_record : "-"),
    },
    {
      key: "10",
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <ViewButton to={`${record?.id}`} />
        </Space>
      ),
    },
  ];
};

export default useStudentsAttendanceListColumns;
