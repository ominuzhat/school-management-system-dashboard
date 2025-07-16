/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFingerprint } from "react-icons/fa6";
import {
  useDeleteAdmissionMutation,
  useLazyGetSingleAdmissionFormQuery,
} from "../api/admissionEndPoints";
import { useEffect, useState } from "react";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../../app/store";
import { showModal } from "../../../../app/features/modalSlice";
import FingerAdmission from "../components/FingerAdmission";

const useAdmissionColumns = (): ColumnsType<any> => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admission,
    actionNames.change
  );
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

  const [getAdmissionForm, { data: singleAdmissionForm }] =
    useLazyGetSingleAdmissionFormQuery();

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
    getAdmissionForm(id);
  };
  // const renderBreakdownList = (items: any) =>
  //   items?.length
  //     ? items.map((item: any) => `${item.month}: ${item.amount}`).join("\n")
  //     : "No data";
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
      dataIndex: "student",
      align: "left",
      width: "180px",
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
    // {
    //   key: "2",
    //   title: "REG No.",
    //   dataIndex: "registration_number",
    //   align: "center",
    //   sorter: (a, b) =>
    //     (a.registration_number || "").localeCompare(
    //       b.registration_number || ""
    //     ),
    //   render: (registration_number) => registration_number || "N/A",
    // },
    {
      key: "3",
      title: "Admission Date",
      dataIndex: "admission_date",
      align: "center",
      sorter: (a, b) =>
        new Date(a.admission_date || 0).getTime() -
        new Date(b.admission_date || 0).getTime(),
      render: (title) => (title ? dayjs(title).format("DD MMMM YYYY") : "N/A"),
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
      key: "55",
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
      key: "10",
      title: "Due",
      dataIndex: "due_amount",
      align: "center",
      render: (title) =>
        title ? <span className="text-red-500">{title}</span> : 0,
    },
    {
      key: "99",
      title: "Paid Amount",
      dataIndex: "total_paid_amount",
      align: "center",
      render: (title) => (title ? title : 0),
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

          <Button
            title="Start Enrollment"
            size="small"
            type="default"
            style={{
              color: "green",
              // background: "#3892E3",
              border: "1px solid green",
            }}
            onClick={() =>
              dispatch(
                showModal({
                  title: "Start Enrollment",
                  content: <FingerAdmission record={record?.id} />,
                })
              )
            }
          >
            <FaFingerprint />
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
