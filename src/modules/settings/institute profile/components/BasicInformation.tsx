import { Col, Row } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import TextView from "../../../../common/components/TextView";
import { IInstituteProfile } from "../type/InstituteProfile";
import { capitalize } from "../../../../common/capitalize/Capitalize";

const BasicInformation = ({
  data,
}: {
  data: IInstituteProfile | undefined;
}) => {
  const {
    address,
    city,
    contact_email,
    phone_number,
    institution_type,
    current_session,
    weekend_days,
  } = data || {};

  const basicInfo = [
    {
      fieldName: "Address",
      text: address || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "City",
      text: city || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Contact Email",
      text: contact_email || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Phone Number",
      text: phone_number || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Established Date",
      text: data?.established_date
        ? new Date(data.established_date).toLocaleDateString()
        : "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Institution Type",
      text: institution_type || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Current Session",
      text: current_session?.name || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Weekend Days",
      text: Array.isArray(weekend_days)
        ? weekend_days.map((day: string) => capitalize(day)).join(", ")
        : weekend_days
        ? capitalize(weekend_days)
        : "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} align="middle" justify="center">
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {basicInfo.map((info, index) => {
              return (
                <Col
                  key={index}
                  xs={24} // Mobile
                  sm={12} // Small tablets
                  md={12} // Tablets
                  lg={8} // Small desktops
                  xl={6} // Large desktops
                  xxl={6} // Very large screens
                  className="space-y-3"
                >
                  <TextView
                    fieldName={info.fieldName}
                    text={info.text}
                    Icon={info.Icon}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformation;
