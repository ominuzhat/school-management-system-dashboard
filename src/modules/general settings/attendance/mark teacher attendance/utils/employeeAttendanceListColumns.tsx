import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";

const useEmployeeAttendanceListColumns = (): ColumnsType<any> => {
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

export default useEmployeeAttendanceListColumns;
