import { Card, Col, Input, Row, Typography, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../api/loginEndpoint";
import {
  clearMessage,
  loggedIn,
  setMessage,
} from "../../../app/features/authSlice";
import { openNotification } from "../../../app/features/notificationSlice";
import { RootState } from "../../../app/store";
import { schoolBag, mainLogo } from "../../../utilities/images";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import "../styles/Login.css";
import { LoginTypes } from "../types/authTypes";
import { TOKEN_NAME } from "../../../utilities/baseQuery";

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const { message } = useSelector((state: RootState) => state.auth);

  const from: string = "/";

  const onFinish = async (values: LoginTypes): Promise<void> => {
    try {
      const response = await login({
        ...values,
      }).unwrap();
      const { success, data } = response as any;
      dispatch(
        openNotification({
          type: "success",
          message: "You have successfully logged in.",
        })
      );
      dispatch(loggedIn({ success, access: data?.access }));
      localStorage.setItem(
        TOKEN_NAME,
        JSON.stringify({ success, access: data?.access })
      );
      window.location.href = from;
    } catch (error: any) {
      const errorRes = error?.data?.message
        ? error?.data.message
        : "We're sorry, our system is currently unavailable.";
      dispatch(setMessage(errorRes));
    }
  };

  const handleOnFocus = (): void => {
    dispatch(clearMessage());
  };
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <Card className=" shadow-2xl p-8 rounded-xl glassy-card">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col lg={12} className="w-full ">
            <img src={schoolBag} alt="bag" className="mx-auto" />
          </Col>

          <Col lg={12} sm={24} className=" w-full">
            <div className="text-center">
              <img src={mainLogo} alt="Logo" className="w-40 mx-auto mb-4" />
              {/* <Typography.Title level={3} className="">
                Welcome Patthoshala
              </Typography.Title> */}
              <Typography.Text className="">
                Login to your account below
              </Typography.Text>
            </div>

            <div className="mt-4">
              <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="username" rules={[{ required: true }]}>
                  <Input
                    onFocus={handleOnFocus}
                    prefix={<Iconify name="ph:user" />}
                    placeholder="Username"
                    className="input-style"
                  />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                  <Input.Password
                    onFocus={handleOnFocus}
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
