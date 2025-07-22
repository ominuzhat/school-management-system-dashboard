import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

const useSingleFeesColumns = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "-"),
    },
    {
      key: "2",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (amount) => (amount ? amount : "-"),
    },
    {
      key: "3",
      title: "One Time",
      dataIndex: "one_time",
      align: "center",
      render: (title) =>
        title ? (
          <Tag color="green">One Time</Tag>
        ) : (
          <Tag color="purple">Regular</Tag>
        ),
    },
  ];
};

export default useSingleFeesColumns;
