import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  notification,
  Row,
  Select,
  Table,
} from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import Iconify from "../../../../../common/IconifyConfig/IconifyConfig";
import { useState } from "react";
import { useLazyGetAdmissionQuery } from "../../../admission/api/admissionEndPoints";
import MarkStudentsAttendanceColumns from "../utils/MarkStudentsAttendanceColumn";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useCreateStudentAttendanceMutation } from "../api/studentAttendanceEndPoints";

const { Option } = Select;

const MarkStudentsAttendance = () => {
  const [result, setResult] = useState();
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    grade_level: undefined,
    session: undefined,
  });
  const [create] = useCreateStudentAttendanceMutation();
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const { data: classData } = useGetClassesQuery({});
  const [fetchAdmissionData, { data: admissionData, isLoading }] =
    useLazyGetAdmissionQuery({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    if (formData.session !== undefined && formData.grade_level !== undefined) {
      fetchAdmissionData(formData);
    } else {
      notification.open({
        message: "Alert",
        description: "Select Class and Session First",
      });
    }
  };

  const handleAttendanceSubmit = () => {
    create(result);
  };

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" align="middle" gutter={[10, 10]}>
          <Col lg={20}>
            <Row gutter={[16, 16]}>
              <Col lg={4} xs={24}>
                <DatePicker
                  className="w-full"
                  defaultValue={dayjs()}
                  format="YYYY-MM-DD"
                  onChange={(date) =>
                    handleChange(
                      "date",
                      date ? dayjs(date).format("YYYY-MM-DD") : null
                    )
                  }
                />
              </Col>
              <Col lg={4} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  onChange={(value) => handleChange("grade_level", value)}
                >
                  {Array.isArray(classData?.data) &&
                    classData.data.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data.name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col lg={4} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Session"
                  allowClear
                  showSearch
                  onChange={(value) => handleChange("session", value)}
                >
                  {Array.isArray(sessionData?.data) &&
                    sessionData?.data.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>
            </Row>
          </Col>

          {/* Search Button */}
          <Col lg={4} xs={24}>
            <Button
              type="primary"
              htmlType="button"
              icon={<Iconify name="iconamoon:send-fill" />}
              className="w-full"
              onClick={handleSearch}
            >
              Search Students
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          loading={isLoading}
          dataSource={admissionData?.data?.results}
          columns={MarkStudentsAttendanceColumns({
            admissionData: admissionData?.data?.results || [],
            formData,
            setResult,
          })}
          pagination={false}
          rowKey="id"
        />
        <Button
          className="mt-5"
          type="primary"
          onClick={handleAttendanceSubmit}
        >
          Submit Attendance
        </Button>
      </Card>
    </div>
  );
};

export default MarkStudentsAttendance;
