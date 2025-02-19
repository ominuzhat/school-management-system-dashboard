import { Badge, Card, Col, Row, Select, Form as AntForm } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { Form } from "../../../../common/CommonAnt";
import { useCreateRoutineMutation } from "../api/routineEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import MultipleSelectRoutine from "./MultipleSelectRoutine";

const CreateRoutine = () => {
  const [form] = AntForm.useForm();
  // const today = dayjs().format("dddd");
  const [create, { isLoading, isSuccess }] = useCreateRoutineMutation();
  // const [selectedDay, setSelectedDay] = useState<string | null>(today);
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});

  const specificClass = AntForm.useWatch("grade_level", form);
  const specificSection = AntForm.useWatch("section", form);

  const onFinish = (values: any): void => {
    const formattedValues = {
      session: values.session,
      grade_level: values.grade_level,
      section: values.section,
      slots: values.slots.map((slot: any) => ({
        day: slot.day,
        start_time: slot.start_time?.format("HH:mm:ss"),
        end_time: slot.end_time?.format("HH:mm:ss"),
        subject: slot.subject,
        teacher: slot.teacher,
      })),
    };

    create(formattedValues);
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
