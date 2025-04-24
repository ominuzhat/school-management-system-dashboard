import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import { useDeleteExamMutation } from "../api/examEndPoints";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";

const useExamColumns = (): ColumnsType<any> => {
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.exam,
    actionNames.change
  );

  const [deleteItem] = useDeleteExamMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.exam,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteItem({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Exam Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "2",
      title: "Term",
      dataIndex: "term",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },

    {
      key: "3",
      title: "Start Date",
      dataIndex: "start_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },
    {
      key: "4",
      title: "End Date",
      dataIndex: "end_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <Link to={`${record.id}`}>
              <Button
                title="Edit"
                size="small"
                type="default"
                style={{
                  color: "#FFA500",
                  border: "1px solid #FFA500",
                }}
              >
                <FaEdit />
              </Button>
            </Link>
          )}

          <ViewButton to={`view/${record?.id}`} />

          {deletePermission && (
            <DeleteButton
              onConfirm={() => handleDelete(record.id)}
            ></DeleteButton>
          )}
        </Space>
      ),
    },
  ];
};

export default useExamColumns;
