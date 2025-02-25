import { Card, Col, Flex, Row, Typography } from "antd";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { PiStudent, PiChalkboardTeacher } from "react-icons/pi";

const OverallStatistic = ({ dashboardInfo }: any) => {

  const { total_admissions, total_employees, total_students, total_teachers } =
    dashboardInfo?.data || {};

  const statistic = [
    {
      id: 1,
      title: "Total Admissions",
      count: total_admissions ?? 0,
      icon: <IoPersonAddSharp size={28} className="text-white" />,
      bgColor: "from-[#1d97a3] to-[#14141428]",
      iconBg: "bg-[#1d97a3]",
    },
    {
      id: 2,
      title: "Total Students",
      count: total_students ?? 0,
      icon: <PiStudent size={28} className="text-white" />,
      bgColor: "from-[#1d57a3] to-[#1414141f]",
      iconBg: "bg-[#1d57a3]",
    },
    {
      id: 3,
      title: "Total Employees",
      count: total_employees ?? 0,
      icon: <IoIosPeople size={28} className="text-white" />,
      bgColor: "from-[#1da381] to-[#14141428]",
      iconBg: "bg-[#1da381]",
    },

    {
      id: 4,
      title: "Total Teachers",
      count: total_teachers ?? 0,
      icon: <PiChalkboardTeacher size={28} className="text-white" />,
      bgColor: "from-[#a31d91be] to-[#14141444]",
      iconBg: "bg-[#a31d91be]",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {statistic.map(({ title, count, icon, bgColor, iconBg }, index) => (
        <Col span={24} md={12} lg={6} key={index}>
          <Card
            className={`bg-gradient-to-r ${bgColor} shadow-lg rounded-xl p-5`}
          >
            <Flex justify="space-between" align="center">
              <div>
                <Typography.Text
                  strong
                  className="text-sm uppercase text-gray-300"
                >
                  {title}
                </Typography.Text>
                <Typography.Text
                  strong
                  className="block text-3xl text-white mt-1"
                >
                  {count}
                </Typography.Text>
              </div>
              <div
                className={`w-12 h-12 flex items-center justify-center ${iconBg} bg-opacity-90 rounded-full shadow-md`}
              >
                {icon}
              </div>
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OverallStatistic;
