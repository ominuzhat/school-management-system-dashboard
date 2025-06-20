import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateShift from "../components/UpdateShift";
import moment from "moment";
import { GetPermission } from "../../../../utilities/permission";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import {
  useAssignShiftMutation,
  useRemoveShiftMutation,
} from "../api/shiftEndPoints";
import { useState } from "react";
import AssignSection from "../../class management/components/AssignSection";
import { useRemoveSectionMutation } from "../../Section/api/sectionEndPoints";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

interface ClassData {
  id?: number;
  shifts?: {
    id: number;
    name?: string;
    start_time?: string;
    end_time?: string;
    sections?: { section: { id: number; name: string; capacity: number } }[];
  }[];
}

const useShiftColumns = (
  selectedClassData: ClassData,
  refetch: () => void
): {
  columns: ColumnsType<any>;
  expandable: {
    expandedRowRender: (record: any) => JSX.Element | null;
    rowExpandable: (record: any) => boolean;
  };
} => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const [assignShift] = useAssignShiftMutation();
  const [removeShift] = useRemoveShiftMutation();
  const [removeSection] = useRemoveSectionMutation();

  const [loadingShiftId, setLoadingShiftId] = useState<number | null>(null);
  const [removingSectionId, setRemovingSectionId] = useState<number | null>(
    null
  );

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.shift,
    actionNames.change
  );

  const columns: ColumnsType<any> = [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Shift Name",
      dataIndex: "name",
      align: "center",
    },
    {
      key: "2",
      title: "Start Time",
      dataIndex: "start_time",
      align: "center",
      render: (time) =>
        time ? moment(time, "HH:mm:ss").format("h:mm A") : "N/A",
    },
    {
      key: "3",
      title: "End Time",
      dataIndex: "end_time",
      align: "center",
      render: (time) =>
        time ? moment(time, "HH:mm:ss").format("h:mm A") : "N/A",
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => {
        const isAssigned = selectedClassData?.shifts?.some(
          (shift) => shift.id === record.id
        );

        const handleClick = async () => {
          if (!selectedClassData?.id) return;
          setLoadingShiftId(record.id);
          try {
            if (isAssigned) {
              await removeShift({
                id: selectedClassData.id,
                data: { shift_id: record.id },
              }).unwrap();
            } else {
              await assignShift({
                id: selectedClassData.id,
                data: { shift_id: record.id },
              }).unwrap();
            }
            refetch();
          } catch (error) {
            console.error("Error toggling shift:", error);
          } finally {
            setLoadingShiftId(null);
          }
        };

        return (
          <Space>
            {selectedClassData?.id && (
              <Button
                type="primary"
                danger={isAssigned}
                loading={loadingShiftId === record.id}
                onClick={handleClick}
              >
                {isAssigned ? (
                  <p className="flex items-center gap-1">
                    <MdDelete /> Shift
                  </p>
                ) : (
                  "Assign Shift"
                )}
              </Button>
            )}

            {isAssigned && selectedClassData?.id && (
              <Button
                type="default"
                className="bg-green-600 text-white"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Section",
                      content: (
                        <AssignSection
                          classId={selectedClassData.id}
                          shiftId={record.id}
                        />
                      ),
                    })
                  )
                }
              >
                <IoMdAdd /> Section
              </Button>
            )}

            {updatePermission && (
              <EditButton
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Update Shift",
                      content: <UpdateShift record={record?.id} />,
                    })
                  )
                }
              />
            )}
          </Space>
        );
      },
    },
  ];

  // ✅ Expandable Row: show sections for assigned shifts
  const expandedRowRender = (record: any) => {
    const shift = selectedClassData?.shifts?.find((s) => s.id === record.id);
    const sections = shift?.sections || [];

    if (sections.length === 0)
      return <p style={{ margin: 0 }}>No sections assigned</p>;

    return (
      <Table
        columns={[
          {
            title: "Section Name",
            dataIndex: "section",
            render: (section: any) => section.name,
          },
          {
            title: "Capacity",
            dataIndex: "section",
            render: (section: any) => section.capacity,
          },
          {
            title: "Action",
            render: (sectionRecord) => (
              <Button
                danger
                loading={removingSectionId === sectionRecord.section.id}
                onClick={async () => {
                  if (!selectedClassData?.id) return;
                  setRemovingSectionId(sectionRecord.section.id);
                  try {
                    await removeSection({
                      id: selectedClassData?.id,
                      data: {
                        shift_id: record?.id,
                        section_id: sectionRecord?.section.id,
                      },
                    }).unwrap();
                    refetch();
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setRemovingSectionId(null);
                  }
                }}
              >
                <MdDelete />
              </Button>
            ),
          },
        ]}
        dataSource={sections}
        pagination={false}
        rowKey={(item) => item.section.id}
      />
    );
  };

  return {
    columns,
    expandable: {
      expandedRowRender,
      rowExpandable: (record: any) =>
        !!selectedClassData?.shifts?.some(
          (s: any) => s.id === record.id && s.sections?.length > 0
        ),
    },
  };
};

