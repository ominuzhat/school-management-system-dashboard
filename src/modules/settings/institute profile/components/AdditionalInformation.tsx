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
        : "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },

    {
      fieldName: "Founder",
      text: founder || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Description",
      text: description || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Campus Size",
      text: `${campus_size} acres` || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Number of Students",
      text: `${num_students}` || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Accreditations",
      text: accreditations || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Ownership Type",
      text: ownership_type || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Latitude",
      text: `${latitude}` || "-",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Longitude",
      text: `${longitude}` || "-",
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
