import { useParams } from "react-router-dom";
import { useGetSingleEmployeeQuery } from "../api/employeeEndPoints";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import {
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Divider,
  Space,
  Button,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const SingleViewEmployee = () => {
  const { employeeId } = useParams();
  const { data: singleEmployee } = useGetSingleEmployeeQuery(Number(employeeId));
  const employee = singleEmployee?.data;

  return (
    <div className="container">
      {/* Breadcrumb Section */}
      <div className="my-5">
        <BreadCrumb />
      </div>

      {/* Employee Information Section */}
      <Row gutter={[24, 24]} justify="center">
        <Col span={24}>
          <Card
            title={<Title level={2}>Employee Details</Title>}
            bordered={false}
            extra={
              <Tag color={employee?.is_active ? "green" : "red"}>
                {employee?.is_active ? "Active" : "Inactive"}
              </Tag>
            }
            style={{
              background: "#ffffff",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "24px",
              transition: "all 0.3s ease",
            }}
            hoverable
          >
            <Row gutter={[16, 24]}>
              {/* Personal Information Section */}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  bordered={false}
                  title="Personal Information"
                  style={{
                    // backgroundColor: "#f7f7f7",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Text strong>Full Name: </Text>
                  <Text>
                    {employee?.first_name} {employee?.last_name}
                  </Text>
                  <Divider />
                  <Text strong>Email: </Text>
                  <Text>{employee?.email}</Text>
                  <Divider />
                  <Text strong>Phone: </Text>
                  <Text>{employee?.phone_number}</Text>
                </Card>
              </Col>

              {/* Position & Salary Section */}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  bordered={false}
                  title="Position & Salary"
                  style={{
                    // backgroundColor: "#f7f7f7",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Text strong>Position: </Text>
                  <Text>{employee?.position}</Text>
                  <Divider />
                  <Text strong>Department: </Text>
                  <Text>{employee?.department?.name}</Text>
                  <Divider />
                  <Text strong>Base Salary: </Text>
                  <Text>${employee?.base_salary}</Text>
                  <Divider />
                  <Text strong>Hire Date: </Text>
                  <Text>{employee?.hire_date}</Text>
                </Card>
              </Col>

              {/* Institution Section */}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  bordered={false}
                  title="Institution"
                  style={{
                    // backgroundColor: "#f7f7f7",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Text strong>Institution: </Text>
                  <Text>{employee?.user?.role?.institution?.name}</Text>
                  <Divider />
                  <Text strong>Location: </Text>
                  <Text>{employee?.user?.role?.institution?.city}</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Account Settings Section */}
      <Row gutter={[24, 24]} justify="center" className="my-5">
        <Col span={24}>
          <Card
            title="Account Settings"
            bordered={false}
            style={{
              background: "#ffffff",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "24px",
              transition: "all 0.3s ease",
            }}
            hoverable
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Username: </Text>
                <Text>{employee?.user?.username}</Text>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Last Login: </Text>
                <Text>{new Date(employee?.user?.last_login).toLocaleString()}</Text>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Account Status: </Text>
                <Space>
                  {employee?.user?.is_active ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Active
                    </Tag>
                  ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Inactive
                    </Tag>
                  )}
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleViewEmployee;
