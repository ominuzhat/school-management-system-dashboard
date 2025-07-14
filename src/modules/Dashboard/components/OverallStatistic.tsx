import { Card, Col, Flex, Row, Typography } from "antd";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { PiStudent, PiChalkboardTeacher } from "react-icons/pi";
import { motion } from "framer-motion";
import CountUp from 'react-countup';
import { Link } from "react-router-dom";

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
  initial: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  }
};

const iconContainerVariants = {
  hover: {
    rotate: 10,
    scale: 1.05
  },
  initial: {
    rotate: 0,
    scale: 1
  }
};

const OverallStatistic = ({ dashboardInfo }: any) => {
  const { total_admissions, total_employees, total_students, total_teachers } =
    dashboardInfo?.data || {};

  const statistic = [
    {
      id: 1,
      title: "Total Admissions",
      count: total_admissions ?? 0,
      icon: <IoPersonAddSharp size={20} className="text-white" />,
      bgColor: "bg-[#6366f1]",
      accentColor: "bg-[#6366f1]/10",
      gradient: "bg-gradient-to-br from-[#6366f1] to-[#a855f7]",
      link: "/admission"
    },
    {
      id: 2,
      title: "Total Students",
      count: total_students ?? 0,
      icon: <PiStudent size={20} className="text-white" />,
      bgColor: "bg-[#3b82f6]",
      accentColor: "bg-[#3b82f6]/10",
      gradient: "bg-gradient-to-br from-[#3b82f6] to-[#6366f1]",
      link: "/students"
    },
    {
      id: 3,
      title: "Total Employees",
      count: total_employees ?? 0,
      icon: <IoIosPeople size={20} className="text-white" />,
      bgColor: "bg-[#10b981]",
      accentColor: "bg-[#10b981]/10",
      gradient: "bg-gradient-to-br from-[#10b981] to-[#3b82f6]",
      link: "/employees"
    },
    {
      id: 4,
      title: "Total Teachers",
      count: total_teachers ?? 0,
      icon: <PiChalkboardTeacher size={20} className="text-white" />,
      bgColor: "bg-[#ec4899]",
      accentColor: "bg-[#ec4899]/10",
      gradient: "bg-gradient-to-br from-[#ec4899] to-[#f43f5e]",
      link: "/teacher"
    },
  ];

  return (
    <Row gutter={[24, 24]} className="px-1">
      {statistic.map(({ title, count, icon, accentColor, gradient, link }, index) => (
        <Col
          key={index}
          xs={24}
          sm={12}
          md={12}
          lg={6}
          xl={6}
        >
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            <Link to={link}>
            <Card
              className={`border-0 rounded-xl overflow-hidden h-full cursor-ponter`}
              bodyStyle={{ padding: 0 }}
            >
              <div className={`h-2 ${gradient}`}></div>
              <Flex justify="space-between"  className="p-6">
                <div>
                  <Typography.Text
                    className={`text-xs font-medium uppercase tracking-wider text-opacity-70`}
                  >
                    {title}
                  </Typography.Text>
                  <Typography.Title
                    level={2}
                    className="mb-0 mt-1 font-bold text-gray-800"
                  >
                    <CountUp 
                      end={count} 
                      duration={2.5}
                      separator=","
                    />
                  </Typography.Title>
                </div>
                <motion.div
                  variants={iconContainerVariants}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${accentColor}`}
                >
                  <div className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center`}>
                    {icon}
                  </div>
                </motion.div>
              </Flex>
              <div className="px-6 pb-4">
                <div className={`h-px ${accentColor}`}></div>
                <Typography.Text className="text-xs text-gray-500 mt-3 block">
                  <span className="font-semibold text-green-500">↑ 12%</span> from last month
                </Typography.Text>
              </div>
            </Card>
            </Link>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

export default OverallStatistic;