import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateRules from "../components/UpdateRules";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";

const useRulesColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.rulesandregulations,
    actionNames.change
  );

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
      align: "center",
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Description",
      dataIndex: "description",
      align: "center",
      sorter: (a, b) =>
        (a.description || "").localeCompare(b.description || ""),
      render: (description) => (description ? description : "N/A"),
    },
    {
      key: "3",
      title: "Category",
      dataIndex: "category",
      align: "center",
      sorter: (a, b) => (a.category || "").localeCompare(b.category || ""),
      render: (category) => (category ? category : "N/A"),
    },
    {
      key: "4",
      title: "Target Audience",
      dataIndex: "target_audience",
      align: "center",
      sorter: (a, b) =>
        (a.target_audience || "").localeCompare(b.target_audience || ""),
      render: (audience) => (audience ? audience : "N/A"),
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "is_active",
      align: "center",
      sorter: (a, b) => Number(b.is_active) - Number(a.is_active),
      render: (is_active) =>
        is_active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      key: "6",
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Update Rules",
                    content: <UpdateRules record={record?.id} />,
                  })
                )
              }
            />
          )}
        </Space>
      ),
    },
  ];
};

export default useRulesColumns;
