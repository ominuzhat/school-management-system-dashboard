import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useLazyGetSingleMigrationResultFormQuery } from "../api/resultMigrationEndPoints";

const useMigrationResult = (): ColumnsType<any> => {
  //   const { data: dashboardData } = useGetDashboardDataQuery({});

  //   const updatePermission = GetPermission(
  //     dashboardData?.data?.permissions,
  //     moduleNames.exam,
  //     actionNames.change
  //   );

  //   const [deleteItem] = useDeleteExamMutation();

  //   const deletePermission = GetPermission(
  //     dashboardData?.data?.permissions,
  //     moduleNames.exam,
  //     actionNames.delete
  //   );

  //   const handleDelete = async (id: any) => {
  //     try {
  //       await deleteItem({ id }).unwrap();
  //     } catch (error) {
  //       console.error("Failed to delete item:", error);
  //     }
  //   };

  const [pdfTitle, setPdfTitle] = useState<string>("Result Migration PDF");

  const [getMigrationResultForm, { data: migrationFeeForm }] =
    useLazyGetSingleMigrationResultFormQuery<any>();

  useEffect(() => {
    if (migrationFeeForm) {
      const url = URL.createObjectURL(migrationFeeForm);

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(`
        <html>
          <head>
            <title>${pdfTitle}</title>
          </head>
          <body style="margin:0">
            <iframe 
              src="${url}" 
              frameborder="0" 
              style="width:100%;height:100vh;"
            ></iframe>
          </body>
        </html>
      `);
        newWindow.document.close();
      }

      // ✅ Cleanup only this URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [migrationFeeForm, pdfTitle]); // ✅ Removed pdfUrl!

  const handleForm = (id: number) => {
    setPdfTitle(`${id} `);
    getMigrationResultForm({ id: id });
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
      title: "Student Name",
      dataIndex: "admission",
      align: "center",
      render: (title) =>
        title
          ? title?.student?.first_name + " " + title?.student?.last_name
          : "-",
    },

    {
      key: "2",
      title: "Class",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title?.grade_level : "-"),
    },
    {
      key: "3",
      title: "Session",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title?.session?.name : "-"),
    },
    {
      key: "4",
      title: "Exam Term",
      dataIndex: "exam_term",
      align: "center",
      render: (title) => (title ? title?.name : "-"),
    },
    {
      key: "5",
      title: "Total Marks",
      dataIndex: "total_marks",
      align: "center",
      render: (title) => (title ? title : "-"),
    },
    {
      key: "6",
      title: "Total Marks Percentage",
      dataIndex: "total_marks_percentage",
      align: "center",
      render: (title) => (title ? title : "-"),
    },
    {
      key: "7",
      title: "Grade",
      dataIndex: "grade",
      align: "center",
      render: (title) => (title ? title : "-"),
    },
    {
      key: "7",
      title: "Is Passed",
      dataIndex: "is_passed",
      align: "center",
      render: (isPassed: boolean) => {
        if (isPassed === true) {
          return <Tag color="green">Pass</Tag>;
        } else if (isPassed === false) {
          return <Tag color="red">Failed</Tag>;
        } else {
          return "-";
        }
      },
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {/* {updatePermission && (
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
          )} */}

          <ViewButton to={`/result-migration/view/${record?.id}`} />
          <Button
            title="Result Migration"
            size="small"
            type="default"
            style={{
              color: "#c20a0a",
              border: "1px solid gray",
            }}
            onClick={() => handleForm(record.id)}
          >
            <FaFilePdf />
          </Button>

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

export default useMigrationResult;
