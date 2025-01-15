import { Badge, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import BasicInformation from "../components/BasicInformation";
import { no_img } from "../../../../utilities/images";
import WelcomeInstitute from "../components/WelcomeInstitute";

const InstituteProfile = () => {
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Row>
        <Col span={24} lg={24}>
          <Row
            gutter={[8, 16]}
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Col lg={6}>
              <Card className="text-center ">
                <img
                  src={no_img}
                  className="mx-auto"
                  style={{ width: "12rem" }}
                />
                <p className="text-xl font-semibold uppercase font-serif pt-5">
                  Compus Coaching Center
                </p>
              </Card>
            </Col>

            <Col lg={18}>
              <WelcomeInstitute />
            </Col>
          </Row>
        </Col>

        <Col span={24} lg={24} className="mt-2">
          <Badge.Ribbon text="Basic Information" placement="start">
            <Card className="py-5">
              <BasicInformation />
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>
    </div>
  );
};

export default InstituteProfile;
