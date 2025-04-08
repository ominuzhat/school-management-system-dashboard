import type { ColumnsType } from "antd/es/table";

import { capitalize } from "../../../../../common/capitalize/Capitalize";
import dayjs from "dayjs";

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
      title: "Account Type",
      dataIndex: "account",
      align: "center",
      render: (title) => (title ? capitalize(title?.account_type) : "N/A"),
    },
    {
      key: "2",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Transaction Type",
      dataIndex: "transaction_type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "4",
      title: "Transaction Date",
      dataIndex: "transaction_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },
    {
      key: "5",
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (title) => (title ? title : "N/A"),
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
