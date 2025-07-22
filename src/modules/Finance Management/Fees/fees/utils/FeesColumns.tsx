import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useDispatch } from "react-redux";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import UpdateFees from "../components/UpdateFees";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import DeleteButton from "../../../../../common/CommonAnt/Button/DeleteButton";
import { useDeleteFeesMutation } from "../api/feesEndpoints";

const useFeesColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.feestructure,
    actionNames.change
  );
  const [deleteItem] = useDeleteFeesMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.feestructure,
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
      title: "Fee Type",
      dataIndex: "fee_type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "-"),
    },
    {
      key: "2",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (title) =>
        title ? title.map((data: any) => data.name).join(", ") : "-",
    },
    // {
    //   key: "3",
    //   title: "Students",
    //   dataIndex: "student",
    //   align: "center",
    //   render: (title) =>
    //     title ? title.map((data: any) => data.user.username).join(", ") : "-",
    // },
    // {
    //   key: "4",
    //   title: "Subject",
    //   dataIndex: "subject",
    //   align: "center",
    //   render: (title) =>
    //     title ? title.map((data: any) => data.name).join(", ") : "-",
    // },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Update Fees",
                    content: <UpdateFees record={record.id} />,
                  })
                )
              }
            />
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

export default useFeesColumns;
