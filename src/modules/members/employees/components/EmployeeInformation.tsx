import { Badge, Card, Col, Row, Tag } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { no_img } from "../../../../utilities/images";
import TextView from "../../../../common/components/TextView";
import dayjs from "dayjs";

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
          fieldName: "Hire Date",
          text: hire_date || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Base Salary",
          text: base_salary ? `$${base_salary}` : "N/A",
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
          fieldName: "Role",
          text: user?.role?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Institution",
          text: user?.role?.institution?.name || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "City",
          text: user?.role?.institution?.city || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Institution Email",
          text: user?.role?.institution?.contact_email || "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Date Joined",
          text: user?.date_joined
            ? dayjs(user.date_joined).format("DD MMM YYYY")
            : "N/A",
          Icon: MdOutlineSubdirectoryArrowRight,
        },
        {
          fieldName: "Last Login",
          text: user?.last_login
            ? dayjs(user?.last_login).format("DD MMM YYYY, hh:mm A")
            : "N/A",
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
            <img src={no_img} className="mx-auto" alt="Profile" />
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
