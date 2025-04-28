import { Col, Row } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import TextView from "../../../../common/components/TextView";
import { IInstituteProfile } from "../type/InstituteProfile";

const AdditionalInformation = ({
  data,
}: {
  data: IInstituteProfile | undefined;
}) => {
  const {
    founder,
    description,
    campus_size,
    num_students,
    accreditations,
    ownership_type,
    latitude,
    longitude,
  } = data || {};

  const basicInfo = [
    {
      fieldName: "Established Date",
      text: data?.established_date
        ? new Date(data.established_date).toLocaleDateString()
        : "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },

    {
      fieldName: "Founder",
      text: founder || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Description",
      text: description || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Campus Size",
      text: `${campus_size} acres` || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Number of Students",
      text: `${num_students}` || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Accreditations",
      text: accreditations || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Ownership Type",
      text: ownership_type || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Latitude",
      text: `${latitude}` || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Longitude",
      text: `${longitude}` || "N/A",
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

export default AdditionalInformation;
