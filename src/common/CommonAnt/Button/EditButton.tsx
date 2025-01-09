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
      style={{ color: "white", background: "#FF5F00" }}
    >
      <FaEdit />
    </AntButton>
  );
};

export default EditButton;
