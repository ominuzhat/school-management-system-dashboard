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
      <Col span={24} lg={18}>
        <Row
          gutter={[2, 8]}
          className="rounded-lg px-10 lg:px-20 py-8 lg:flex items-center justify-between bg-gradient-to-r from-[#abd4f8] to-[#c4999925]"
        >
          <Col span={24} lg={12}>
            <img src={helloImg} alt="helloImg" style={{ width: "18rem" }} />
          </Col>
          <Col span={24} lg={12} className="text-center lg:text-left">
            <Title
              level={2}
              className="font-sans text-white text-4xl tracking-wide"
              style={{ marginBottom: 5 }}
            >
              Welcome to Admin Dashboard
            </Title>
            <Typography.Text
              className="font-sans  tracking-wide opacity-90"
              style={{ margin: 0 }}
            >
              Manage your operations with ease!
            </Typography.Text>
            <div className="bg-[#abd4f8]  mx-auto lg:ms-0 rounded-full w-16 h-1 my-2"></div>
            <Typography.Text
              className="font-sans  text-md tracking-wide opacity-80"
              style={{ margin: 0 }}
            >
              Your account is almost ready! Please verify your email address to
              unlock the full potential of your admin dashboard.
            </Typography.Text>
          </Col>
        </Row>

        {/* <div ></div> */}
      </Col>

      {/* Calendar */}
      <Col span={24} lg={6}>
        <Card
          className={`custom-calendar ${themes === "light" ? "light" : "dark"}`}
        >
          <Calendar
            onChange={onChange}
            value={value}
            className={`custom-calendar ${
              themes === "light" ? "light" : "dark"
            }`}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default WelcomeCalendarSection;
