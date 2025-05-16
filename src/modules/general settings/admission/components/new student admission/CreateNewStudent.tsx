import React, { useState } from "react";
import { Button, Card, message, Steps, theme } from "antd";
import CreateStudentInformation from "./CreateStudentInformation";
import CreateStudentAdmission from "./CreateStudentAdmission";

const steps = [
  {
    title: "Student Information",
    content: <CreateStudentInformation />,
  },
  {
    title: "Student Admission",
    content: <CreateStudentAdmission />,
  },
  {
    title: "Student Fee",
    content: "Last-content",
  },
];

const CreateNewStudent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <Card>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CreateNewStudent;
