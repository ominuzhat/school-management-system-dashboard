import React, { useEffect, useState } from "react";
import "../styles/forgot-password.css";
import { forgot_password_image } from "../../../utilities/images";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import { Form } from "../../../common/CommonAnt";
import { MatchOTPTypes } from "../types/authTypes";
import { otpValidator } from "../../../utilities/validator";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { clearMessage } from "../../../app/features/authSlice";

const MatchOTP: React.FC = () => {
  const { message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [time, setTime] = useState<number>(3 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const onFinish = () => {};

  const handleOnFocus = (): void => {
    dispatch(clearMessage());
  };

  return (
    <React.Fragment>
      <div className="forgot-password-container">
        <Card className="forgot-password-form">
          <Row
            justify="space-around"
            align="middle"
            className="forgot-password-body"
          >
            <Col span={24} md={12} className="forgot-password-left-side">
              {/* <img
                src={logo}
                alt="main logo"
                style={{ width: "50%", height: "100%", objectFit: "contain" }}
              /> */}
              <Typography.Text className="forgot-password-title">
                Check Your Email
              </Typography.Text>
              <Typography.Text type="secondary" style={{ display: "block" }}>
                We'll send you a <strong>One Time Password</strong> on your
                email address.
              </Typography.Text>

              <br />

              <Typography.Text
                style={{
                  background: "rgb(0, 128, 0, 0.1)",
                  display: "block",
                  textAlign: "center",
                  padding: "8px",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                {formatTime(time)}
              </Typography.Text>

              <br />

              <Form onFinish={onFinish} buttonLabel="Verify" isLoading>
                <Form.Item<MatchOTPTypes>
                  label="Enter Verification Code"
                  name="otp"
                  rules={[{ required: true }, { validator: otpValidator }]}
                >
                  <Input.OTP onFocus={handleOnFocus} />
                </Form.Item>
              </Form>
              <Typography.Text type="danger" style={{ display: "block" }}>
                {message}
              </Typography.Text>
              <Button
                type="link"
                icon={<Iconify name="carbon:return" />}
                onClick={() => navigate("/send-otp")}
              >
                Go Back
              </Button>
            </Col>
            <Col span={24} md={12} className="forgot-password-right-side">
              <img
                src={forgot_password_image}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default MatchOTP;
