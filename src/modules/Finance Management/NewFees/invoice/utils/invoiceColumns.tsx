import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { FaEye, FaFilePdf } from "react-icons/fa6";

import { useGetInvoicePdfQuery } from "../api/invoiceEndPoints";
import { showModal } from "../../../../../app/features/modalSlice";
import InvoiceView from "../components/InvoiceView";
import { useDispatch } from "react-redux";

const useInvoiceColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  //   const { data: dashboardData } = useGetDashboardDataQuery({});

  const [collectFeeId, setCollectFeeId] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { data: singleInvoice } = useGetInvoicePdfQuery(
    collectFeeId as number,
    {
      skip: collectFeeId === null,
    }
  );

  useEffect(() => {
    if (singleInvoice) {
      const url = URL.createObjectURL(singleInvoice);
      setPdfUrl(url);

      // Open PDF in a new tab
      window.open(url, "_blank");
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [singleInvoice]);

  const handleForm = (id: number) => {
    setCollectFeeId(id);
  };

  // const [deleteItem] = useDeleteCollectItemMutation();

  // const handleDelete = (id: number) => {
  //   console.log(id);
  //   deleteItem(id as any);
  // };
  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Invoice Number",
      dataIndex: "invoice_number",
      key: "invoice_number",
      align: "center",
    },
    {
      key: "4",
      title: "Student ID",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.student?.user?.username : "N/A"),
    },
    {
      key: "1",
      title: "Student Name",
      dataIndex: "admission",
      align: "center",
      render: (title) =>
        title
          ? title.student?.first_name + " " + title.student?.last_name
          : "N/A",
    },

    {
      title: "Issue Date",
      dataIndex: "issue_date",
      key: "issue_date",
      align: "center",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      align: "center",
    },

    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
    },
    {
      title: "Paid Amount",
      dataIndex: "total_paid",
      key: "total_paid",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => {
        const color =
          status === "paid"
            ? "green"
            : status === "partial"
            ? "blue"
            : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <Button
            size="small"
            type="default"
            onClick={() =>
              dispatch(
                showModal({
                  title: "View Invoice",
                  content: <InvoiceView record={record?.id} />,
                })
              )
            }
            className="w-full"
          >
            <FaEye />
          </Button>

          <Button
            title="Invoice "
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
        </Space>
      ),
    },
  ];
};

export default useInvoiceColumns;
