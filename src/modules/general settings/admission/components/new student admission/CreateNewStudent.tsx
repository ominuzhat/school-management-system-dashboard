import React, { useState } from "react";
import { Button, Card, message, Steps, theme } from "antd";
import CreateStudentInformation from "./CreateStudentInformation";
import CreateStudentAdmission from "./CreateStudentAdmission";
import CreateNewStudentFee from "./CreateNewStudentFee";

const steps = [
  {
    title: "Student Information",
    content: CreateStudentInformation,
  },
  {
    title: "Student Admission",
    content: CreateStudentAdmission,
  },
  {
    title: "Student Fee",
    content: CreateNewStudentFee,
  },
];

const CreateNewStudent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [formValidations, setFormValidations] = useState<boolean[]>(
    steps.map(() => false)
  );

  const next = () => {
    if (!formValidations[current]) {
      message.error("Please complete all required fields before proceeding");
      return;
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateFormValidation = (stepIndex: number, isValid: boolean) => {
    setFormValidations((prev) => {
      const newValidations = [...prev];
      newValidations[stepIndex] = isValid;
      return newValidations;
    });
  };

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 24,
  };

  return (
    <Card>
      <Steps current={current} items={steps.map((s) => ({ title: s.title }))} />
      <div style={contentStyle}>
        {React.createElement(steps[current].content, {
          onValidationChange: (valid: boolean) =>
            updateFormValidation(current, valid),
        })}
      </div>
      <div
        style={{ marginTop: 24 }}
        className="flex justify-between flex-row-reverse"
      >
        {/* step */}
        {/* {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )} */}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={next}
            disabled={!formValidations[current]}
          >
            Next
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
