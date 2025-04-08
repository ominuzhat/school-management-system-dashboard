import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import UpdateAdditionalFee from "../component/UpdateAdditionalFee";
import DeleteButton from "../../../../../common/CommonAnt/Button/DeleteButton";
import { useDeleteAdditionalItemMutation } from "../api/additionalFeeEndPoints";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";

// Define the columns function based on your provided structure
const useAdditionalFeesColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionfeestructure,
    actionNames.change
  );

  const [deleteItem] = useDeleteAdditionalItemMutation();

  const handleDelete = (id: number) => {
    console.log(id);
    deleteItem(id as any);
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
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Update Additional Fees",
                    content: <UpdateAdditionalFee record={record?.id} />,
                  })
                )
              }
            />
          )}
          <DeleteButton
            onConfirm={() => handleDelete(record.id)}
            onCancel={() => ""}
          />
        </Space>
      ),
    },
  ];
};

export default useAdditionalFeesColumns;
