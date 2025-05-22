import type { ColumnsType } from "antd/es/table";

const useTeacherSubjectsColumns = (): ColumnsType<any> => {
  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Subjects Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "2",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) => (grade_level ? grade_level?.name : "N/A"),
    },
  ];
};

export default useTeacherSubjectsColumns;
