import { Badge, Card, Col, Row, Tag } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { no_img } from "../../../../utilities/images";
import TextView from "../../../../common/components/TextView";

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
    shifts,
  } = data || {};

  const information = [
    {
      title: "Employee Information",
      data: [
        {
          fieldName: "Full Name",
          text: `${first_name} ${last_name}` || "N/A",
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
          fieldName: "Employee Birth /NID",
          text: national_id || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Hire Date",
          text: hire_date || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Base Salary",
          text: base_salary ? `${base_salary}` : "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Position",
          text: position || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Department",
          text: department?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Username",
          text: user?.username || "N/A",
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
          fieldName: "Shifts",
          text:
            Array.isArray(shifts) && shifts.length > 0 ? (
              <>
                {shifts.map((s: any, idx: number) => (
                  <Tag color="blue" key={idx}>
                    {s?.name}
                  </Tag>
                ))}
              </>
            ) : (
              "N/A"
            ),
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
