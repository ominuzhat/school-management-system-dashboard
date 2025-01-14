import { Card, Col, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { ErrorType, LoginTypes } from "../types/authTypes";
import "../styles/Login.css";
import { airplane } from "../../../utilities/images";
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
import { passwordValidator } from "../../../utilities/validator";
import { RootState } from "../../../app/store";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

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
            {
              headers: {
                Authorization: `Bearer ${hash}`,
              },
            }
          );
          console.log("Verification successful:", response.data.data);
          if (response) {
            enqueueSnackbar(`Verification SuccessFully `, {
              variant: "success",
            });

            const { success }: any = response;
            dispatch(
              loggedIn({
                success,
                access: response?.data?.data?.access,
              })
            );
            localStorage.setItem(TOKEN_NAME, response?.data?.data?.access);
            // localStorage.setItem(
            //   TOKEN_NAME,
            //   JSON.stringify({
            //     success,
            //     access: response?.data?.data?.access,
            //   })
            // );
            dispatch(
              openNotification({
                type: "success",
                message: "You have successfully logged in.",
              })
            );
            navigate(from);
          }
        } catch (error) {
          console.error("Verification failed:", error);
          enqueueSnackbar(`Verification Unsuccessful `, {
            variant: "error",
          });
        }
      };

      verifyEmail();
    }
  }, [dispatch, from, hash, navigate]);

  const onFinish = async (values: LoginTypes): Promise<void> => {
    try {
      const response = await login(values).unwrap();
      if (response.success === true) {
        enqueueSnackbar(`Check Your mail for confirm the Login`, {
          variant: "success",
        });

        // const { success, data } = response;
        // dispatch(loggedIn({ success, access: data?.access }));
        // localStorage.setItem(
        //   TOKEN_NAME,
        //   JSON.stringify({ success, access: data?.access })
        // );
        // dispatch(
        //   openNotification({
        //     type: "success",
        //     message: "You have successfully logged in.",
        //   })
        // );
        // navigate(from);
      }
    } catch (error) {
      const { status } = error as ErrorType;
      if (status === "FETCH_ERROR") {
        dispatch(
          setMessage("We're sorry, our system is currently unavailable.")
        );
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
                  Code Canvas Creation
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
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input
                    onFocus={handleOnFocus}
                    prefix={<Iconify name="ph:user" />}
                    placeholder="e.g: username"
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
                </Form.Item>
              </Form>

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
