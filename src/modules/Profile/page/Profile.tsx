import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Image,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import type { FormProps } from "antd";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import "../styles/Profile.css";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../api/profileEndpoint";
import { PasswordTypes, ProfileTypes } from "../types/profileTypes";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../../../utilities/validator";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { flight } from "../../../utilities/images";

const Profile: React.FC = () => {
  const { data, isFetching } = useGetProfileQuery();

  console.log("first", data);

  const [create] = useUpdateProfileMutation();
  const [edit, setEdit] = useState<{ profile?: boolean; password?: boolean }>({
    profile: false,
    password: false,
  });

  const [form] = Form.useForm();

  const onFinish: FormProps<ProfileTypes>["onFinish"] = async (values) => {
    console.log(values);
    return;
    create(values);
  };

  useEffect(() => {
    form.setFieldsValue(data?.data);
  }, [data?.data, form]);

  return (
    <React.Fragment>
      <Typography.Text strong className="profile-title">
        Profile
      </Typography.Text>
      <BreadCrumb />

      <br />

      <Row gutter={[10, 10]}>
        <Col span={24} lg={6}>
          <Card loading={isFetching}>
            <Space
              direction="vertical"
              style={{ width: "100%", textAlign: "center" }}
            >
              <Image
                src={flight}
                preview={false}
                alt="Profile picture"
                id="profile-picture"
              />
              <Typography.Text strong style={{ fontSize: "2rem" }}>
                {data?.data?.name}
              </Typography.Text>
              <Typography.Text type="secondary">
                {data?.data?.email}
              </Typography.Text>
              <Tag color="success" bordered>
                Active
              </Tag>

              <Button
                onClick={() => setEdit({ password: true })}
                style={{ fontSize: "11px", textDecoration: "underline" }}
                size="small"
                type="link"
              >
                Change Password
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24} lg={18}>
          <Card
            title={
              <>
                {!edit.password && (
                  <Typography.Text>
                    {edit.profile ? "Edit Profile" : "Profile"}
                  </Typography.Text>
                )}
                {edit.password && (
                  <Typography.Text>Change Password</Typography.Text>
                )}
              </>
            }
            loading={isFetching}
            extra={
              <Space>
                {!edit.profile && !edit.password ? (
                  <Button
                    onClick={() => setEdit({ profile: true })}
                    type="link"
                    icon={<Iconify name="mage:edit" />}
                  >
                    Edit profile
                  </Button>
                ) : (
                  <Button
                    type="link"
                    danger
                    icon={<Iconify name="iconoir:cancel" />}
                    onClick={() => setEdit({ profile: false, password: false })}
                  >
                    Cancel
                  </Button>
                )}
              </Space>
            }
          >
            {!edit.profile && !edit.password && (
              <Descriptions
                bordered
                column={1}
                layout="horizontal"
                className="profile-description"
                items={[
                  {
                    key: "1",
                    label: "Full Name",
                    children: data?.data?.name,
                  },
                  {
                    key: "2",
                    label: "Email Address",
                    children: data?.data?.email,
                  },
                ]}
              />
            )}

            {edit.profile && (
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item<ProfileTypes>
                  label="Username"
                  name="name"
                  rules={[{ validator: nameValidator }]}
                >
                  <Input size="large" placeholder="User name" />
                </Form.Item>

                <Form.Item<ProfileTypes>
                  label="Email Address"
                  name="email"
                  rules={[{ validator: emailValidator }]}
                >
                  <Input readOnly size="large" placeholder="User name" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Now
                  </Button>
                </Form.Item>
              </Form>
            )}

            {edit.password && (
              <Form
                form={form}
                // onFinish={}
                layout="vertical"
              >
                <Form.Item<PasswordTypes>
                  label="Current Password"
                  name="old_password"
                  rules={[{ validator: passwordValidator }]}
                >
                  <Input.Password size="large" placeholder="**********" />
                </Form.Item>

                <Form.Item<PasswordTypes>
                  label="New Password"
                  name="new_password"
                  rules={[{ validator: passwordValidator }]}
                >
                  <Input.Password size="large" placeholder="New Password" />
                </Form.Item>

                <Form.Item<PasswordTypes>
                  label="Confirm New Password"
                  name="new_password"
                  rules={[{ validator: passwordValidator }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Confirm New Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Change
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Profile;
