import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useNavigate } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import {
  useDeleteExamMutation,
  useLazyGetExamRoutinePdfQuery,
  useLazyGetGradeRoutinePdfQuery,
} from "../api/examEndPoints";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";

const useExamColumns = (): ColumnsType<any> => {
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
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

  const [getGradeExamPdf, { data: singleGradeExamPdf }] =
    useLazyGetGradeRoutinePdfQuery();

  const [getExamRoutinePdf, { data: singleExamRoutinePdf }] =
    useLazyGetExamRoutinePdfQuery();

  useEffect(() => {
    if (singleExamRoutinePdf) {
      const url = URL.createObjectURL(singleExamRoutinePdf);
      setPdfUrl(url);

      // Open PDF in a new tab
      window.open(url, "_blank");
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [singleExamRoutinePdf]);

  useEffect(() => {
    if (singleGradeExamPdf) {
      const url = URL.createObjectURL(singleGradeExamPdf);
      setPdfUrl(url);

      // Open PDF in a new tab
      window.open(url, "_blank");
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [singleGradeExamPdf]);

  const handleForm = (id: any) => {
    getExamRoutinePdf(id);
  };

  const handleClassForm = (id: any) => {
    getGradeExamPdf(id);
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
      render: (title) => (title ? title : "-"),
    },

    {
      key: "2",
      title: "Term",
      dataIndex: "term",
      align: "center",
      render: (title) => (title ? title?.name : "-"),
    },

    {
      key: "3",
      title: "Start Date",
      dataIndex: "start_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "-"),
    },
    {
      key: "4",
      title: "End Date",
      dataIndex: "end_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "-"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton onClick={() => navigate(`${record?.id}`)} />
          )}

          <ViewButton to={`view/${record?.id}`} />

          <Button
            title="Class Routine Pdf"
            size="small"
            type="default"
            style={{
              color: "#c20a0a",
              // background: "#3892E3",
              border: "1px solid gray",
            }}
            onClick={() => handleClassForm(record.id)}
          >
            <FaFilePdf /> 
          </Button>

          <Button
            title="Exam Routine Pdf"
            size="small"
            type="default"
            style={{
              color: "green",
              // background: "#3892E3",
              border: "1px solid gray",
            }}
            onClick={() => handleForm(record.id)}
          >
            <FaFilePdf /> 
          </Button>

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
