import { Badge, Card, Col, Row } from "antd";
import { no_img } from "../../../../utilities/images";

const StudentInformation = () => {
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
        <Col lg={18} className="space-y-2">
          <Badge.Ribbon text="Student Information" placement="start">
            <Card className="py-2">
              <Row>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Gender:</span> Male
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Class:</span> 1
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Date of Admission:</span>{" "}
                      10-12-2024
                    </p>
                  </div>
                </Col>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Mobile No:</span>{" "}
                      0162404050
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Date of Birth:</span>{" "}
                      10-10-1998
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Student Birth ID :</span>{" "}
                      0162404050
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
          </Badge.Ribbon>
          <Badge.Ribbon text="Father Information" placement="start">
            <Card className="py-2">
              <Row>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Father Name :</span> Mr.
                      Alom
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Father Mobile No :</span>{" "}
                      0168520741
                    </p>
                  </div>
                </Col>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Father NID :</span>{" "}
                      0168520741
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Occupation:</span> Doctor
                    </p>
                  </div>
                </Col>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Father NID :</span>{" "}
                      0168520741
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Income:</span> 52000
                    </p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Badge.Ribbon>

          <Badge.Ribbon text="Mother Information" placement="start">
            <Card className="py-2">
              <Row>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Mother Name :</span> Mrs.
                      Alom
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Mother Mobile No :</span>{" "}
                      0168520741
                    </p>
                  </div>
                </Col>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Mother NID :</span>{" "}
                      0168520741
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Occupation:</span> Doctor
                    </p>
                  </div>
                </Col>
                <Col span={8} className="space-y-2">
                  <div>
                    <p>
                      <span className="font-semibold">Mother NID :</span>{" "}
                      0168520741
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Income:</span> 52000
                    </p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>
    </div>
  );
};

export default StudentInformation;
