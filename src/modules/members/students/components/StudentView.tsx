import { Badge, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { no_img } from "../../../../utilities/images";
import { FaArrowsAltH } from "react-icons/fa";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { ThemesTypes } from "../../../../app/features/themeSlice";
import { useState } from "react";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const StudentView = () => {
  const { themes } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row gutter={[24, 16]}>
          <Col lg={16}>
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
                    <span className="font-semibold ">Registration No :</span>{" "}
                    111111
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
                            <span className="font-semibold">
                              Date of Admission:
                            </span>{" "}
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
                            <span className="font-semibold">
                              Date of Birth:
                            </span>{" "}
                            10-10-1998
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">
                              Student Birth ID :
                            </span>{" "}
                            0162404050
                          </p>
                        </div>
                      </Col>
                      <Col span={8} className="space-y-2">
                        <div>
                          <p>
                            <span className="font-semibold">Religion:</span>{" "}
                            Islam
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">Blood Group :</span>{" "}
                            O+
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
                            <span className="font-semibold">Father Name :</span>{" "}
                            Mr. Alom
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">
                              Father Mobile No :
                            </span>{" "}
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
                            <span className="font-semibold">Occupation:</span>{" "}
                            Doctor
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
                            <span className="font-semibold">Mother Name :</span>{" "}
                            Mrs. Alom
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">
                              Mother Mobile No :
                            </span>{" "}
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
                            <span className="font-semibold">Occupation:</span>{" "}
                            Doctor
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
            <Row>
              <Col span={24} className="my-2">
                <Card>1</Card>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={[16, 24]} justify="space-between">
              <Col
                span={7}
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-md py-3 shadow-md"
              >
                <p className="font-semibold">PRESENTS</p>
                <hr className="border-white opacity-50 my-2" />
                <p className="flex items-center gap-2 text-sm">
                  This Month <FaArrowsAltH />{" "}
                  <span className="font-bold">02</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  This Year <FaArrowsAltH />{" "}
                  <span className="font-bold">12</span>
                </p>
              </Col>
              <Col
                span={8}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md px-4 py-3 shadow-md"
              >
                <p className="font-semibold">ATTENDANCE</p>
                <hr className="border-white opacity-50 my-2" />
                <p className="flex items-center gap-2 text-sm">
                  This Month <FaArrowsAltH />{" "}
                  <span className="font-bold">15</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  This Year <FaArrowsAltH />{" "}
                  <span className="font-bold">98</span>
                </p>
              </Col>
              <Col
                span={8}
                className="bg-gradient-to-r from-red-500 to-red-800 text-white rounded-md px-4 py-3 shadow-md"
              >
                <p className="font-semibold">ABSENTS</p>
                <hr className="border-white opacity-50 my-2" />
                <p className="flex items-center gap-2 text-sm">
                  This Month <FaArrowsAltH />{" "}
                  <span className="font-bold">03</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  This Year <FaArrowsAltH />{" "}
                  <span className="font-bold">08</span>
                </p>
              </Col>
            </Row>
            <Row gutter={[10, 16]} className="my-2">
              <Col span={24} lg={24}>
                <Badge.Ribbon text="Fee Report" placement="start">
                  <Card
                    className={`custom-calendar ${
                      themes === "light" ? "light" : "dark"
                    }`}
                  >
                    <Calendar
                      onChange={onChange}
                      value={value}
                      view="year"
                      onClickMonth={(date) => onChange(date)}
                      tileContent={({ view }) =>
                        view === "year" ? (
                          <div style={{ textAlign: "center" }}>
                            <p style={{ margin: 0 }}>1000 BDT</p>
                          </div>
                        ) : null
                      }
                      className={`custom-calendar ${
                        themes === "light" ? "light" : "dark"
                      }`}
                    />
                  </Card>
                </Badge.Ribbon>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StudentView;
