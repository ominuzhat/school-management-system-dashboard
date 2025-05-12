import { Space, Collapse, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateSubjects from "../components/UpdateSubject";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import { useDeleteSubjectMutation } from "../api/subjectsEndPoints";

const { Panel } = Collapse;

const useSubjectColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
    actionNames.change
  );

  const [deleteItem] = useDeleteSubjectMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.classsubject,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteItem({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Columns for the nested subjects table
  const subjectColumns: ColumnsType<any> = [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Subject Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "3",
      title: "Class Teacher",
      dataIndex: "grade_level",
      align: "center",
      render: (grade_level) =>
        grade_level?.class_teacher
          ? `${grade_level.class_teacher?.first_name} ${grade_level.class_teacher?.last_name}`
          : "N/A",
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
                    title: "Update Subject",
                    content: <UpdateSubjects record={record?.id} />,
                  })
                )
              }
            />
          )}
          {deletePermission && (
            <DeleteButton onConfirm={() => handleDelete(record.id)} />
          )}
        </Space>
      ),
    },
  ];

  // Main columns for classes
  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      width: "150px",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: <p className="text-center">Class Name</p>,
      dataIndex: "name",
      align: "left",
      width: "400px",
      render: (name) => (name ? name : "N/A"),
    },
    {
      key: "2",
      title: <p className="text-center">Subjects</p>,
      align: "left",
      render: (_, record) => (
        <Collapse>
          <Panel
            header={`View Subjects (${record.subjects?.length || 0})`}
            key="1"
          >
            <Table
              columns={subjectColumns}
              dataSource={record.subjects}
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Panel>
        </Collapse>
      ),
    },
  ];
};

export default useSubjectColumns;
