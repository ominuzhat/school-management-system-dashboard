import { Badge, Card, Col, Row, Tag } from "antd";
import { no_img } from "../../../../utilities/images";
import TextView from "../../../../common/components/TextView";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { IoFingerPrintOutline, IoHandLeftOutline } from "react-icons/io5";
import { capitalize } from "../../../../common/capitalize/Capitalize";
import { BiRfid } from "react-icons/bi";

const TeacherInformation = ({ data }: { data: any }) => {
  console.log(data);

  const {
    first_name,
    last_name,
    user,
    is_active,
    phone_number,
    email,
    date_of_birth,
    address,
    base_salary,
    gender_display,
    hire_date,
    image,
    national_id,
    education,
    experience,
    father_or_husband_name,
    religion,
    blood_group,
    home_address,
    subject_specializations,
    schedule,
    enrollment_fingerprints,
    rfid,
  } = data || {};

  const information = [
    {
      title: "Teacher Information",
      data: [
        {
          fieldName: "Gender",
          text: gender_display || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Date of Admission",
          text: hire_date ? new Date(hire_date).toLocaleDateString() : "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Email",
          text: email || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mobile No",
          text: phone_number || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Date of Birth",
          text: date_of_birth || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Teacher Birth /NID",
          text: national_id || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Address",
          text: address || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Base Salary",
          text: base_salary || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Other Information",
      data: [
        {
          fieldName: "Education Qualification",
          text: education || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Experience",
          text: experience || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father / Husband Name",
          text: father_or_husband_name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Religion",
          text: religion || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Blood Group",
          text: blood_group || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Home Address",
          text: home_address || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Schedule",
          text: schedule?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Enrollment Fingerprint",
          text:
            enrollment_fingerprints?.[0]?.hand &&
            enrollment_fingerprints?.[0]?.finger
              ? `${enrollment_fingerprints?.[0]?.hand} / ${enrollment_fingerprints?.[0]?.finger}`
              : "N/A",

          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Subjects Specialization",
      data: [
        {
          fieldName: "Subjects Specialization",
          text: subject_specializations || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[16, 16]} align="middle" justify="center">
        {/* Teacher Overview */}
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card className="text-center">
            <img
              src={image || no_img}
              alt="Profile"
              className="mx-auto"
              style={{ width: "100%", maxWidth: "150px", borderRadius: "50%" }}
            />
            <p className="text-lg font-semibold uppercase font-serif pt-5">
              {first_name} {last_name}
            </p>
            <p className="py-2">
              <span className="font-semibold">Username:</span> {user?.username}
            </p>
            <Tag color={is_active ? "green" : "red"}>
              {is_active ? "Active" : "Inactive"}
            </Tag>

            {rfid && (
              <div>
                <BiRfid />
                {rfid}
              </div>
            )}

            {enrollment_fingerprints?.[0]?.hand &&
              enrollment_fingerprints?.[0]?.finger && (
                <div className="py-2 space-y-2">
                  <div className=" flex items-center gap-3 ">
                    <IoHandLeftOutline />{" "}
                    <span className="text-blue-400">Hand : </span>{" "}
                    {capitalize(enrollment_fingerprints?.[0]?.hand)}
                  </div>
                  <div className=" flex items-center gap-3">
                    <IoFingerPrintOutline />
                    <span className="text-green-400">Finger : </span>{" "}
                    {capitalize(enrollment_fingerprints?.[0]?.finger)}
                  </div>
                </div>
              )}
          </Card>
        </Col>

        {/* Detailed Information */}
        <Col xs={24} sm={24} md={16} lg={18}>
          {information.map((section, index) => (
            <Badge.Ribbon text={section.title} placement="start" key={index}>
              <Card className="pt-2">
                <Row gutter={[16, 16]}>
                  {section.data.map((item, idx) => (
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={8}
                      key={idx}
                    >
                      <TextView
                        fieldName={item.fieldName}
                        text={item.text}
                        Icon={item.Icon}
                      />
                    </Col>
                  ))}
                </Row>
              </Card>
            </Badge.Ribbon>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default TeacherInformation;
