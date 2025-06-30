import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import { FaEdit } from "react-icons/fa";

interface Props extends ButtonProps {}

const EditButton: React.FC<Props> = ({ ...rest }) => {
  return (
    <AntButton
      {...rest}
      title="Edit"
      size="small"
      type="default"
      style={{
        color: "#03A6A1",
        border: "1px solid #03A6A1",
        // background: "#FF5F00"
      }}
    >
      <FaEdit />
      Update
    </AntButton>
  );
};

export default EditButton;
