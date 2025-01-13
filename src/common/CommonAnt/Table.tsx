import { Table as AntTable, TableProps, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setLimit, setSkip } from "../../app/features/filterSlice";

interface Props<T> extends TableProps<T> {
  total: number | undefined;
}

const Table = <T extends object>({ total, ...restProps }: Props<T>) => {
  const { limit = 10, skip = 0 } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();

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
            Total {limit} of {total}
          </Typography.Text>
        ),
        current: Math.floor(skip / limit) + 1,
        pageSize: limit,
        onChange: (page, pageSize) => {
          dispatch(setLimit(pageSize));
          dispatch(setSkip((page - 1) * pageSize));
        },
      }}
    />
  );
};

export default Table;
