// import {
//   Table as AntTable,
//   Button,
//   Dropdown,
//   TableColumnType,
//   Typography,
//   type TableProps,
// } from "antd";
// // import { useAppDispatch, useAppSelector } from "../../app/store";
// import React from "react";
// // import Iconify from "../IconifyConfig/IconifyConfig";
// import { addFilter, FilterState } from "../../app/features/filterSlice";
// import { useAppDispatch, useAppSelector } from "../../app/store";

// interface Props<T> extends TableProps<T> {
//   rowKey: keyof T | ((record: T) => React.Key);
//   total: number | undefined;
//   refetch: () => void;
//   columns: Array<TableColumnType<T>>;
// }

// const Table = <T extends object>({
//   rowKey,
//   total,
//   refetch,
//   // columns,
//   ...rest
// }: Props<T>) => {
//   const { limit, skip } = useAppSelector(
//     (state) => FilterState(state) as { limit: number; skip: number }
//   );
//   const dispatch = useAppDispatch();
//   // const showPagination = total ;
//   const showPagination = total !== undefined && total >= limit;

//   console.log(total, limit, skip);

//   return (
//     <AntTable
//       title={() => (
//         <Button
//           title="Refetch"
//           type="link"
//           size="small"
//           onClick={() => refetch()}
//         >
//           Refresh
//         </Button>
//       )}
//       {...rest}
//       bordered
//       rowKey={rowKey}
//       size="small"
//       scroll={{ x: true, y: total && total * 13 >= 650 ? 650 : undefined }}
//       // columns={[
//       //   {
//       //     title: "SL",
//       //     width: 60,
//       //     render: (_: unknown, __: unknown, index: number) => skip + index + 1,
//       //   },
//       //   ...columns,
//       // ]}
//       pagination={
//         showPagination
//           ? {
//               total,
//               showSizeChanger: true,
//               showTotal: (total) => (
//                 <Typography.Text strong>
//                   Showing {limit} of {total} entries
//                 </Typography.Text>
//               ),
//               current: Math.floor(skip / limit) + 1,
//               pageSize: limit,
//               onChange: (page: number, pageSize: number) => {
//                 dispatch(addFilter({ name: "LIMIT", value: pageSize }));
//                 dispatch(addFilter({ name: "SKIP", value: page }));
//               },
//             }
//           : false
//       }
//       footer={
//         showPagination
//           ? undefined
//           : () => <Typography.Text>Total Data: {total || 0}</Typography.Text>
//       }
//     />
//   );
// };

// export default Table;

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

import { Table as AntTable, TableProps, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setLimit, setSkip } from "../../app/features/filterSlice";

interface Props<T> extends TableProps<T> {
  total: number | undefined;
}

const Table = <T extends object>({ total, ...restProps }: Props<T>) => {
  const { page_size = 10, skip = 0 } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();
  const currentPage = Math.floor(skip / page_size) + 1;

  console.log(currentPage, "currentPage");

  return (
    <AntTable
      {...restProps}
      scroll={{ x: true }}
      size="small"
      bordered
      pagination={{
        total: total,
        showSizeChanger: true,
        showTotal: (total) => (
          <Typography.Text strong>
            Total {page_size} of {total}
          </Typography.Text>
        ),
        current: currentPage,
        pageSize: page_size,
        onChange: (page, pageSize) => {
          dispatch(setLimit(pageSize));
          dispatch(setSkip((page - 1) * pageSize));
        },
      }}
    />
  );
};

export default Table;

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
