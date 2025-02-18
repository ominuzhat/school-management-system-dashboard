import { Card, Col, Input, Row, Typography, Button, Form } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useLoginMutation } from "../api/loginEndpoint";
import {
  loggedIn,
  // clearMessage,
  setMessage,
} from "../../../app/features/authSlice";
import { openNotification } from "../../../app/features/notificationSlice";
import { passwordValidator } from "../../../utilities/validator";
import { RootState } from "../../../app/store";
import { schoolBag, logo } from "../../../utilities/images";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hash = queryParams.get("hash");
  const { message } = useSelector((state: RootState) => state.auth);
  const from: string = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (hash) {
      const verifyEmail = async () => {
        try {
          const response = await axios.post(
            "https://code-canvas-official-app.onrender.com/auth/verify-email",
            {},
            { headers: { Authorization: `Bearer ${hash}` } }
          );
          enqueueSnackbar("Verification Successful", { variant: "success" });
          dispatch(
            loggedIn({
              success: response.data.success,
              access: response.data.data.access,
            })
          );
          localStorage.setItem("TOKEN_NAME", response.data.data.access);
          dispatch(
            openNotification({
              type: "success",
              message: "You have successfully logged in.",
            })
          );
          navigate(from);
        } catch (error) {
          enqueueSnackbar("Verification Unsuccessful", { variant: "error" });
        }
      };
      verifyEmail();
    }
  }, [dispatch, from, hash, navigate]);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const response = await login(values).unwrap();
      if (response.success) {
        enqueueSnackbar("Check Your Mail for Confirmation", {
          variant: "success",
        });
      }
    } catch (error) {
      dispatch(setMessage("We're sorry, our system is currently unavailable."));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 px-4">
      <Card className=" shadow-2xl p-8 rounded-xl glassy-card">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col lg={12}>
          <img src={schoolBag} alt="bag" />
          </Col>

          <Col lg={12}>
            <div  className="text-center">
              <img src={logo} alt="Logo" className="w-40 mx-auto mb-4" />
              <Typography.Title level={3} className="">
                Welcome Code Canvas Creation!
              </Typography.Title>
              <Typography.Text className="">
                Login to your account below
              </Typography.Text>
            </div>

            <div  className="mt-4">
              <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="username" rules={[{ required: true }]}>
                  <Input
                    prefix={<Iconify name="ph:user" />}
                    placeholder="Username"
                    className="input-style"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true }, { validator: passwordValidator }]}
                >
                  <Input.Password
                    prefix={<Iconify name="ant-design:lock-outlined" />}
                    placeholder="Password"
                    className="input-style"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                  className="login-btn"
                >
                  Login
                </Button>
              </Form>

              <div className="text-right mt-3">
                <Link to="/send-otp">
                  <Typography.Link className="text-gray-300 hover:text-white">
                    Forgot Password?
                  </Typography.Link>
                </Link>
              </div>

              {message && (
                <Typography.Text type="danger" className="block mt-2">
                  {message}
                </Typography.Text>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;
