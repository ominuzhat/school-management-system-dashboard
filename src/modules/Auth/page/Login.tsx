import { Card, Col, Input, Row, Typography } from "antd";
import React from "react";
import { ErrorType, LoginTypes } from "../types/authTypes";
import "../styles/Login.css";
import { airplane, login_image } from "../../../utilities/images";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { Form } from "../../../common/CommonAnt";
import { useLoginMutation } from "../api/loginEndpoint";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  loggedIn,
  setMessage,
} from "../../../app/features/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TOKEN_NAME } from "../../../utilities/baseQuery";
import { openNotification } from "../../../app/features/notificationSlice";
import {
  emailValidator,
  passwordValidator,
} from "../../../utilities/validator";
import { RootState } from "../../../app/store";

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = useSelector((state: RootState) => state.auth);

  const from: string = location?.state?.from?.pathname || "/";

  const onFinish = async (values: LoginTypes): Promise<void> => {
    try {
      const response = await login(values).unwrap();
      if (response.success) {
        const { success, token } = response;
        dispatch(loggedIn({ success, token }));
        localStorage.setItem(TOKEN_NAME, JSON.stringify({ success, token }));
        dispatch(
          openNotification({
            type: "success",
            message: "You have successfully logged in.",
          })
        );
        navigate(from);
      }
    } catch (error) {
      const { data, status } = error as ErrorType;
      if (status === "FETCH_ERROR") {
        dispatch(
          setMessage("We're sorry, our system is currently unavailable.")
        );
      } else {
        dispatch(setMessage(data.message));
      }
    }
  };

  const handleOnFocus = (): void => {
    dispatch(clearMessage());
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <Card className="login-form">
          <Row justify="center" align="middle" className="login-form-body">
            <Col span={24} md={12} className="login-left-side">
              <div style={{ textAlign: "center" }}>
                {/* <img
                  src={logo}
                  alt="main logo"
                  style={{ width: "50%", height: "100%", objectFit: "contain" }}
                /> */}
                <Typography.Text className="login-header-title">
                  Nuzhat
                </Typography.Text>
                <Typography.Text type="secondary" style={{ display: "block" }}>
                  Login to you account below.
                </Typography.Text>
              </div>
              <br />

              <Form
                onFinish={onFinish}
                buttonLabel="Login"
                isLoading={isLoading}
                className="form-field-body"
              >
                <Form.Item<LoginTypes>
                  name="email"
                  rules={[{ required: true }, { validator: emailValidator }]}
                >
                  <Input
                    onFocus={handleOnFocus}
                    prefix={<Iconify name="ph:user" />}
                    placeholder="e.g: some@example.com"
                  />
                </Form.Item>

                <Form.Item<LoginTypes>
                  name="password"
                  rules={[{ required: true }, { validator: passwordValidator }]}
                >
                  <Input.Password
                    onFocus={handleOnFocus}
                    prefix={<Iconify name="ant-design:lock-outlined" />}
                    placeholder="********"
                  />
                  <Link to="/send-otp">
                    <Typography.Link
                      style={{
                        display: "block",
                        textAlign: "right",
                        padding: "5px",
                      }}
                    >
                      Forgot Password?
                    </Typography.Link>
                  </Link>
                </Form.Item>
              </Form>

              <Typography.Text type="danger" style={{ display: "block" }}>
                {message}
              </Typography.Text>
            </Col>
            <Col span={24} md={12} className="login-right-side">
              <img
                src={airplane}
                alt="login image"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Login;
