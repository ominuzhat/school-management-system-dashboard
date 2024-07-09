/* eslint-disable no-unused-vars */
import { Button, DatePicker, Input, TimePicker } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface SearchComponentProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Input
      prefix={<SearchOutlined />}
      allowClear
      placeholder={placeholder}
      value={searchValue}
      onChange={handleChange}
    />
  );
};

export const RangePickerComponent = ({
  onChange,
  format = "YYYY-MM-DD",
  ...props
}: any) => {
  const handleChange = (
    dates: [moment.Moment | null, moment.Moment | null]
  ) => {
    if (dates[0] && dates[1]) {
      const formattedDates = [dates[0].format(format), dates[1].format(format)];
      onChange(formattedDates);
    } else {
      onChange([null, null]);
    }
  };

  return <RangePicker {...props} format={format} onChange={handleChange} />;
};

export const CreateCommonButton = ({ to, btnName }: any) => {
  return (
    <Button>
      <Link
        to={to}
        //   className="border px-6 py-2 rounded-lg bg-baseColor text-white"
      >
        {btnName}
      </Link>
    </Button>
  );
};

interface DatePickerWithOptionalTodayProps {
  showToday?: boolean;
  onChange?: (date: dayjs.Dayjs | null, dateString: string) => void;
}

export const DatePickerWithOptionalToday: React.FC<
  DatePickerWithOptionalTodayProps
> = ({ showToday, onChange }) => {
  return (
    <DatePicker
      onChange={(date, dateString: any) => {
        console.log("Selected date:", date, "Date string:", dateString);
        if (onChange) {
          onChange(date, dateString);
        }
      }}
      className="w-full"
      format="DD-MM-YYYY"
      defaultValue={showToday ? dayjs().startOf("day") : undefined}
    />
  );
};

interface CustomTimePickerProps {
  useDefaultTime: boolean;
  onChangeTime: (time: Dayjs | null, timeString: any) => void;
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  useDefaultTime,
  onChangeTime,
}) => {
  const defaultTime = useDefaultTime ? dayjs() : undefined;

  return (
    <TimePicker
      className="w-full"
      onChange={onChangeTime}
      defaultValue={defaultTime}
    />
  );
};
