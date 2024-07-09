import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import type { InputRef } from "antd";

interface CustomDropdownProps {
  options: string[];
  placeholder: string;
  onAddItem: (item: string) => void;
}
const CommonCustomAddDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onAddItem,
  placeholder,
}) => {
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    onAddItem(name || `New item ${Date.now()}`);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <div>
      <Select
        placeholder={placeholder}
        dropdownRender={(menu) => (
          <>
            {" "}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addItem}
              className="w-full"
            >
              Add item
            </Button>{" "}
            <Space style={{ padding: "10px 0px" }}>
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
                // width={500}
                // className="border border-red-500 "
              />{" "}
            </Space>
            <Divider style={{ margin: "0px 0" }} />
            {menu}
          </>
        )}
        options={options.map((item) => ({ label: item, value: item }))}
      />
    </div>
  );
};

export default CommonCustomAddDropdown;
