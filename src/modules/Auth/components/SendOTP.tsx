import React from "react";
import "../styles/forgot-password.css";
import { forgot_password_image } from "../../../utilities/images";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import { Form } from "../../../common/CommonAnt";
import { SendOTPTypes } from "../types/authTypes";
import { emailValidator } from "../../../utilities/validator";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { clearMessage } from "../../../app/features/authSlice";
import { useSendOtpMutation } from "../api/loginEndpoint";

const SendOTP: React.FC = () => {
  const { message } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const onFinish = async (values: { email: string }) => {
    const result = await sendOtp(values);

    if (result?.data?.success) {
      localStorage.setItem("send-email-otp", values.email);
      navigate("/match-otp");
    }
  };

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
                Forgot Password
              </Typography.Text>
              <Typography.Text type="secondary" style={{ display: "block" }}>
                Enter the Email associated with your account, and we'll send you
                a reset link.
              </Typography.Text>

              <br />
              <br />

              <Form
                onFinish={onFinish}
                buttonLabel="Get OTP"
                isLoading={isLoading}
              >
                <Form.Item<SendOTPTypes>
                  label="Email Address"
                  name="email"
                  rules={[{ required: true }, { validator: emailValidator }]}
                >
                  <Input
                    onFocus={handleOnFocus}
                    prefix={<Iconify name="ph:user" />}
                    placeholder="e.g: some@example.com"
                  />
                </Form.Item>
              </Form>
              <Typography.Text type="danger" style={{ display: "block" }}>
                {message}
              </Typography.Text>
              <Button
                type="link"
                icon={<Iconify name="carbon:return" />}
                onClick={() => navigate("/login")}
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

export default SendOTP;
