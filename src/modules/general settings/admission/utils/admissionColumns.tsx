/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useNavigate } from "react-router-dom";
import { IAdmissionStatus } from "../type/admissionType";
import { FaFilePdf } from "react-icons/fa6";
import {
  useDeleteAdmissionMutation,
  useGetSingleAdmissionFormQuery,
} from "../api/admissionEndPoints";
import { useEffect, useState } from "react";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";

const useAdmissionColumns = (): ColumnsType<any> => {
  const navigate = useNavigate();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admission,
    actionNames.change
  );
  const [admissionId, setAdmissionId] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [deleteItem] = useDeleteAdmissionMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admission,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteItem({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const { data: singleAdmissionForm } = useGetSingleAdmissionFormQuery(
    admissionId as number,
    {
      skip: admissionId === null,
    }
  );

  useEffect(() => {
    if (singleAdmissionForm) {
      const url = URL.createObjectURL(singleAdmissionForm);
      setPdfUrl(url);

      // Open PDF in a new tab
      window.open(url, "_blank");
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [singleAdmissionForm]);

  const handleForm = (id: number) => {
    setAdmissionId(id);
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
      dataIndex: "student",
      align: "center",
      render: (title) =>
        title ? title?.first_name + " " + title?.last_name : "N/A",
    },
    {
      key: "22",
      title: "User Name",
      dataIndex: "student",
      align: "center",
      sorter: (a, b) =>
        a.student?.user?.username?.localeCompare(
          b.student?.user?.username || ""
        ),
      render: (student) => student?.user?.username || "N/A",
    },
    {
      key: "2",
      title: "REG No.",
      dataIndex: "registration_number",
      align: "center",
      sorter: (a, b) =>
        (a.registration_number || "").localeCompare(
          b.registration_number || ""
        ),
      render: (registration_number) => registration_number || "N/A",
    },
    {
      key: "3",
      title: "Admission Date",
      dataIndex: "admission_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.admission_date || 0).getTime() -
        new Date(b.admission_date || 0).getTime(),
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "4",
      title: "Session",
      dataIndex: "session",
      align: "center",
      sorter: (a, b) =>
        (a.session?.name || "").localeCompare(b.session?.name || ""),
      render: (session) => (session?.name ? capitalize(session.name) : "N/A"),
    },
    {
      key: "5",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "5",
      title: "Shift",
      dataIndex: "shift",
      align: "center",
      render: (title) =>
        title && title?.name ? capitalize(title?.name) : "N/A",
    },
    {
      key: "6",
      title: "Fee Type",
      dataIndex: "fee_type",
      align: "center",
      sorter: (a, b) => (a.fee_type || "").localeCompare(b.fee_type || ""),
      render: (fee_type) => (fee_type ? capitalize(fee_type) : "N/A"),
    },
    {
      key: "7",
      title: "One Time Fee",
      dataIndex: "one_time_fee",
      align: "center",
      render: (title) => (title ? title : 0),
    },
    {
      key: "8",
      title: "Monthly Fee",
      dataIndex: "monthly_fee",
      align: "center",
      render: (title) => (title ? title : 0),
    },
    {
      key: "9",
      title: "Total Paid Amount",
      dataIndex: "total_paid_amount",
      align: "center",
      render: (title) => (title ? <Tag color="green">{title}</Tag> : 0),
    },
    {
      key: "10",
      title: "Due",
      dataIndex: "due_amount",
      align: "center",
      render: (title) => (title ? <Tag color="red">{title}</Tag> : 0),
    },

    {
      key: "11",
      title: "Total Discount Amount",
      dataIndex: "total_discounted_amount",
      align: "center",
      render: (title) => (title ? <Tag color="orange">{title}</Tag> : 0),
    },
    {
      key: "12",
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: IAdmissionStatus) => {
        const statusColors: Record<IAdmissionStatus, string> = {
          pending: "blue",
          approved: "green",
          rejected: "red",
          passed: "purple",
          withdrawn: "orange",
          failed: "volcano",
          on_hold: "gold",
        };

        return <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton onClick={() => navigate(`/admission/${record?.id}`)} />
          )}

          <ViewButton to={`/admission/admission-view/${record?.id}`} />
          <Button
            title="Admission Form"
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

export default useAdmissionColumns;
