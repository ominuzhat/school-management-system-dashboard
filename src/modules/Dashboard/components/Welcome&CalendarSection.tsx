import { useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ThemesTypes } from "../../../app/features/themeSlice";
import helloImg from "../../../../public/Hello.svg";
import { Row, Col, Card, Typography } from "antd";
const { Title } = Typography;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const WelcomeCalendarSection = () => {
  const { themes } = useSelector<RootState, ThemesTypes>(
    (state) => state.themes
  );
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Row gutter={[16, 16]}>
      {/* Welcome Banner */}
      <Col xs={24} md={24} lg={24} xl={24} sm={24} xxl={18}>
        <Card
          className="rounded-lg p-4 md:p-6 lg:p-8 bg-gradient-to-r from-[#abd4f8] to-[#c4999925]"
          bodyStyle={{ padding: 0 }}
        >
          <Row gutter={[16, 16]} align="middle">
            {/* Image Column - appears first on mobile but shifts to left on larger screens */}
            <Col
              xs={24}
              sm={24}
              md={12}
              order={1}
              lg={12}
              className="text-center md:text-left"
            >
              <img
                src={helloImg}
                alt="helloImg"
                className="w-full max-w-[12rem] sm:max-w-[15rem] md:max-w-[18rem] mx-auto md:mx-0"
              />
            </Col>

            {/* Text Column */}
            <Col
              xs={24}
              sm={24}
              md={12}
              order={0}
              lg={12}
              className="text-center md:text-left"
            >
              <Title
                level={2}
                className="!text-white !text-2xl sm:!text-3xl md:!text-4xl !tracking-wide !mb-2"
              >
                Welcome to Admin Dashboard
              </Title>

              <Typography.Text className="!text-white !text-base sm:!text-lg !tracking-wide !opacity-90 !block">
                Manage your operations with ease!
              </Typography.Text>

              <div className="bg-[#abd4f8] mx-auto md:mx-0 rounded-full w-16 h-1 my-3"></div>

              <Typography.Text className="!text-white !text-sm sm:!text-base !tracking-wide !opacity-80 !block">
                Your account is almost ready! Please verify your email address
                to unlock the full potential of your admin dashboard.
              </Typography.Text>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Calendar */}
      <Col xs={24} md={24} lg={24} xl={24} sm={24} xxl={6}>
        {" "}
        <Card
          className={`custom-calendar ${
            themes === "light" ? "light" : "dark"
          } h-full`}
          bodyStyle={{ padding: 12 }}
        >
          <Calendar
            onChange={onChange}
            value={value}
            className={`custom-calendar ${
              themes === "light" ? "light" : "dark"
            } w-full`}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default WelcomeCalendarSection;
