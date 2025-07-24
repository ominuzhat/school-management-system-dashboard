import { Button, Space } from "antd";

import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useNavigate } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import {
  useDeleteRoutineMutation,
  useLazyGetSingleRoutinePdfQuery,
} from "../api/routineEndPoints";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import { FaFilePdf } from "react-icons/fa6";
import { useEffect, useState } from "react";

const useRoutineColumns = (): ColumnsType<any> => {
  const navigate = useNavigate();

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.routine,
    actionNames.change
  );
  const [deleteItem] = useDeleteRoutineMutation();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.routine,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteItem({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const [getRoutinePdf, { data: singleRoutinePdf }] =
    useLazyGetSingleRoutinePdfQuery();

  useEffect(() => {
    if (singleRoutinePdf) {
      const url = URL.createObjectURL(singleRoutinePdf);
      setPdfUrl(url);

      // Open PDF in a new tab
      window.open(url, "_blank");
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl, singleRoutinePdf]);

  const handleForm = (id: number) => {
    getRoutinePdf(id);
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
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? title?.name : "-"),
    },
    {
      key: "2",
      title: "Section Name",
      dataIndex: "section",
      align: "center",
      render: (title) => (title ? title?.name : "-"),
    },
    {
      key: "3",
      title: "Session Name",
      dataIndex: "session",
      align: "center",
      render: (title) => (title ? title?.name : "-"),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() => navigate(`/routine/update/${record?.id}`)}
            />
          )}

          <ViewButton to={`/routine/view/${record?.id}`} />

          <Button
            title="Routine Pdf"
            size="small"
            type="default"
            style={{
              color: "#c20a0a",
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

export default useRoutineColumns;
