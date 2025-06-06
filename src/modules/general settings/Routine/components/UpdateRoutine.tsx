import { Badge, Card, Col, Row, Select, Form as AntForm } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { Form } from "../../../../common/CommonAnt";
import {
  useGetSingleRoutineQuery,
  useUpdateRoutineMutation,
} from "../api/routineEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import UpdateMultipleSelectRoutine from "./UpdateMultipleSelectRoutine";
import dayjs from "dayjs";

const UpdateRoutine = () => {
  const [form] = AntForm.useForm();
  const { routineID } = useParams();
  const navigate = useNavigate();
  const { data: singleData } = useGetSingleRoutineQuery(Number(routineID));
  const singleRoutine: any = singleData?.data;

  const [update, { isLoading, isSuccess }] = useUpdateRoutineMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});

  const specificClass = AntForm.useWatch("grade_level", form);
  const specificSection = AntForm.useWatch("section", form);

  useEffect(() => {
    if (singleRoutine) {
      form.setFieldsValue({
        session: singleRoutine?.session?.id,
        section: singleRoutine?.section?.id,
        grade_level: singleRoutine?.grade_level?.id,
        slots: singleRoutine?.slots?.map((slot: any) => ({
          day: slot.day,
          start_time: dayjs(slot.start_time, "HH:mm:ss").format("HH:mm"),
          end_time: dayjs(slot.end_time, "HH:mm:ss").format("HH:mm"),

          teacher: slot.teacher.id,
          subject: slot.subject.id,
        })),
      });
    }
  }, [form, singleRoutine]);

  const onFinish = (values: any): void => {
    const formattedValues = {
      session: values.session,
      grade_level: values.grade_level,
      section: values.section,
      slots: values.slots.map((slot: any) => {
        const start = dayjs(slot.start_time, ["HH:mm", "HH:mm:ss"], true);
        const end = dayjs(slot.end_time, ["HH:mm", "HH:mm:ss"], true);

        return {
          day: slot.day,
          start_time: start.isValid()
            ? start.format("HH:mm:ss")
            : slot.start_time,
          end_time: end.isValid() ? end.format("HH:mm:ss") : slot.end_time,
          subject: slot.subject,
          teacher: slot.teacher,
        };
      }),
    };

    update({ id: Number(routineID), data: formattedValues });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/routine/view/${routineID}`);
    }
  }, [isSuccess, navigate, routineID]);

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
          initialValues={{ slots: [{}] }}
        >
          <Row gutter={[16, 16]}>
            <Col lg={24}>
              <Card>
                <Row gutter={[16, 16]} className="flex justify-center">
                  <Col lg={6}>
                    <Form.Item
                      label="Select Session"
                      name="session"
                      rules={[
                        { required: true, message: "Please select Session!" },
                      ]}
                    >
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
                    <Form.Item
                      label="Select Class"
                      name="grade_level"
                      rules={[
                        { required: true, message: "Please select Class!" },
                      ]}
                    >
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
                    <Form.Item
                      label="Select Section"
                      name="section"
                      rules={[
                        { required: true, message: "Please select Section!" },
                      ]}
                    >
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
            {/* <Col lg={24} className="flex justify-center">
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
            </Col> */}
            {/* ------------ */}
            {specificClass && specificSection && (
              <Col lg={24}>
                <Badge.Ribbon
                  text="Routine Schedule"
                  color="blue"
                  placement="start"
                >
                  <Card className="pt-5">
                    <UpdateMultipleSelectRoutine
                      specificClass={specificClass}
                    />
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

export default UpdateRoutine;
