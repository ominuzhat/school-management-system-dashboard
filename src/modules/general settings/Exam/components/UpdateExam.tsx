/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleExamQuery,
  useUpdateExamMutation,
} from "../api/examEndPoints";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
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
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useGetTermQuery } from "../api/termEndPoints";
import { RangePickerComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { PlusOutlined } from "@ant-design/icons";
import CreateTerm from "./CreateTerm";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import UpdateTimeTableForm from "./UpdateTimeTableForm";

const { Option } = Select;

const UpdateExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const [form] = AntForm.useForm();
  const { data: singleData, isLoading } = useGetSingleExamQuery(Number(examId));
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: termData } = useGetTermQuery({});

  const [update] = useUpdateExamMutation();

  const examData = singleData?.data as any;
  const [timetablesData, setTimeTablesData] = useState([]);
  const [formData, setFormData] = useState<Record<string, any>>([]);
  console.log(formData);

  useEffect(() => {
    if (examData?.timetables && Array.isArray(examData.timetables)) {
      const timetables = examData.timetables.map((timetable: any) => ({
        subject: timetable.subject?.id, // Extract just the ID
        exam_date: dayjs(timetable.exam_date),
        // start_time: dayjs(timetable.start_time, "HH:mm:ss"),
        // end_time: dayjs(timetable.end_time, "HH:mm:ss"),
        start_time: dayjs(timetable.start_time, "HH:mm:ss").format("HH:mm"),
        end_time: dayjs(timetable.end_time, "HH:mm:ss").format("HH:mm"),
        mcq_marks: timetable.mcq_marks,
        written_marks: timetable.written_marks,
        contribution_marks: timetable.contribution_marks,
        total_marks: timetable.total_marks,
      }));

      setTimeTablesData(timetables);
      setFormData(timetables);

      form.setFieldsValue({
        name: examData?.name,
        session: examData?.session?.id,
        grade_level: examData?.grade_level?.map((s: any) => s.id),
        section: examData?.section?.map((s: any) => s.id),
        term: examData?.term?.id,
        exam_date: [dayjs(examData?.start_date), dayjs(examData?.end_date)],
        comment: examData?.comment,
        timetables, // This should now match what your form expects
      });
    }
  }, [examData, form]);
  const onFinish = (values: any) => {
    const results = {
      name: values.name,
      session: values.session,
      grade_level: values.grade_level,
      section: values.section,
      term: values.term,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      comment: values.comment,
      timetables: values.timetables.map((timetable: any) => {
        const start = dayjs(timetable.start_time, ["HH:mm", "HH:mm:ss"], true);
        const end = dayjs(timetable.end_time, ["HH:mm", "HH:mm:ss"], true);

        return {
          subject: timetable.subject,
          exam_date: dayjs(timetable.exam_date).format("YYYY-MM-DD"),
          start_time: start.isValid()
            ? start.format("HH:mm:ss")
            : timetable.start_time,
          end_time: end.isValid() ? end.format("HH:mm:ss") : timetable.end_time,
          mcq_marks: timetable.mcq_marks,
          written_marks: timetable.written_marks,
          total_marks: timetable.total_marks,
          passing_marks: timetable.passing_marks,
        };
      }),
    };

    update({ id: Number(examId), data: results });
  };

  const [selectedClass, setSelectedClass] = useState([]);

  const gradeLevel = AntForm.useWatch("grade_level", form);

  useEffect(() => {
    if (Array.isArray(gradeLevel) && Array.isArray(classData?.data)) {
      const filteredClasses: any = classData.data.filter((classItem) =>
        gradeLevel.includes(classItem.id)
      );
      setSelectedClass(filteredClasses);
    }
  }, [gradeLevel, classData]);

  // Change the items mapping to pass the correct formData
  const items: TabsProps["items"] = selectedClass.map((classItem: any) => {
    // Filter timetables for this class
    const classTimetables = timetablesData.filter((t: any) =>
      examData?.timetables?.some(
        (examT: any) => examT.subject?.grade_level?.id === classItem.id
      )
    );

    return {
      key: classItem.id.toString(),
      label: capitalize(classItem.name),
      children: (
        <UpdateTimeTableForm
          selectedTab={classItem.id.toString()}
          formData={{ timetables: classTimetables }}
          setFormData={(data: any) => {
            setFormData((prev: any) => ({
              ...prev,
              [classItem.id.toString()]: data,
            }));
          }}
        />
      ),
    };
  });

  // const items: TabsProps["items"] = selectedClass.map((classItem: any) => ({
  //   key: classItem.id.toString(),
  //   label: capitalize(classItem.name),
  //   children: (
  //     <TimeTableForm
  //       selectedTab={classItem.id.toString()}
  //       formData={formData[classItem.id.toString()] || {}}
  //       setFormData={(data: any) =>
  //         setFormData((prev) => ({
  //           ...prev,
  //           [classItem.id.toString()]: data,
  //         }))
  //       }
  //     />
  //   ),
  // }));

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
                      <Option key={session.id} value={session.id}>
                        {session?.name}
                      </Option>
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
                rules={[{ required: true, message: "Section is required!" }]}
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

            {/* <Col xs={24}>
              <Badge.Ribbon text="Exam Schedule" color="blue" placement="start">
                <Card className="pt-5">
                  <TimeTableForm />
                </Card>
              </Badge.Ribbon>
            </Col> */}
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateExam;
