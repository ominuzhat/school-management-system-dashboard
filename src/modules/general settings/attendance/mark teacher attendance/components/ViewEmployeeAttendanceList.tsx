/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Card, Col, DatePicker, Row, Select } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import dayjs from "dayjs";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetTeacherAttendanceListQuery } from "../api/teacherAttendanceEndPoints";
import useEmployeeAttendanceListColumns from "../utils/employeeAttendanceListColumns";

const { Option } = Select;

const ViewEmployeeAttendanceList = () => {
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
  });

  const { data: employeeAttendanceList, isLoading } =
    useGetTeacherAttendanceListQuery({ date: formData.date });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //   const handleSearch = () => {
  //     if (formData?.date) {
  //       fetchAttendance(formData);
  //     } else {
  //       const { date, ...updatedFormData }: any = formData;

  //       fetchAttendance(updatedFormData);
  //     }
  //   };

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
            </Row>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          loading={isLoading}
          total={employeeAttendanceList?.data?.results?.length}
          dataSource={employeeAttendanceList?.data?.results}
          columns={useEmployeeAttendanceListColumns()}
        />
      </Card>
    </div>
  );
};

export default ViewEmployeeAttendanceList;
