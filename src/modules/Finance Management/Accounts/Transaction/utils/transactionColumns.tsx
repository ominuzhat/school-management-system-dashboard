import type { ColumnsType } from "antd/es/table";
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
      title: "Account Name",
      dataIndex: "account",
      align: "center",
      render: (account: any) => (
        <div className="flex items-center">
          {account?.type === "cash"
            ? `cash (My Account)`
            : account?.type === "bank"
            ? `bank - ${account?.account_name} - ${account?.bank_name} (${account?.balance})`
            : `${account?.type} - ${account?.account_type} (${account?.balance})`}

          {/* {capitalize(account?.type)} ({account?.balance}) */}
        </div>
      ),
    },

    // {account?.type === "cash"
    //                           ? `cash (My Account)`
    //                           : account?.type === "bank"
    //                           ? `bank - ${account?.account_name} - ${account?.bank_name} (${account?.balance})`
    //                           : `${account?.type} - ${account?.account_type} (${account?.balance})`}

    // {
    //   key: "22",
    //   title: "To",
    //   dataIndex: "target_account",
    //   align: "center",
    //   render: (text: any) => (
    //     <div className="flex items-center">
    //       {text ? `${capitalize(text)} (${text?.balance}) s` : null}
    //     </div>
    //   ),
    // },
    {
      key: "2",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (text: any) => <div className="flex items-center">৳ {text}</div>,
      // render: (title) => (title ? title : "-"),
    },
    {
      key: "3",
      title: "Transaction Type",
      dataIndex: "transaction_type",
      align: "center",
      render: (type: string | null) => {
        const lowerType = type?.toLowerCase?.() || null;

        let color = "default";
        if (lowerType === "credit") color = "green";
        else if (lowerType === "debit") color = "red";
        else if (lowerType === "transfer") color = "blue";

        return (
          <Tag color={color} className="uppercase">
            {lowerType || "-"}
          </Tag>
        );
      },
    },
    {
      key: "4",
      title: "Transaction Date",
      dataIndex: "transaction_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "-"),
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
