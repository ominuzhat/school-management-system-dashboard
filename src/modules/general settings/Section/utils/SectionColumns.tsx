import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateSection from "../components/UpdateSection";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";

const useSectionColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.section,
    actionNames.change
  );

  // const [deleteItem] = useDeleteSectionMutation();

  // const deletePermission = GetPermission(
  //   dashboardData?.data?.permissions,
  //   moduleNames.section,
  //   actionNames.delete
  // );

  // const handleDelete = async (id: any) => {
  //   try {
  //     await deleteItem({ id }).unwrap();
  //   } catch (error) {
  //     console.error("Failed to delete item:", error);
  //   }
  // };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Section Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "-"),
    },

    // {
    //   key: "2",
    //   title: "Class Name",
    //   dataIndex: "grade_level",
    //   align: "center",
    //   render: (grade_level) => (grade_level ? grade_level.name : "-"),
    // },

    // {
    //   key: "3",
    //   title: "Class Teacher ",
    //   dataIndex: "grade_level",
    //   align: "center",
    //   render: (grade_level) =>
    //     grade_level?.class_teacher
    //       ? grade_level?.class_teacher?.first_name +
    //         " " +
    //         grade_level?.class_teacher?.last_name
    //       : "-",
    // },
    {
      key: "4",
      title: "Capacity",
      dataIndex: "capacity",
      align: "center",
      render: (title) => (title ? title : "-"),
    },
    // {
    //   key: "4",
    //   title: "Active",
    //   dataIndex: "is_active",
    //   align: "center",
    //   render: (title) =>
    //     title ? (
    //       <Tag color="green">Active</Tag>
    //     ) : (
    //       <Tag color="red">Inactive</Tag>
    //     ),
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
                    title: "Update Section",
                    content: <UpdateSection record={record?.id} />,
                  })
                )
              }
            />
          )}
          {/* <ViewButton to={`student-view/1`} /> */}
          {/* {deletePermission && (
            <DeleteButton
              onConfirm={() => handleDelete(record.id)}
            ></DeleteButton>
          )} */}
        </Space>
      ),
    },
  ];
};

export default useSectionColumns;
