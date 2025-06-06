/* eslint-disable no-unused-vars */
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
  message,
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
import { skipToken } from "@reduxjs/toolkit/query";

const { Option } = Select;

const UpdateExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const [form] = AntForm.useForm();
  // const { data: singleData, isLoading } = useGetSingleExamQuery(Number(examId));
  const { data: singleData, isLoading } = useGetSingleExamQuery<any>(
    examId ? { examId: Number(examId) } : skipToken
  );
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: termData } = useGetTermQuery({});

  const [update, { isLoading: isUpdating }] = useUpdateExamMutation();

  const examData = singleData?.data as any;
  const [timetablesData, setTimeTablesData] = useState<Record<string, any>>({});
  const [selectedClass, setSelectedClass] = useState([]);

  useEffect(() => {
    if (examData) {
      // Initialize form values
      form.setFieldsValue({
        name: examData?.name,
        session: examData?.session?.id,
        grade_level: examData?.grade_level?.map((s: any) => s?.id),
        section: examData?.section?.map((s: any) => s.id),
        term: examData?.term?.id,
        exam_date: [dayjs(examData?.start_date), dayjs(examData?.end_date)],
        comment: examData?.comment,
      });

      // Organize timetables by class
      const organizedTimetables: Record<string, any> = {};

      examData?.grade_level?.forEach((classItem: any) => {
        const classTimetables =
          examData?.timetables
            ?.filter(
              (timetable: any) =>
                timetable.subject?.grade_level?.id === classItem.id
            )
            .map((timetable: any) => ({
              subject: timetable.subject?.id,
              exam_date: dayjs(timetable.exam_date),
              exam_mark_exp_date: dayjs(timetable.exam_mark_exp_date),
              start_time: dayjs(timetable.start_time, "HH:mm:ss").format(
                "HH:mm"
              ),
              end_time: dayjs(timetable.end_time, "HH:mm:ss").format("HH:mm"),
              mcq_marks: timetable.mcq_marks,
              written_marks: timetable.written_marks,
              contribution_marks: timetable.contribution_marks,
              total_marks: timetable.total_marks,
            })) || [];

        organizedTimetables[classItem.id] = { timetables: classTimetables };
      });

      setTimeTablesData(organizedTimetables);
    }
  }, [examData, form]);

  const onFinish = async (values: any) => {
    try {
      // Combine timetables from all classes
      const allTimetables = Object.values(timetablesData).flatMap(
        (classData) => classData.timetables || []
      );

      const results = {
        name: values.name,
        session: values.session,
        grade_level: values.grade_level,
        section: values.section,
        term: values.term,
        start_date: dayjs(values.exam_date[0]).format("YYYY-MM-DD"),
        end_date: dayjs(values.exam_date[1]).format("YYYY-MM-DD"),
        comment: values.comment,
        timetables: allTimetables.map((timetable: any) => {
          const start = dayjs(
            timetable.start_time,
            ["HH:mm", "HH:mm:ss"],
            true
          );
          const end = dayjs(timetable.end_time, ["HH:mm", "HH:mm:ss"], true);

          return {
            subject: timetable.subject,
            exam_date: dayjs(timetable.exam_date).format("YYYY-MM-DD"),
            exam_mark_exp_date: dayjs(timetable.exam_mark_exp_date).format(
              "YYYY-MM-DD"
            ),
            start_time: start.isValid() ? start.format("HH:mm:ss") : null,
            end_time: end.isValid() ? end.format("HH:mm:ss") : null,
            mcq_marks: timetable.mcq_marks,
            written_marks: timetable.written_marks,
            contribution_marks: timetable.contribution_marks,
            total_marks: timetable.total_marks,
          };
        }),
      };

      await update({ id: Number(examId), data: results }).unwrap();
      message.success("Exam updated successfully");
    } catch (err) {
      message.error("Failed to update exam");
      console.error("Update error:", err);
    }
  };

  const gradeLevel = AntForm.useWatch("grade_level", form);

  useEffect(() => {
    if (Array.isArray(gradeLevel) && Array.isArray(classData?.data)) {
      const filteredClasses: any = classData.data.filter((classItem) =>
        gradeLevel.includes(classItem.id)
      );
      setSelectedClass(filteredClasses);
    }
  }, [gradeLevel, classData]);

  const handleTimetableChange = (classId: string, data: any) => {
    setTimeTablesData((prev) => ({
      ...prev,
      [classId]: data,
    }));
  };

  const items: TabsProps["items"] = selectedClass.map((classItem: any) => ({
    key: classItem.id.toString(),
    label: capitalize(classItem.name),
    children: (
      <UpdateTimeTableForm
        selectedTab={classItem.id.toString()}
        formData={timetablesData[classItem.id] || { timetables: [] }}
        setFormData={(data) =>
          handleTimetableChange(classItem.id.toString(), data)
        }
      />
    ),
  }));

  return (
    <div>
      <div className="my-6">
        <BreadCrumb />
      </div>
      <Card className="rounded-lg shadow-lg p-6">
        <Form
          form={form}
          onFinish={onFinish}
          isLoading={isLoading || isUpdating}
        >
          <Row gutter={[16, 16]}>
            {/* ... (keep all your existing form fields) ... */}

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Exam Name" name="name">
                <Input placeholder="Enter Exam Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Select Session" name="session">
                <Select placeholder="Select Session" className="w-full">
                  {Array.isArray(sessionData?.data) &&
                    sessionData?.data?.map((session: any) => (
                      <Option key={session.id} value={session.id}>
                        {" "}
                        {session?.name}{" "}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Class" name="grade_level">
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                  placeholder={
                    classLoading ? "Loading classes..." : "Please select"
                  }
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={
                    (Array.isArray(classData?.data) &&
                      classData.data.map((classItem: any) => ({
                        label: classItem.name,
                        value: classItem.id,
                      }))) ||
                    []
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Section" name="section">
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
              <Form.Item label="Exam Date" name="exam_date">
                <RangePickerComponent format="YYYY-MM-DD" />
              </Form.Item>{" "}
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div className="flex items-center w-full">
                <Form.Item label="Term" name="term" className="w-full">
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
              <Tabs items={items} />
            </Col>

            {/* <Col xs={24}>
              <Button type="primary" htmlType="submit">
                Update Exam
              </Button>
            </Col> */}
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateExam;
