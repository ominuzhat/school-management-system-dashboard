/* eslint-disable no-unsafe-optional-chaining */
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
  TreeSelect,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesBigListQuery } from "../../classes/api/classesEndPoints";
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
// ✅ Reuse this helper inside UpdateExam too!
const parseNestedGradeLevels = (values: string[], allClasses: any[]) => {
  const result: Record<string, any> = {};

  values.forEach((val) => {
    if (typeof val === "number") {
      // Pure class ID
      const classId = val;
      const cls = allClasses.find((c) => c.id === classId);
      if (cls) {
        result[classId] = { id: classId, shifts: [] };
        if (cls.shifts?.length) {
          cls.shifts.forEach((shift: any) => {
            const sections =
              shift.sections?.map((s: any) => s.section.id) || [];
            result[classId].shifts.push({ id: shift.id, sections });
          });
        }
      }
    } else if (typeof val === "string") {
      const parts = val.split("-");

      if (parts[0] === "shift") {
        const shiftId = parseInt(parts[1], 10);
        const cls = allClasses.find((c) =>
          c.shifts?.some((s: any) => s.id === shiftId)
        );
        if (cls) {
          if (!result[cls.id]) {
            result[cls.id] = { id: cls.id, shifts: [] };
          }
          const shiftObj = cls.shifts.find((s: any) => s.id === shiftId);
          if (shiftObj) {
            result[cls.id].shifts.push({
              id: shiftId,
              sections: shiftObj.sections?.map((s: any) => s.section.id) || [],
            });
          }
        }
      } else if (parts[0] === "section") {
        const sectionId = parseInt(parts[1], 10);
        const cls = allClasses.find((c) =>
          c.shifts?.some((s: any) =>
            s.sections?.some((sec: any) => sec.section.id === sectionId)
          )
        );
        if (cls) {
          const shiftObj = cls.shifts.find((s: any) =>
            s.sections?.some((sec: any) => sec.section.id === sectionId)
          );
          if (!result[cls.id]) {
            result[cls.id] = { id: cls.id, shifts: [] };
          }
          let shift = result[cls.id].shifts.find(
            (s: any) => s.id === shiftObj.id
          );
          if (!shift) {
            shift = { id: shiftObj.id, sections: [] };
            result[cls.id].shifts.push(shift);
          }
          if (!shift.sections.includes(sectionId)) {
            shift.sections.push(sectionId);
          }
        }
      }
    }
  });

  return Object.values(result);
};

const UpdateExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const [form] = AntForm.useForm();

  const { data: singleData, isLoading } = useGetSingleExamQuery<any>(
    examId ? { examId: Number(examId) } : skipToken
  );

  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } =
    useGetClassesBigListQuery<any>({});
  const { data: termData } = useGetTermQuery({});

  const [update, { isLoading: isUpdating }] = useUpdateExamMutation();

  const examData = singleData?.data as any;

  const [timetablesData, setTimeTablesData] = useState<Record<string, any>>({});
  const [selectedClass, setSelectedClass] = useState([]);
  const gradeLevel = AntForm.useWatch("grade_level_structure", form);

  // 👇 Prepare TreeSelect data from grade_level_structure
  const gradeLevelTreeData = classData?.data?.map((classItem: any) => ({
    title: classItem.name,
    value: classItem.id, // e.g., 1
    children: (classItem?.shifts || []).map((shift: any) => ({
      title: shift.name,
      value: `shift-${shift.id}`, // e.g., 'shift-1'
      children: (shift?.sections || []).map((section: any) => ({
        title: section?.section?.name,
        value: `section-${section.section.id}`, // e.g., 'section-1'
      })),
    })),
  }));

  useEffect(() => {
    if (examData) {
      // Prepare TreeSelect initial values
      const selectedTreeValues = examData.grade_level_structure?.flatMap(
        (classItem: any) =>
          classItem.shifts?.length
            ? classItem.shifts.flatMap((shift: any) =>
                shift.sections?.length
                  ? shift.sections.map(
                      (section: any) => `section-${section.id}`
                    )
                  : [`shift-${shift.id}`]
              )
            : [classItem.id]
      );

      const organizedTimetables: Record<string, any> = {};

      // Build timetables grouped by grade_level ID
      examData.grade_level_structure?.forEach((classItem: any) => {
        const gradeLevelId = classItem.id;

        // Filter timetables for this grade level
        const classTimetables =
          examData.timetables
            ?.filter(
              (timetable: any) =>
                timetable.grade_level?.id === gradeLevelId ||
                timetable.subject?.grade_level?.id === gradeLevelId
            )
            .map((timetable: any) => ({
              subject: timetable.subject?.id,
              exam_date: dayjs(timetable.exam_date),
              exam_mark_exp_date: timetable.exam_mark_exp_date
                ? dayjs(timetable.exam_mark_exp_date)
                : null,
              start_time: dayjs(timetable.start_time, "HH:mm:ss").format(
                "HH:mm"
              ),
              end_time: dayjs(timetable.end_time, "HH:mm:ss").format("HH:mm"),
              mcq_marks: timetable.mcq_marks,
              written_marks: timetable.written_marks,
              contribution_marks: timetable.contribution_marks,
              total_marks: timetable.total_marks,
            })) || [];

        organizedTimetables[gradeLevelId] = {
          timetables: classTimetables,
        };
      });

      // For debugging:

      form.setFieldsValue({
        name: examData?.name,
        session: examData?.session?.id,
        grade_level_structure: selectedTreeValues,
        term: examData?.term?.id,
        exam_date: [dayjs(examData?.start_date), dayjs(examData?.end_date)],
        comment: examData?.comment,
      });

      setTimeTablesData(organizedTimetables);
    }
  }, [examData, form]);

  const onFinish = async (values: any) => {
    try {
      const allClasses = classData?.data || [];

      const nestedGradeLevels = parseNestedGradeLevels(
        values.grade_level_structure,
        allClasses
      );

      const allTimetables = Object.values(timetablesData).flatMap(
        (classData) => classData.timetables || []
      );

      const results = {
        name: values.name,
        session: values.session,
        grade_level: nestedGradeLevels, // ✅ Use nested!
        term: values.term,
        start_date: dayjs(values.exam_date[0]).format("YYYY-MM-DD"),
        end_date: dayjs(values.exam_date[1]).format("YYYY-MM-DD"),
        comment: values.comment,
        timetables: allTimetables.map((timetable: any) => ({
          subject: timetable.subject,
          exam_date: dayjs(timetable.exam_date).format("YYYY-MM-DD"),
          exam_mark_exp_date: timetable.exam_mark_exp_date
            ? dayjs(timetable.exam_mark_exp_date).format("YYYY-MM-DD")
            : null,
          start_time: timetable.start_time
            ? dayjs(timetable.start_time, ["HH:mm", "HH:mm:ss"]).format(
                "HH:mm:ss"
              )
            : null,
          end_time: timetable.end_time
            ? dayjs(timetable.end_time, ["HH:mm", "HH:mm:ss"]).format(
                "HH:mm:ss"
              )
            : null,
          mcq_marks: timetable.mcq_marks,
          written_marks: timetable.written_marks,
          contribution_marks: timetable.contribution_marks,
          total_marks: timetable.total_marks,
        })),
      };

      console.log(results, "reee");
      update({ id: Number(examId), data: results });
      message.success("Exam updated successfully");
    } catch (err) {
      message.error("Failed to update exam");
      console.error("Update error:", err);
    }
  };

  useEffect(() => {
    if (Array.isArray(gradeLevel) && Array.isArray(classData?.data)) {
      const classIds = gradeLevel
        .filter((val: string | number) => typeof val === "number")
        .map(Number);
      const filteredClasses = classData.data.filter((classItem: any) =>
        classIds.includes(classItem.id)
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

  const items: TabsProps["items"] = examData?.grade_level_structure?.map(
    (classItem: any) => ({
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
    })
  );

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
                        {session?.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Class Structure" name="grade_level_structure">
                <TreeSelect
                  treeData={gradeLevelTreeData}
                  multiple
                  treeCheckable
                  treeCheckStrictly
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  value={form.getFieldValue("grade_level_structure")}
                  placeholder="Select Class/Shift/Section"
                  showSearch
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Form.Item label="Exam Date" name="exam_date">
                <RangePickerComponent format="YYYY-MM-DD" />
              </Form.Item>
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
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateExam;
