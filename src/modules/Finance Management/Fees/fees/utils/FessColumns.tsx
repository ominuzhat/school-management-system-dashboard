import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const useSingleFeesColumns = (): ColumnsType<any> => {
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
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (amount) => (amount ? amount : "N/A"),
    },
    {
      key: "3",
      title: "One Time",
      dataIndex: "one_time",
      align: "center",
      render: (title) =>
        title ? <Tag color="green">True</Tag> : <Tag color="purple">False</Tag>,
    },
  ];
};

export default useSingleFeesColumns;
