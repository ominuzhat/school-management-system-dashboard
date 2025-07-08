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
    father_name,
    father_number,
    father_profession,
    gender_display,
    image,
    local_guardian_name,
    local_guardian_phone_number,
    local_guardian_relation,
    mother_name,
    mother_phone_number,
    mother_profession,
    permanent_address,
    present_address,
    user,
    current_grade_level,
    current_session,
    current_section,
    current_shift,
    current_roll,
    religion,
  } = data || {};

  const information = [
    {
      title: "Student Information",
      data: [
        {
          fieldName: "Current Grade Level",
          text: current_grade_level?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Current Section",
          text: current_section?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Current Session",
          text: current_session?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Current Shift",
          text: current_shift?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Current Roll",
          text: current_roll || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Gender",
          text: gender_display || "N/A",
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
          fieldName: "Religion",
          text: religion || "N/A",
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
          fieldName: "Father Occupation",
          text: father_profession || "N/A",
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
          fieldName: "Mother Occupation",
          text: mother_profession || "N/A",
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
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Card className="text-center">
            <img src={image || no_img} className="mx-auto" alt="Profile" />
            <p className="text-xl font-semibold uppercase font-serif pt-5">
              {first_name} {last_name}
            </p>

            <p className="my-2 font-serif text-base">
              User Id:{" "}
              <Tag color="#8E7DBE" className="text-base font-semibold">
                {user?.username}
              </Tag>
            </p>

            <Tag color={is_active ? "green" : "red"}>
              {is_active ? "Active" : "Inactive"}
            </Tag>
          </Card>
        </Col>

        {/* Detailed Information */}
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
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
