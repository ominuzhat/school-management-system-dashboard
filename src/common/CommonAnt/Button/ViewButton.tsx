import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

interface Props extends ButtonProps {
  to: string;
}

const ViewButton: React.FC<Props> = ({ to, ...rest }) => {
  return (
    <Link to={to}>
      <AntButton
        {...rest}
        title="View"
        size="small"
        type="default"
        style={{ color: "white", background: "#3892E3" }}
      >
        <FaEye />
      </AntButton>
    </Link>
  );
};

export default ViewButton;
