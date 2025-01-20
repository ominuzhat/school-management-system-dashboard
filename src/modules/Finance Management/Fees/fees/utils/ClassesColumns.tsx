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
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
  ];
};

export default useClassesColumns;
