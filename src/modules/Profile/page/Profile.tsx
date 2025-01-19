import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import "../styles/Profile.css";
import { useGetProfileQuery } from "../api/profileEndpoint";

import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { flight } from "../../../utilities/images";
import UpdateTeacherProfile from "../components/UpdateTeacherProfile";
import UpdateStudentProfile from "../components/UpdatedStudentsProfile";
import UpdateEmployeeProfile from "../components/UpdatedEmpoyeeProfile";
import { capitalize } from "../../../common/capitalize/Capitalize";

const Profile: React.FC = () => {
  const { data: profileData, isFetching } = useGetProfileQuery();
  const [edit, setEdit] = useState<{ profile?: boolean; password?: boolean }>({
    profile: false,
    password: false,
  });

  const { username, teacher, student, employee } = profileData?.data || {};

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
    }
    return [];
  };

  const handleProfileUpdateSuccess = () => {
    setEdit((prev) => ({ ...prev, profile: false }));
  };

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
                {username}
              </Typography.Text>
              {/* <Typography.Text type="secondary">{email}</Typography.Text> */}
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

            {/* {edit.password && (
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
            )} */}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Profile;
