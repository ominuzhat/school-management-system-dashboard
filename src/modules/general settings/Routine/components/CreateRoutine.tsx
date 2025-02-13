import { Badge, Button, Card, Col, Row, Select, Form as AntForm } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { Form } from "../../../../common/CommonAnt";
import { useCreateRoutineMutation } from "../api/routineEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useState } from "react";
import MultipleSelectRoutine from "./MultipleSelectRoutine";
import dayjs from "dayjs";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CreateRoutine = () => {
  const [form] = AntForm.useForm();
  const today = dayjs().format("dddd");
  const [create, { isLoading, isSuccess }] = useCreateRoutineMutation();
  const [selectedDay, setSelectedDay] = useState<string | null>(today);
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});

  const specificClass = AntForm.useWatch("grade_level", form);
  const specificSection = AntForm.useWatch("section", form);

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      day: selectedDay,
      slot: values.slot.map((slot: any) => ({
        ...slot,
        start_time: slot.start_time?.format("h:mm A"),
        end_time: slot.end_time?.format("h:mm A"),
      })),
    };

    console.log("Submitting:", formattedValues);
    // create(formattedValues); // Uncomment this line to submit the data
  };

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Form
          form={form}
          onFinish={onFinish}
          isLoading={isLoading}
          isSuccess={isSuccess}
          initialValues={{ slot: [{}] }}
        >
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <Card>
                <Row gutter={[16, 16]} className="flex justify-center">
                  <Col lg={6}>
                    <Form.Item label="Select Session" name="session">
                      <Select placeholder="Select Session" className="w-full">
                        {Array.isArray(sessionData?.data) &&
                          sessionData?.data?.map((session: any) => (
                            <Select.Option key={session.id} value={session.id}>
                              {session?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item label="Select Class" name="grade_level">
                      <Select placeholder="Select Class" className="w-full">
                        {Array.isArray(classData?.data) &&
                          classData?.data?.map((classDetails: any) => (
                            <Select.Option
                              key={classDetails.id}
                              value={classDetails.id}
                            >
                              {classDetails?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item label="Select Section" name="section">
                      <Select placeholder="Select Section" className="w-full">
                        {Array.isArray(sectionData?.data) &&
                          sectionData?.data?.map((sectionDetails: any) => (
                            <Select.Option
                              key={sectionDetails.id}
                              value={sectionDetails.id}
                            >
                              {sectionDetails?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            {/* ------------------ */}
            <Col lg={24} className="flex justify-center">
              <Form.Item label="" name="day">
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      type={selectedDay === day ? "primary" : "default"}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </Form.Item>
            </Col>
            {/* ------------ */}{" "}
            {specificClass && specificSection && (
              <Col lg={24}>
                <Badge.Ribbon
                  text="Routine Schedule"
                  color="blue"
                  placement="start"
                >
                  <Card className="pt-5">
                    <MultipleSelectRoutine specificClass={specificClass} />
                  </Card>
                </Badge.Ribbon>
              </Col>
            )}
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateRoutine;
