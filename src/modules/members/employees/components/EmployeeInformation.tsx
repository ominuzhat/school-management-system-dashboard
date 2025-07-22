import { Badge, Card, Col, Row, Tag } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { no_img } from "../../../../utilities/images";
import TextView from "../../../../common/components/TextView";
import { BiRfid } from "react-icons/bi";
import { capitalize } from "lodash";
import { IoHandLeftOutline, IoFingerPrintOutline } from "react-icons/io5";

const EmployeeInformation = ({ data }: any) => {
  const {
    first_name,
    last_name,
    id,
    is_active,
    phone_number,
    email,
    base_salary,
    hire_date,
    position,
    department,
    user,
    image,
    national_id,
    education,
    experience,
    father_or_husband_name,
    religion,
    blood_group,
    home_address,
    schedule,
    gender_display,
    enrollment_fingerprints,
    rfid,
  } = data || {};

  const information = [
    {
      title: "Employee Information",
      data: [
        {
          fieldName: "Gender",
          text: gender_display || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Email",
          text: email || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mobile No",
          text: phone_number || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Employee Birth /NID",
          text: national_id || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Hire Date",
          text: hire_date || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Base Salary",
          text: base_salary ? `${base_salary}` : "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Position",
          text: position || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Department",
          text: department?.name || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Username",
          text: user?.username || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Other Information",
      data: [
        {
          fieldName: "Education Qualification",
          text: education || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Experience",
          text: experience || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father / Husband Name",
          text: father_or_husband_name || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Religion",
          text: religion || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Blood Group",
          text: blood_group || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Home Address",
          text: home_address || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Schedule",
          text: schedule?.name || "-",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} align="middle" justify="center">
        {/* Employee Overview */}
        <Col lg={6}>
          <Card className="text-center">
            <img src={image || no_img} className="mx-auto" alt="Profile" />
            <p className="text-xl font-semibold uppercase font-serif pt-5">
              {first_name} {last_name}
            </p>
            <p className="py-2">
              <span className="font-semibold">Employee ID:</span> {id}
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
        <Col lg={18} className="space-y-1">
          {information.map((section, index) => (
            <Badge.Ribbon text={section.title} placement="start" key={index}>
              <Card className="pt-2">
                <Row gutter={[16, 16]}>
                  {section.data.map((item, idx) => (
                    <Col span={8} key={idx}>
                      <div>
                        <TextView
                          fieldName={item.fieldName}
                          text={item.text}
                          Icon={item.Icon}
                        />
                      </div>
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
export default EmployeeInformation;
