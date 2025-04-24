import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import UpdateClass from "../components/UpdateClass";
import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import { useDeleteClassesMutation } from "../api/classesEndPoints";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";

const useClassesColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradelevel,
    actionNames.change
  );
  const [deleteItem] = useDeleteClassesMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.gradelevel,
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
      title: "Class Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Class Teacher Name",
      dataIndex: "class_teacher",
      align: "center",
      render: (title) => (title ? title?.first_name : "N/A"),
    },
    {
      key: "2",
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (title) => (title ? title : "N/A"),
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
                    title: "Update Class",
                    content: <UpdateClass record={record?.id} />,
                  })
                )
              }
            />
          )}
          {/* <ViewButton to={`student-view/1`} />     */}

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

export default useClassesColumns;
