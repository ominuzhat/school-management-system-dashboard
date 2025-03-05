import { Badge, Button, Card, Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateExamMutation } from "../api/examEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { RangePickerComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";

import TimeTableForm from "./TimeTableForm";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import CreateTerm from "./CreateTerm";
import { PlusOutlined } from "@ant-design/icons";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useGetTermQuery } from "../api/termEndPoints";
import dayjs from "dayjs";

const { Option } = Select;

// interface PeriodDate {
//   start_date: string;
//   end_date: string;
// }

const CreateExam = () => {
  const dispatch = useDispatch();
  // const [examDate, setExamDate] = useState<PeriodDate>({
  //   start_date: "",
  //   end_date: "",
  // });
  const [create, { isLoading, isSuccess }] = useCreateExamMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: termData } = useGetTermQuery({});

  const onFinish = (values: any): void => {
    const results = {
      name: values.name,
      session: values.session,
      grade_level: values.grade_level,
      section: values.section,
      term: values.term,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      comment: values.comment,
      timetables: values.timetables.map((timetable: any) => ({
        subject: timetable.subject,
        exam_date: dayjs(timetable.exam_date).format("YYYY-MM-DD"),
        start_time: dayjs(timetable.start_time).format("HH:mm:ss"),
        end_time: dayjs(timetable.end_time).format("HH:mm:ss"),
        mcq_marks: timetable.mcq_marks,
        written_marks: timetable.written_marks,
        total_marks: timetable.total_marks,
        passing_marks: timetable.passing_marks,
      })),
    };
    console.log(results, "result");

    create(results);
  };

  // const handleRangeChange = (dates: [Moment | null, Moment | null] | null) => {
  //   const start = dates?.[0]?.format("YYYY-MM-DD") || "";
  //   const end = dates?.[1]?.format("YYYY-MM-DD") || "";
  //   setExamDate({ start_date: start, end_date: end });
  // };

  return (
    <div>
      <div className="my-6">
        <BreadCrumb />
      </div>
      <Card className="rounded-lg shadow-lg p-6">
        <Form
          onFinish={onFinish}
          isLoading={isLoading}
          isSuccess={isSuccess}
          initialValues={{ timetables: [{}] }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="Exam Name"
                name="name"
                rules={[{ required: true, message: "Exam Name is required!" }]}
              >
                <Input placeholder="Enter Exam Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
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

            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="Class"
                name="grade_level"
                rules={[{ required: true, message: "Class is required!" }]}
              >
                <Select
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                  placeholder={
                    classLoading ? "Loading classes..." : "Please select"
                  }
                  options={
                    (Array?.isArray(classData?.data) &&
                      classData?.data?.map((classItem: any) => ({
                        label: classItem.name,
                        value: classItem.id,
                      }))) ||
                    []
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="Section"
                name="section"
                rules={[{ required: true, message: "Section" }]}
              >
                <Select
                  mode="multiple"
                  className="w-full"
                  placeholder="Select Section"
                  allowClear
                  showSearch
                >
                  {Array.isArray(sectionData?.data) &&
                    sectionData?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item
                label="Exam Date"
                name="exam_date"
                rules={[{ required: true, message: "Choose date" }]}
              >
                <RangePickerComponent
                  // onChange={handleRangeChange}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Term"
                name="term"
                // rules={[{ required: true, message: "Please select a term!" }]}
              >
                <div className="flex items-center w-full">
                  <Select
                    className="w-full mr-2"
                    placeholder="Select Term"
                    allowClear
                  >
                    {Array.isArray(termData?.data) &&
                      termData?.data?.map((term: any) => (
                        <Select.Option key={term.id} value={term.id}>
                          {term?.name}
                        </Select.Option>
                      ))}
                  </Select>
                  <Button
                    type="link"
                    onClick={() =>
                      dispatch(
                        showModal({
                          title: "Add New Term",
                          content: <CreateTerm />,
                        })
                      )
                    }
                    icon={<PlusOutlined />}
                  >
                    Add Term
                  </Button>
                </div>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Comment" name="comment">
                <Input.TextArea placeholder="Enter Comment" rows={4} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Badge.Ribbon text="Exam Schedule" color="blue" placement="start">
                <Card className="pt-5">
                  <TimeTableForm />
                </Card>
              </Badge.Ribbon>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateExam;
