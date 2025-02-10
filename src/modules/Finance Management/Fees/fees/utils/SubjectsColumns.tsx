import type { ColumnsType } from "antd/es/table";

const useSubjectsColumns = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Subjects Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "2",
      title: "Marks",
      dataIndex: "marks",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "2",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (name) => (name ? name?.name : "N/A"),
    },
  ];
};

export default useSubjectsColumns;
