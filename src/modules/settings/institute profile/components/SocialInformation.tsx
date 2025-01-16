import { Col, Row } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import TextView from "../../../../common/components/TextView";
import { IInstituteProfile } from "../type/InstituteProfile";

const SocialInformation = ({
  data,
}: {
  data: IInstituteProfile | undefined;
}) => {
  const { website_url, facebook_url, twitter_url, linkedin_url } = data || {};

  const basicInfo = [
    {
      fieldName: "Website",
      text: website_url || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Facebook URL",
      text: facebook_url || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "Twitter URL",
      text: twitter_url || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
    {
      fieldName: "LinkedIn URL",
      text: linkedin_url || "N/A",
      Icon: MdOutlineSubdirectoryArrowRight,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} align="middle" justify="center">
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {basicInfo.map((info, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={24}
                lg={6}
                className="space-y-3"
              >
                <TextView
                  fieldName={info.fieldName}
                  text={info.text}
                  Icon={info.Icon}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SocialInformation;
