import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Form as AntForm,
  Tabs,
  TabsProps,
} from "antd";
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
import { useEffect, useState } from "react";
import { capitalize } from "../../../../common/capitalize/Capitalize";

const { Option } = Select;

const CreateExam = () => {
  const dispatch = useDispatch();
  const [form] = AntForm.useForm();

  const [create, { isLoading, isSuccess }] = useCreateExamMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: termData } = useGetTermQuery({});

  const [selectedClass, setSelectedClass] = useState([]);
  const [formData, setFormData] = useState<Record<string, any>>([]);

  const gradeLevel = AntForm.useWatch("grade_level", form);

  useEffect(() => {
    if (Array.isArray(gradeLevel) && Array.isArray(classData?.data)) {
      const filteredClasses: any = classData.data.filter((classItem) =>
        gradeLevel.includes(classItem.id)
      );
      setSelectedClass(filteredClasses);
    }
  }, [gradeLevel, classData]);

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
      timetables: Object.keys(formData).map((key: string) => {
        const timetable = formData[key].timetables[0]; 
        return {
          subject: timetable.subject,
          exam_date: dayjs(timetable.exam_date).format("YYYY-MM-DD"),
          start_time: timetable.start_time
            ? dayjs(timetable.start_time).format("HH:mm:ss")
            : undefined,
          end_time: timetable.end_time
            ? dayjs(timetable.end_time).format("HH:mm:ss")
            : undefined,
          mcq_marks: timetable.mcq_marks,
          written_marks: timetable.written_marks,
          passing_marks: timetable.passing_marks,
          contribution_marks: timetable.contribution_marks,
        };
      }),
    };

    create(results);
  };

  const items: TabsProps["items"] = selectedClass.map((classItem: any) => ({
    key: classItem.id.toString(),
    label: capitalize(classItem.name),
    children: (
      <TimeTableForm
        selectedTab={classItem.id.toString()}
        formData={formData[classItem.id.toString()] || {}}
        setFormData={(data: any) =>
          setFormData((prev) => ({
            ...prev,
            [classItem.id.toString()]: data,
          }))
        }
      />
    ),
  }));

  const onChange = (key: any) => {
    console.log(key);
  };

  return (
    <div>
      <div className="my-6">
        <BreadCrumb />
      </div>
      <Card className="rounded-lg shadow-lg p-6">
        <Form
          form={form}
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
                  mode="multiple"
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
                <RangePickerComponent format="YYYY-MM-DD" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div className="flex items-center w-full">
                <Form.Item
                  label="Term"
                  name="term"
                  rules={[{ required: true, message: "Please select a term!" }]}
                  className="w-full"
                >
                  <Select placeholder="Select Term" allowClear>
                    {Array.isArray(termData?.data) &&
                      termData?.data?.map((term: any) => (
                        <Select.Option key={term.id} value={term.id}>
                          {term?.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
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
            </Col>

            <Col xs={24}>
              <Form.Item label="Comment" name="comment">
                <Input.TextArea placeholder="Enter Comment" rows={4} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Tabs
                // defaultActiveKey={selectedTab}
                // activeKey={selectedTab}
                items={items}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateExam;
