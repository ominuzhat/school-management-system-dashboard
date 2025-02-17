import { Badge, Card, Col, Row, Tag } from "antd";
import { no_img } from "../../../../utilities/images";
import TextView from "../../../../common/components/TextView";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import dayjs from "dayjs";

const StudentInformation = ({ data }: { data: any }) => {
  const {
    first_name,
    last_name,
    is_active,
    phone_number,
    email,
    date_of_birth,
    enrollment_date,
    father_designation,
    father_education_qualification,
    father_email,
    father_name,
    father_number,
    father_profession,
    gender,
    image,
    local_guardian_email,
    local_guardian_name,
    local_guardian_phone_number,
    local_guardian_relation,
    mother_designation,
    mother_education_qualification,
    mother_email,
    mother_name,
    mother_phone_number,
    mother_profession,
    nationality,
    permanent_address,
    present_address,
    religion,
  } = data || {};
  const information = [
    {
      title: "Student Information",
      data: [
        {
          fieldName: "Gender",
          text: gender || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Date of Birth",
          text: dayjs(date_of_birth).format("DD MMM YYYY") || "N/A",
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
          fieldName: "Date of Admission",
          text: dayjs(enrollment_date).format("DD MMM YYYY") || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Nationality",
          text: nationality || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },

        {
          fieldName: "Religion",
          text: religion || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Father Information",
      data: [
        {
          fieldName: "Father Name",
          text: father_name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father Mobile No",
          text: father_number || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father Email",
          text: father_email || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father Occupation",
          text: father_profession || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father Education",
          text: father_education_qualification || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father Designation",
          text: father_designation || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Permanent Address",
          text: permanent_address || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Present Address",
          text: present_address || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Mother Information",
      data: [
        {
          fieldName: "Mother Name",
          text: mother_name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mother Mobile No",
          text: mother_phone_number || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mother Email",
          text: mother_email || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mother Occupation",
          text: mother_profession || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mother Education",
          text: mother_education_qualification || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Mother Designation",
          text: mother_designation || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Guardian Information",
      data: [
        {
          fieldName: "Local Guardian Name",
          text: local_guardian_name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Local Guardian Phone No",
          text: local_guardian_phone_number || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Local Guardian Email",
          text: local_guardian_email || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Local Guardian Relation",
          text: local_guardian_relation || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Student Overview */}
        <Col lg={6}>
          <Card className="text-center">
            <img src={image || no_img} className="mx-auto" alt="Profile" />
            <p className="text-xl font-semibold uppercase font-serif pt-5">
              {first_name} {last_name}
            </p>
            <br />
            <Tag color={is_active ? "green" : "red"}>
              {is_active ? "Active" : "Inactive"}
            </Tag>
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

export default StudentInformation;
