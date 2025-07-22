import type { ColumnsType } from "antd/es/table";

const useClassesColumns = (): ColumnsType<any> => {
  return [
    {
      key: "0",
      title: "SL No.",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "-"),
    },
  ];
};

export default useClassesColumns;
