import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import Iconify from "../../IconifyConfig/IconifyConfig";

interface Props extends ButtonProps {}

const DeleteButton: React.FC<Props> = ({ ...rest }) => {
  return (
    <AntButton
      {...rest}
      title="Edit"
      danger
      icon={<Iconify name="weui:delete-outlined" />}
      size="small"
      type="default"
    />
  );
};

export default DeleteButton;
