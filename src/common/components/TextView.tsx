import React from "react";

type TProps = {
  fieldName: string | number | Date;
  text: string;
  Icon: React.FC; // Accept Icon as a prop
};

const TextView: React.FC<TProps> = ({ fieldName, text, Icon }) => {
  // Ensure fieldName is always rendered as a string
  const formattedFieldName =
    fieldName instanceof Date ? fieldName.toLocaleDateString() : fieldName;

  return (
    <div>
      <span className="font-semibold">{formattedFieldName}</span>
      <p className="flex items-center gap-1">
        <Icon />
        <span>{text}</span>
      </p>
    </div>
  );
};

export default TextView;
