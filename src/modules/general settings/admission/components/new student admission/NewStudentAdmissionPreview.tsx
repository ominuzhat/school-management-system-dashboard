import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Image,
  Tag,
  Space,
  Descriptions,
  Spin,
  Tooltip,
} from "antd";
import { useAppSelector } from "../../../../../app/store";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetShiftQuery } from "../../../shift/api/shiftEndPoints";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../../Section/api/sectionEndPoints";
import { useGetSubjectsQuery } from "../../../subjects/api/subjectsEndPoints";
import { useMemo } from "react";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import { TbStarFilled } from "react-icons/tb";
import { InfoCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const NewStudentAdmissionPreview = () => {
  const { data: sessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });
  const { data: shiftData } = useGetShiftQuery({});
  const { data: classData } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: subjectData } = useGetSubjectsQuery({ page_size: 900 });

  const admission: any = useAppSelector((state) => state.student.admission);
  const student: any = useAppSelector((state) => state.student.student);
  const fee: any = useAppSelector((state) => state.student.fee);
  const { optional_subject, subjects = [] } = admission;

  console.log(admission, "add");
  // console.log(student, "student");
  // console.log(fee, "fee");

  const getSessionName = (id: number) => {
    return (
      (Array?.isArray(sessionData?.data) &&
        sessionData?.data?.find((session: any) => session.id === id)?.name) ||
      id
    );
  };

  const getShiftName = (id: number) => {
    return (
      (Array?.isArray(shiftData?.data) &&
        shiftData?.data?.find((shift: any) => shift.id === id)?.name) ||
      id
    );
  };

  const getClassName = (id: number) => {
    return (
      (Array?.isArray(classData?.data) &&
        classData?.data?.find((cls: any) => cls.id === id)?.name) ||
      id
    );
  };

  const getSectionName = (id: number) => {
    return (
      (Array?.isArray(sectionData?.data) &&
        sectionData?.data?.find((section: any) => section.id === id)?.name) ||
      id
    );
  };

  const subjectMap = useMemo(() => {
    const map: Record<number, string> = {};
    if (Array.isArray(subjectData?.data?.results)) {
      subjectData?.data?.results?.forEach((subject: any) => {
        map[subject.id] = subject?.name;
      });
    }
    return map;
  }, [subjectData]);

  const getSubjectName = (id: number) => {
    const isOptional = optional_subject === id;
    const name = subjectMap[id] || id; // fallback to id if name not found

    return (
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {name}
        {isOptional && (
          <span style={{ marginLeft: 4 }}>
            <Tooltip title="Optional Subject">
              <TbStarFilled style={{ color: "#faad14", fontSize: "14px" }} />
            </Tooltip>
          </span>
        )}
      </span>
    );
  };

  if (!shiftData || !classData || !sectionData || !subjectData) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  return (
    <div className="p-4">
      <Title level={3} className="text-center mb-6">
        Student Admission Preview
      </Title>

      <Row gutter={[24, 24]}>
        {/* Student Information */}
        <Col xs={24} lg={12}>
          <Card
            title="Student Information"
            bordered={false}
            headStyle={{ backgroundColor: "#f0f7ff" }}
            className="shadow-sm"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div className="flex flex-col items-center">
                  {student?.image?.length > 0 ? (
                    <Image
                      width={150}
                      src={
                        student.image[0].url ||
                        URL.createObjectURL(student.image[0].originFileObj)
                      }
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Text type="secondary">No Image</Text>
                    </div>
                  )}
                </div>
              </Col>

              <Col xs={24} md={16}>
                <Descriptions column={1}>
                  <Descriptions.Item label="Full Name">
                    <Text strong>
                      {student?.first_name} {student?.last_name}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">
                    {student?.date_of_birth || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {student?.gender || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Religion">
                    {student?.religion || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact Number">
                    {student?.contact_phone_number
                      ? `+880${student.contact_phone_number}`
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {student?.email || "N/A"}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Divider orientation="left">Address</Divider>
            <Descriptions column={1}>
              <Descriptions.Item label="Present Address">
                {student?.present_address || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Permanent Address">
                {student?.permanent_address || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Parent Information */}
        <Col xs={24} lg={12}>
          <Card
            title="Parent Information"
            bordered={false}
            headStyle={{ backgroundColor: "#f0f7ff" }}
            className="shadow-sm"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="Father's Details" size="small" className="mb-4">
                  <Descriptions column={1}>
                    <Descriptions.Item label="Name">
                      {student?.father_name || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      {student?.father_number
                        ? `+880${student.father_number}`
                        : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Profession">
                      {student?.father_profession || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card title="Mother's Details" size="small">
                  <Descriptions column={1}>
                    <Descriptions.Item label="Name">
                      {student?.mother_name || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      {student?.mother_phone_number
                        ? `+880${student.mother_phone_number}`
                        : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Profession">
                      {student?.mother_profession || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Divider orientation="left">Guardian Information</Divider>
            <Descriptions column={1}>
              <Descriptions.Item label="Guardian Name">
                {student?.local_guardian_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Relation">
                {student?.local_guardian_relation || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Contact Number">
                {student?.local_guardian_phone_number
                  ? `+880${student.local_guardian_phone_number}`
                  : "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Admission & Fee Information */}
        <Col xs={24}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card
                title="Admission Details"
                bordered={false}
                headStyle={{ backgroundColor: "#f0f7ff" }}
                className="shadow-sm"
              >
                <Descriptions column={1}>
                  <Descriptions.Item label="Session">
                    {admission?.session
                      ? getSessionName(admission?.session)
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Grade Level">
                    {admission?.grade_level
                      ? getClassName(admission.grade_level)
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Section">
                    {admission?.section
                      ? getSectionName(admission.section)
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shift">
                    {admission?.shift ? getShiftName(admission.shift) : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Roll Number">
                    {admission?.roll || "Not assigned"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Group Type">
                    {capitalize(admission?.group_type) || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={admission?.status ? "green" : "orange"}>
                      {admission?.status || "Pending"}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
                {admission?.subjects?.length > 0 && (
                  <>
                    <Divider orientation="left">Subjects</Divider>
                    <Space wrap>
                      {subjects.map((subjectId: number, index: number) => {
                        const isOptional = optional_subject === subjectId;
                        return (
                          <Tag
                            key={index}
                            color={isOptional ? "gold" : "blue"}
                            icon={isOptional ? <StarOutlined /> : null}
                            style={{
                              border: isOptional
                                ? "1px solid #faad14"
                                : undefined,
                              fontWeight: isOptional ? 600 : undefined,
                            }}
                          >
                            {getSubjectName(subjectId)}
                          </Tag>
                        );
                      })}
                    </Space>
                    {optional_subject && (
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary">
                          <InfoCircleOutlined /> Subject marked with{" "}
                          <StarFilled style={{ color: "#faad14" }} /> is
                          optional
                        </Text>
                      </div>
                    )}
                  </>
                )}
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title="Fee Structure"
                bordered={false}
                headStyle={{ backgroundColor: "#f0f7ff" }}
                className="shadow-sm"
              >
                <Descriptions column={1}>
                  <Descriptions.Item label="Fee Type">
                    <Tag color={fee?.fee_type === "class" ? "purple" : "cyan"}>
                      {fee?.fee_type?.toUpperCase() || "N/A"}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>

                {fee?.fees?.length > 0 && (
                  <>
                    <Divider orientation="left">Fee Details</Divider>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">Fee Name</th>
                            <th className="p-2 text-right">Amount</th>
                            <th className="p-2 text-center">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fee.fees.map((feeItem: any, index: any) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200 hover:bg-gray-50"
                            >
                              <td className="p-2">{feeItem.name}</td>
                              <td className="p-2 text-right">
                                {feeItem.amount} BDT
                              </td>
                              <td className="p-2 text-center">
                                <Tag
                                  color={feeItem.one_time ? "gold" : "green"}
                                >
                                  {feeItem.one_time ? "One-time" : "Recurring"}
                                </Tag>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NewStudentAdmissionPreview;
