import { Button, Card, Col, DatePicker, notification, Row, Select } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import Iconify from "../../../../../common/IconifyConfig/IconifyConfig";
import { useState } from "react";
import { useLazyGetStudentAttendanceQuery } from "../api/studentAttendanceEndPoints";

const { Option } = Select;

const ViewStudentsAttendanceList = () => {
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const { data: classData } = useGetClassesQuery({});
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    grade_level: undefined,
    session: undefined,
  });

  // Use lazy query hook to fetch data when the button is clicked
  const [fetchAttendance, { data: admissionData, isLoading }] =
    useLazyGetStudentAttendanceQuery();

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(admissionData); // You can see the data here after fetching

  const handleSearch = () => {
    if (formData.session && formData.grade_level) {
      // Trigger the API call with the formData
      fetchAttendance(formData);
    } else {
      notification.open({
        message: "Alert",
        description: "Select Class and Session First",
      });
    }
  };

  return (
    <div>
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
                    classData?.data?.map((data: any) => (
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
                    sessionData?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>
            </Row>
          </Col>

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

      {/* Show loading or the fetched admission data */}
      {isLoading && <div>Loading...</div>}
      {admissionData && (
        <div>
          {/* Render your attendance data here */}
          <pre>{JSON.stringify(admissionData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ViewStudentsAttendanceList;
