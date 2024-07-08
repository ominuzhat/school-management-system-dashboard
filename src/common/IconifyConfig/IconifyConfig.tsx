import { Icon, disableCache } from "@iconify/react";

import React from "react";

interface Props {
  name: string;
  width?: number;
  color?: string;
  style?: React.CSSProperties;
}

const Iconify: React.FC<Props> = ({ name, width, color, style }) => {
  disableCache("all");

  return (
    <Icon
      alignmentBaseline="central"
      icon={name}
      width={width}
      color={color}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default Iconify;
