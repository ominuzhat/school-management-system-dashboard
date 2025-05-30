import type { ColumnsType } from "antd/es/table";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import { capitalize } from "../../../../../common/capitalize/Capitalize";
import dayjs from "dayjs";
import { Tag } from "antd";

const useTransactionColumns = (): ColumnsType<any> => {
  // const dispatch = useDispatch();

  // const [deleteCartItem] = useDeleteOrderItemMutation();

  // const handleDelete = async (id: any) => {
  //   try {
  //     await deleteCartItem({ id }).unwrap();
  //     console.log("Item deleted successfully");
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
      title: "From",
      dataIndex: "account",
      align: "center",
      render: (text: any) => (
        <div className="flex items-center">
          <ArrowUpOutlined className="text-red-500 mr-2" />
          {capitalize(text?.account_type)} ({text?.balance})
          {/* {text} */}
        </div>
      ),
    },
    {
      key: "22",
      title: "To",
      dataIndex: "amount",
      align: "center",
      render: (text: any) => (
        <div className="flex items-center">
          <ArrowDownOutlined className="text-green-500 mr-2" />
          {text}
        </div>
      ),
      // render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (text: any) => <div className="flex items-center">৳ {text}</div>,
      // render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Transaction Type",
      dataIndex: "transaction_type",
      align: "center",
      render: (type: string) => {
        const lowerType = type?.toLowerCase();

        let color = "default";
        if (lowerType === "credit") color = "green";
        else if (lowerType === "debit") color = "red";
        else if (lowerType === "transfer") color = "blue";

        return (
          <Tag color={color} className="uppercase">
            {lowerType || "N/A"}
          </Tag>
        );
      },
    },
    {
      key: "4",
      title: "Transaction Date",
      dataIndex: "transaction_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },

    // {
    //   title: "Actions",
    //   align: "center",
    //   render: (record) => (
    //     <Space>
    //       {updatePermission && (
    //         <EditButton
    //           onClick={() =>
    //             dispatch(
    //               showModal({
    //                 title: "Update Transaction",
    //                 content: <UpdateTransaction record={record?.id} />,
    //               })
    //             )
    //           }
    //         />
    //       )}

    //       <ViewButton to={`student-view/1`} />
    //       <DeleteButton
    //       onClick={() => handleDelete(record.id)}>
    //         Delete
    //       </DeleteButton>
    //     </Space>
    //   ),
    // },
  ];
};

export default useTransactionColumns;
