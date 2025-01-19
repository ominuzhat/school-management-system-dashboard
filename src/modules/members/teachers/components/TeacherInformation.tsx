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
  } = data || {};

  const information = [
    {
      title: "Teacher Information",
      data: [
        {
          fieldName: "Gender",
          text: "Male",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Class",
          text: "1",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Date of Admission",
          text: "10-12-2024",
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
          fieldName: "Teacher Birth ID",
          text: "0162404050",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Address",
          text: address || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Blood Group",
          text: "O+",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
    {
      title: "Father Information",
      data: [
        {
          fieldName: "Father Name",
          text: "Mr. Alom",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father Mobile No",
          text: "0168520741",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Father NID",
          text: "0168520741",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Occupation",
          text: "Doctor",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Income",
          text: "52000",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
      ],
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} align="middle" justify="center">
        {/* Teacher Overview */}
        <Col lg={6}>
          <Card className="text-center">
            <img src={no_img} className="mx-auto" alt="Profile" />
            <p className="text-xl font-semibold uppercase font-serif pt-5">
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

export default TeacherInformation;
