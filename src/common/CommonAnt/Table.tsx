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

  console.log(page_size, skip, total, "ssssssssssss");

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
        current: Math.floor(skip / page_size) + 1,
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
