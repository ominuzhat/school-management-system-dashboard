import { Col, Row } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import TextView from "../../../../common/components/TextView";
import { IInstituteProfile } from "../type/InstituteProfile";

const BasicInformation = ({
  data,
}: {
  data: IInstituteProfile | undefined;
}) => {
  const { address, city, contact_email, phone_number, institution_type } =
    data || {};

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
                  span={6}
                  xs={24}
                  sm={12}
                  md={6}
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
