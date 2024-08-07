import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Image,
  Input,
  Row,
  Select,
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
import { passwordValidator } from "../../../utilities/validator";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { flight } from "../../../utilities/images";

const Profile: React.FC = () => {
  const { data: profileData, isFetching } = useGetProfileQuery();
  const { Option } = Select;

  console.log("first", profileData);

  const { email, firstName, lastName, role, details, phone } =
    profileData?.data || {};

  const [create] = useUpdateProfileMutation();
  const [edit, setEdit] = useState<{ profile?: boolean; password?: boolean }>({
    profile: false,
    password: false,
  });

  const [form] = Form.useForm();

  const onFinish: FormProps<ProfileTypes>["onFinish"] = async (values) => {
    console.log(values);
    create(values);
    // return;
  };

  useEffect(() => {
    form.setFieldsValue(profileData?.data);
  }, [profileData?.data, form]);

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
                {firstName}
              </Typography.Text>
              <Typography.Text type="secondary">{email}</Typography.Text>
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
                    label: "First Name",
                    children: firstName ? firstName : "N/A",
                  },
                  {
                    key: "2",
                    label: "Last Name",
                    children: lastName ? lastName : "N/A",
                  },
                  {
                    key: "3",
                    label: "Email Address",
                    children: email ? email : "N/A",
                  },
                  {
                    key: "3",
                    label: "Details",
                    children: details ? details : "N/A",
                  },
                  {
                    key: "4",
                    label: "Role",
                    children: role?.name ? (
                      <Tag color="blue">{role?.name}</Tag>
                    ) : (
                      <Tag color="red">N/A</Tag>
                    ),
                  },
                ]}
              />
            )}

            {edit.profile && (
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item<ProfileTypes> label="First Name" name="firstName">
                  <Input size="large" placeholder="First name" />
                </Form.Item>
                <Form.Item<ProfileTypes> label="Last Name" name="lastName">
                  <Input size="large" placeholder="Last name" />
                </Form.Item>
                <Form.Item<ProfileTypes> label="Phone" name="phone">
                  <Input size="large" placeholder="Phone Number" />
                </Form.Item>
                <Form.Item<ProfileTypes> label="Address" name="address">
                  <Input size="large" placeholder="address Number" />
                </Form.Item>
                {/* <Form.Item<ProfileTypes> label="Gender" name="gender">
                  <Select size="large" placeholder="Select Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item> */}
                {/* <Form.Item<ProfileTypes> label="Role" name="role">
                  <Select size="large" placeholder="Select Role">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item> */}

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
