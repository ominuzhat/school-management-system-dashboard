import { useState, useEffect } from "react";
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
  TreeSelect,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { useCreateExamMutation } from "../api/examEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetClassesBigListQuery } from "../../classes/api/classesEndPoints";
import { useGetTermQuery } from "../api/termEndPoints";
import { RangePickerComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import TimeTableForm from "./TimeTableForm";
import CreateTerm from "./CreateTerm";
import { PlusOutlined } from "@ant-design/icons";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import { capitalize } from "../../../../common/capitalize/Capitalize";

const { SHOW_PARENT } = TreeSelect;

const buildTreeData = (classes: any[]): any[] =>
  classes.map((cls) => ({
    title: cls.name,
    value: `${cls.id}`,
    key: `${cls.id}`,
    children: cls.shifts?.map((shift: any) => ({
      title: shift.name,
      value: `class-${cls.id}-shift-${shift.id}`,
      key: `class-${cls.id}-shift-${shift.id}`,
      children: shift.sections?.map((sec: any) => ({
        title: `Section ${sec.section.name}`,
        value: `class-${cls.id}-shift-${shift.id}-section-${sec.section.id}`,
        key: `class-${cls.id}-shift-${shift.id}-section-${sec.section.id}`,
      })),
    })),
  }));

const parseNestedGradeLevels = (values: string[], allClasses: any[]) => {
  const result: Record<string, any> = {};

  values.forEach((val) => {
    const parts = val.split("-");

    if (parts.length === 1) {
      // Class only
      const classId = parseInt(parts[0], 10);
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
    } else if (parts.length === 4) {
      // Class + Shift only
      const classId = parseInt(parts[1], 10);
      const shiftId = parseInt(parts[3], 10);
      const cls = allClasses.find((c) => c.id === classId);
      if (!result[classId]) {
        result[classId] = { id: classId, shifts: [] };
      }
      const shiftExists = result[classId].shifts.find(
        (s: any) => s.id === shiftId
      );
      if (!shiftExists) {
        const shiftObj = cls?.shifts?.find((s: any) => s.id === shiftId);
        const sections =
          shiftObj?.sections?.map((s: any) => s.section.id) || [];
        result[classId].shifts.push({ id: shiftId, sections });
      }
    } else if (parts.length === 6) {
      // Class + Shift + Section
      const classId = parseInt(parts[1], 10);
      const shiftId = parseInt(parts[3], 10);
      const sectionId = parseInt(parts[5], 10);
      if (!result[classId]) {
        result[classId] = { id: classId, shifts: [] };
      }
      let shift = result[classId].shifts.find((s: any) => s.id === shiftId);
      if (!shift) {
        shift = { id: shiftId, sections: [] };
        result[classId].shifts.push(shift);
      }
      if (!shift.sections.includes(sectionId)) {
        shift.sections.push(sectionId);
      }
    }
  });

  return Object.values(result);
};

const CreateExam = () => {
  const dispatch = useDispatch();
  const [form] = AntForm.useForm();
  const [create, { isLoading, isSuccess }] = useCreateExamMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData, isLoading: classLoading } =
    useGetClassesBigListQuery({});
  const { data: termData } = useGetTermQuery({});
  const [value, setValue] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<any[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const examDate = AntForm.useWatch("exam_date", form);

  const treeData = buildTreeData(
    Array.isArray(classData?.data) ? classData.data : []
  );

  useEffect(() => {
    if (Array.isArray(value) && Array.isArray(classData?.data)) {
      const filteredClasses: any[] = [];
      value.forEach((val) => {
        const parts = val.split("-");
        const classId =
          parts.length === 1 ? parseInt(parts[0], 10) : parseInt(parts[1], 10);
        const classArray = Array.isArray(classData?.data) ? classData.data : [];
        const classItem = classArray.find((cls: any) => cls.id === classId);
        if (classItem && !filteredClasses.some((c) => c.id === classItem.id)) {
          filteredClasses.push(classItem);
        }
      });
      setSelectedClass(filteredClasses);
    }
  }, [value, classData]);

  const onFinish = (values: any) => {
    const allClasses = Array.isArray(classData?.data) ? classData.data : [];
    const nestedGradeLevels = parseNestedGradeLevels(
      values.grade_level,
      allClasses
    );

    const results = {
      name: values.name,
      session: values.session,
      term: values.term,
      grade_level: nestedGradeLevels,
      start_date: dayjs(values.exam_date?.[0]).format("YYYY-MM-DD"),
      end_date: dayjs(values.exam_date?.[1]).format("YYYY-MM-DD"),
      comment: values?.comment,
      timetables: Object.keys(formData).flatMap((key: string) =>
        formData[key].timetables.map((timetable: any) => ({
          subject: timetable.subject,
          exam_date: dayjs(timetable.exam_date).format("YYYY-MM-DD"),
          start_time: timetable.start_time
            ? dayjs(timetable.start_time, "HH:mm").format("HH:mm:ss")
            : undefined,
          end_time: timetable.end_time
            ? dayjs(timetable.end_time, "HH:mm").format("HH:mm:ss")
            : undefined,
          exam_mark_exp_date: timetable.exam_mark_exp_date
            ? dayjs(timetable.exam_mark_exp_date).format("YYYY-MM-DD")
            : undefined,

          mcq_marks: timetable.mcq_marks || 0,
          written_marks: timetable.written_marks || 0,
          contribution_marks: timetable.contribution_marks || 0,
        }))
      ),
    };

    create(results);
  };

  const items: TabsProps["items"] = selectedClass.map((cls) => ({
    key: cls.id.toString(),
    label: capitalize(cls.name),
    children: (
      <TimeTableForm
        examDate={examDate}
        selectedTab={cls.id.toString()}
        formData={formData[cls.id.toString()] || {}}
        setFormData={(data: any) =>
          setFormData((prev) => ({ ...prev, [cls.id.toString()]: data }))
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
          isLoading={isLoading}
          isSuccess={isSuccess}
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
              <Form.Item
                label="Select Session"
                name="session"
                rules={[{ required: true, message: "Session is required!" }]}
              >
                <Select placeholder="Select Session" className="w-full">
                  {Array.isArray(sessionData?.data) &&
                    sessionData?.data.map((session: any) => (
                      <Select.Option key={session.id} value={session.id}>
                        {session.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Form.Item
                label="Class - Shift - Section"
                name="grade_level"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one option!",
                  },
                ]}
              >
                <TreeSelect
                  treeData={treeData}
                  value={value}
                  onChange={(newVal) => setValue(newVal as string[])}
                  treeCheckable
                  showCheckedStrategy={SHOW_PARENT}
                  placeholder={
                    classLoading
                      ? "Loading classes..."
                      : "Select class/shift/section"
                  }
                  style={{ width: "100%" }}
                />
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
                      termData?.data.map((term: any) => (
                        <Select.Option key={term.id} value={term.id}>
                          {term.name}
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

export default CreateExam;
