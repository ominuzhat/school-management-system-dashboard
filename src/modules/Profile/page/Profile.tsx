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
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import "../styles/Profile.css";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
} from "../api/profileEndpoint";

import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { avatar } from "../../../utilities/images";
import UpdateTeacherProfile from "../components/UpdateTeacherProfile";
import UpdateStudentProfile from "../components/UpdatedStudentsProfile";
import UpdateEmployeeProfile from "../components/UpdatedEmpoyeeProfile";
import { capitalize } from "../../../common/capitalize/Capitalize";
import { PasswordTypes } from "../types/profileTypes";
import { passwordValidator } from "../../../utilities/validator";

const Profile: React.FC = () => {
  const { data: profileData, isFetching } = useGetProfileQuery();
  const [edit, setEdit] = useState<{ profile?: boolean; password?: boolean }>({
    profile: false,
    password: false,
  });

  const { username, teacher, student, employee, role } =
    profileData?.data || {};

  console.log(profileData?.data);

  const renderDescriptions = () => {
    if (teacher) {
      return [
        {
          key: "1",
          label: capitalize("first name"),
          children: capitalize(teacher.first_name || "N/A"),
        },
        {
          key: "2",
          label: capitalize("last name"),
          children: capitalize(teacher.last_name || "N/A"),
        },
        {
          key: "3",
          label: capitalize("phone number"),
          children: capitalize(teacher.phone_number || "N/A"),
        },
      ];
    } else if (student) {
      return [
        {
          key: "1",
          label: capitalize("student id"),
          children: capitalize(student.student_id || "N/A"),
        },
        {
          key: "2",
          label: capitalize("grade"),
          children: capitalize(student.grade || "N/A"),
        },
        {
          key: "3",
          label: capitalize("email address"),
          children: capitalize(student.email || "N/A"),
        },
      ];
    } else if (employee) {
      return [
        {
          key: "1",
          label: capitalize("employee id"),
          children: capitalize(employee.employee_id || "N/A"),
        },
        {
          key: "2",
          label: capitalize("department"),
          children: capitalize(employee.department || "N/A"),
        },
        {
          key: "3",
          label: capitalize("email address"),
          children: capitalize(employee.email || "N/A"),
        },
      ];
    } else if (role?.name === "Admin") {
      return [
        {
          key: "1",
          label: capitalize("Institution Name"),
          children: capitalize(role?.institution.name || "N/A"),
        },
        {
          key: "2",
          label: capitalize("code"),
          children: capitalize(role?.institution.code || "N/A"),
        },
        {
          key: "3",
          label: capitalize("city"),
          children: capitalize(role?.institution.city || "N/A"),
        },
        {
          key: "4",
          label: capitalize("contact email"),
          children: capitalize(role?.institution.contact_email || "N/A"),
        },
      ];
    }
    return [];
  };

  const handleProfileUpdateSuccess = () => {
    setEdit((prev) => ({ ...prev, profile: false }));
  };

  const [create, { isSuccess }] = useChangePasswordMutation();

  const onFinish = (values: any): void => {
    console.log(values);
    create({
      current_password: values.old_password,
      new_password: values.new_password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setEdit((prev) => ({ ...prev, password: false }));
    }
  }, [isSuccess]);

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
                src={avatar}
                preview={false}
                alt="Profile picture"
                id="profile-picture"
              />
              <Typography.Text strong style={{ fontSize: "2rem" }}>
                {username}
              </Typography.Text>
              {/* <Typography.Text type="secondary">{email}</Typography.Text> */}
              <Tag color="success" bordered>
                Active
              </Tag>

              <Button
                onClick={() =>
                  setEdit((prev) => ({ ...prev, password: !prev.password }))
                }
                style={{ fontSize: "11px", textDecoration: "underline" }}
                size="small"
                type="link"
              >
                {edit.password ? "Cancel Password Change" : "Change Password"}
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
              role?.name !== "Admin" && (
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
                      onClick={() =>
                        setEdit({ profile: false, password: false })
                      }
                    >
                      Cancel
                    </Button>
                  )}
                </Space>
              )
            }
          >
            {!edit.profile && !edit.password && (
              <Descriptions
                bordered
                column={1}
                layout="horizontal"
                className="profile-description"
                items={renderDescriptions()}
              />
            )}

            {edit.profile && teacher && (
              <UpdateTeacherProfile
                data={profileData?.data}
                onSubmitSuccess={handleProfileUpdateSuccess}
              />
            )}

            {edit.profile && student && (
              <UpdateStudentProfile
                data={profileData?.data}
                onSubmitSuccess={handleProfileUpdateSuccess}
              />
            )}
            {edit.profile && student && (
              <UpdateEmployeeProfile
                data={profileData?.data}
                onSubmitSuccess={handleProfileUpdateSuccess}
              />
            )}

            {edit.password && (
              <Form
                // form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item<PasswordTypes>
                  label="Current Password"
                  name="old_password"
                  rules={[{ validator: passwordValidator }]}
                >
                  <Input.Password placeholder="**********" />
                </Form.Item>

                <Form.Item<PasswordTypes>
                  label="New Password"
                  name="new_password"
                  rules={[{ validator: passwordValidator }]}
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirm_password"
                  dependencies={["new_password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm New Password" />
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
