import React from "react";
import { Button as AntButton, ButtonProps } from "antd";

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
      Edit
    </AntButton>
  );
};

export default EditButton;
