import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import DeleteButton from "../../../../../common/CommonAnt/Button/DeleteButton";
import {
  useDeleteCollectItemMutation,
  useGetCollectSingleFeesFormQuery,
} from "../api/collectFeeEndPoints";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";

const useCollectFeeColumns = (): ColumnsType<any> => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collectFeeId, setCollectFeeId] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { data: singleFeeForm } = useGetCollectSingleFeesFormQuery(
    collectFeeId as number,
    {
      skip: collectFeeId === null,
    }
  );

  useEffect(() => {
    if (singleFeeForm) {
      const url = URL.createObjectURL(singleFeeForm);
      setPdfUrl(url);

      // Open PDF in a new tab
      window.open(url, "_blank");
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [singleFeeForm]);

  const handleForm = (id: number) => {
    setCollectFeeId(id);
  };

  const [deleteItem] = useDeleteCollectItemMutation();

  const handleDelete = (id: number) => {
    console.log(id);
    deleteItem(id as any);
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
          ? title.student?.first_name + " " + title.student?.last_name
          : "N/A",
    },
    {
      key: "11111",
      title: "REG No.",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title?.registration_number : "N/A"),
    },
    {
      key: "11111",
      title: "Session",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title?.session?.name : "N/A"),
    },

    {
      key: "2",
      title: "Student Phone Number",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.student?.phone_number : "N/A"),
    },

    {
      key: "3",
      title: "Enrollment Date",
      dataIndex: "admission",
      align: "center",
      render: (title) =>
        title
          ? dayjs(title.student?.enrollment_date).format("DD MMM YYYY")
          : "N/A",
    },
    {
      key: "4",
      title: "User Name",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.student?.user?.username : "N/A"),
    },
    {
      key: "5",
      title: "Class",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.grade_level : "N/A"),
    },
    {
      key: "6",
      title: "Month",
      dataIndex: "month",
      align: "center",
      render: (month) => (month ? dayjs(month).format("MMMM") : "N/A"),
    },
    {
      key: "7",
      title: "Payment Method",
      dataIndex: "payment_method",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "8",
      title: "Payment Amount",
      dataIndex: "paid_amount",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "9",
      title: "Discount Amount",
      dataIndex: "discount_value",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "10",
      title: "Payment Date",
      dataIndex: "payment_date",
      align: "center",
      render: (month) => (month ? dayjs(month).format("DD MMM YYYY") : "N/A"),
    },
    {
      key: "11",
      title: "Due Amount",
      dataIndex: "admission",
      align: "center",
      render: (amount) => (amount ? amount?.due_amount : "N/A"),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton onClick={() => navigate(`/collect-fee/${record?.id}`)} />
          <ViewButton to={`/collect-fee/view/${record?.id}`} />
          <DeleteButton
            onConfirm={() => handleDelete(record.id)}
            onCancel={() => ""}
          />
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

export default useCollectFeeColumns;
