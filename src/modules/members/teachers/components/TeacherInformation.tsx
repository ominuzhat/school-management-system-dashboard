import { Badge, Card, Col, Row, Tag } from "antd";
import { no_img } from "../../../../utilities/images";
import TextView from "../../../../common/components/TextView";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const TeacherInformation = ({ data }: { data: any }) => {
  const {
    first_name,
    last_name,
    id,
    is_active,
    phone_number,
    email,
    date_of_birth,
    address,
    base_salary,
    gender,
    hire_date,
    image,
    national_id,
    education,
    experience,
    father_or_husband_name,
    religion,
    blood_group,
    home_address,
  } = data || {};

  const information = [
    {
      title: "Teacher Information",
      data: [
        {
          fieldName: "Gender",
          text: gender || "N/A",
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
              <span className="font-semibold">Registration No:</span> {id}
            </p>
            <Tag color={is_active ? "green" : "red"}>
              {is_active ? "Active" : "Inactive"}
            </Tag>
          </Card>
        </Col>

        {/* Detailed Information */}
        <Col xs={24} sm={24} md={16} lg={18}>
          {information.map((section, index) => (
            <Badge.Ribbon text={section.title} placement="start" key={index}>
              <Card className="pt-2">
                <Row gutter={[16, 16]}>
                  {section.data.map((item, idx) => (
                    <Col xs={24} sm={12} md={8} key={idx}>
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