export default useShiftColumns;

// import { Button, Space } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import EditButton from "../../../../common/CommonAnt/Button/EditButton";
// import { showModal } from "../../../../app/features/modalSlice";
// import { useDispatch } from "react-redux";
// import UpdateShift from "../components/UpdateShift";
// import moment from "moment";
// import { GetPermission } from "../../../../utilities/permission";
// import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
// import {
//   actionNames,
//   moduleNames,
// } from "../../../../utilities/permissionConstant";
// import {
//   useAssignShiftMutation,
//   useRemoveShiftMutation,
// } from "../api/shiftEndPoints";

// const useShiftColumns = (): ColumnsType<any> => {
//   const dispatch = useDispatch();
//   const { data: dashboardData } = useGetDashboardDataQuery({});
//   const [create] = useAssignShiftMutation();
//   const [create] = useRemoveShiftMutation();

//   const updatePermission = GetPermission(
//     dashboardData?.data?.permissions,
//     moduleNames.shift,
//     actionNames.change
//   );

//   // const [deleteItem] = useDeleteShiftMutation();

//   // const deletePermission = GetPermission(
//   //   dashboardData?.data?.permissions,
//   //   moduleNames.shift,
//   //   actionNames.delete
//   // );

//   // const handleDelete = async (id: any) => {
//   //   try {
//   //     await deleteItem({ id }).unwrap();
//   //   } catch (error) {
//   //     console.error("Failed to delete item:", error);
//   //   }
//   // };

//   return [
//     {
//       key: "0",
//       title: "SL",
//       align: "center",
//       render: (_text, _record, index) => index + 1,
//     },
//     {
//       key: "1",
//       title: "Shift Name",
//       dataIndex: "name",
//       align: "center",
//       render: (title) => (title ? title : "N/A"),
//     },

//     {
//       key: "2",
//       title: "Start Time",
//       dataIndex: "start_time",
//       align: "center",
//       render: (time) => {
//         return time ? moment(time, "HH:mm:ss").format("h:mm A") : "N/A"; // Format in 12-hour format
//       },
//     },
//     {
//       key: "3",
//       title: "End Time",
//       dataIndex: "end_time",
//       align: "center",
//       render: (time) => {
//         return time ? moment(time, "HH:mm:ss").format("h:mm A") : "N/A"; // Format in 12-hour format
//       },
//     },
//     {
//       title: "Actions",
//       align: "center",
//       render: (record) => (
//         <Space>
//           <Button>Assign Shift</Button>
//           {updatePermission && (
//             <EditButton
//               onClick={() =>
//                 dispatch(
//                   showModal({
//                     title: "Update Shift",
//                     content: <UpdateShift record={record?.id} />,
//                   })
//                 )
//               }
//             />
//           )}
//           {/* {deletePermission && (
//             <DeleteButton
//               onConfirm={() => handleDelete(record.id)}
//             ></DeleteButton>
//           )} */}
//         </Space>
//       ),
//     },
//   ];
// };

// export default useShiftColumns;
