import { Card, Col, Row } from "antd";
import { no_img } from "../../../../utilities/images";

const BasicInformation = () => {
  return (
    <div>
      <Row
        gutter={[16, 16]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Col lg={6}>
          <Card className="text-center ">
            <img src={no_img} className="mx-auto " />
            <p className="text-xl font-semibold uppercase font-serif pt-5">
              Omi Hasan
            </p>
            <p className="pt-2">
              <span className="font-semibold ">Registration No :</span> 111111
            </p>
          </Card>
        </Col>
        <Col span={18} className="space-y-2">
          <Card>
            <Row>
              <Col span={8} className="space-y-2">
                <div>
                  <p>
                    <span className="font-semibold">Address</span> SobujBagh,
                    Dhaka
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Contact Email:</span>{" "}
                    omihasan@gmail.com
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Phone Number:</span>{" "}
                    0162404050
                  </p>
                </div>
              </Col>
              <Col span={8} className="space-y-2">
                <div>
                  <p>
                    <span className="font-semibold">Established Date:</span>{" "}
                    10/12/2000
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Institution Type:</span>{" "}
                    Coaching
                  </p>
                </div>
              </Col>
              <Col span={8} className="space-y-2">
                <div>
                  <p>
                    <span className="font-semibold">Religion:</span> Islam
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Blood Group :</span> O+
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BasicInformation;
