import {
  Table as AntTable,
  Button,
  TableColumnType,
  Typography,
  type TableProps,
} from "antd";
import React from "react";
import { addFilter, FilterState } from "../../app/features/filterSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

interface Props<T> extends TableProps<T> {
  rowKey: keyof T | ((record: T) => React.Key);
  total: number | undefined;
  refetch: () => void;
  columns: Array<TableColumnType<T>>;
}

const Table = <T extends object>({
  rowKey,
  total,
  refetch,
  ...rest
}: Props<T>) => {
  const { page_size, page } = useAppSelector(FilterState);

  const dispatch = useAppDispatch();

  return (
    <AntTable
      title={() => (
        <Button
          title="Refetch"
          type="link"
          size="small"
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      )}
      {...rest}
      bordered
      rowKey={rowKey}
      size="small"
      scroll={{ x: true, y: total && total * 13 >= 650 ? 650 : undefined }}
      pagination={{
        total,
        showSizeChanger: true,
        showTotal: (total) => (
          <Typography.Text strong>
            Showing {page_size} of {total} entries
          </Typography.Text>
        ),
        current: page || total,
        pageSize: page_size,
        onChange: (page: number, pageSize: number) => {
          dispatch(addFilter({ name: "PAGE_SIZE", value: pageSize }));
          dispatch(
            addFilter({
              name: "PAGE",
              value: page || undefined,
            })
          );
        },
      }}
      footer={() => <Typography.Text>Total Data: {total || 0}</Typography.Text>}
    />
  );
};

export default Table;

// // TABLE COLUMN ACTION DROPDOWN
// export const TableActionDropdown = <T,>({
//   title = "Actions",
//   content,
// }: {
//   title?: string;
//   content: (record: T) => React.ReactElement[];
// }) => ({
//   title,
//   render: (_: unknown, record: T) => {
//     const items = content(record).map((item, index) => ({
//       key: String(index),
//       label: item,
//     }));
//     return (
//       <Dropdown
//         placement="bottomRight"
//         trigger={["click"]}
//         arrow
//         menu={{ items }}
//       >
//         <Button
//           type="text"
//           size="small"
//           // icon={<Iconify icon="entypo:dots-three-horizontal" />}
//         />
//       </Dropdown>
//     );
//   },
// });

// import { Table as AntTable, TableProps, Typography } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// import { setLimit, setSkip } from "../../app/features/filterSlice";

// interface Props<T> extends TableProps<T> {
//   total: number | undefined;
// }

// const Table = <T extends object>({ total, ...restProps }: Props<T>) => {
//   const { page_size = 10, skip = 0 } = useSelector(
//     (state: RootState) => state.filter
//   );

//   const dispatch = useDispatch();
//   const currentPage = Math.floor(skip / page_size) + 1;

//   console.log(currentPage, "currentPage");

//   return (
//     <AntTable
//       {...restProps}
//       scroll={{ x: true }}
//       size="small"
//       bordered
//       pagination={{
//         total: total,
//         showSizeChanger: true,
//         showTotal: (total) => (
//           <Typography.Text strong>
//             Total {page_size} of {total}
//           </Typography.Text>
//         ),
//         current: currentPage,
//         pageSize: page_size,
//         onChange: (page, pageSize) => {
//           dispatch(setLimit(pageSize));
//           dispatch(setSkip((page - 1) * pageSize));
//         },
//       }}
//     />
//   );
// };

// export default Table;

// -------------------------

// import { Table as AntTable, TableProps, Typography } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// import { setLimit, setSkip } from "../../app/features/filterSlice";

// interface Props<T> extends TableProps<T> {
//   total: number | undefined;
// }

// const Table = <T extends object>({ total, ...restProps }: Props<T>) => {
//   const { page_size = 10, skip = 0 } = useSelector(
//     (state: RootState) => state.filter
//   );

//   const dispatch = useDispatch();

//   console.log(page_size, skip, total, "ssssssssssss");

//   return (
//     <AntTable
//       {...restProps}
//       scroll={{ x: true }}
//       size="small"
//       bordered
//       pagination={{
//         total: total,
//         showSizeChanger: true,
//         showTotal: (total) => (
//           <Typography.Text strong>
//             Total {page_size} of {total}
//           </Typography.Text>
//         ),
//         current: Math.floor(skip / page_size) + 1,
//         pageSize: page_size,
//         onChange: (page, pageSize) => {
//           dispatch(setLimit(pageSize));
//           dispatch(setSkip((page - 1) * pageSize));
//         },
//       }}
//     />
//   );
// };

// export default Table;
