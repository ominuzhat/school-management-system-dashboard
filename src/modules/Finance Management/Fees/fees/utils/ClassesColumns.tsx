import type { ColumnsType } from "antd/es/table";

const useClassesColumns = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "2",
      title: "Class Teacher",
      dataIndex: "class_teacher",
      align: "center",
      render: (title) =>
        title ? title.first_name + " " + title.last_name : "N/A",
    },
  ];
};

export default useClassesColumns;
