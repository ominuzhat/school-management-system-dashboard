import type { ColumnsType } from "antd/es/table";

const useSubjectsColumns = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
  ];
};

export default useSubjectsColumns;
