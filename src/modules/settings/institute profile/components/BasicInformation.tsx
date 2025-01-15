import { Card, Col, Row } from "antd";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

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
        <Col span={24} className="space-y-2">
          <Card>
            <Row>
              <Col span={8} className="space-y-2">
                <div>
                  <span className="font-semibold">Address</span>
                  <p className="flex items-center gap-1">
                    <MdOutlineSubdirectoryArrowRight />
                    SobujBagh, Dhaka
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Address</span>
                  <p className="flex items-center gap-1">
                    <MdOutlineSubdirectoryArrowRight />
                    SobujBagh, Dhaka
                  </p>
                </div>
                <div>
                  <span className="font-semibold">Address</span>
                  <p className="flex items-center gap-1">
                    <MdOutlineSubdirectoryArrowRight />
                    SobujBagh, Dhaka
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
