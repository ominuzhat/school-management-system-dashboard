import { Card, Col, Flex, Row, Typography } from "antd";
import { FaRegUser, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { PiClockCountdown } from "react-icons/pi";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const cardVariants = {
  hover: {
    y: -5,
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  initial: {
    y: 0,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
};

const iconContainerVariants = {
  hover: {
    rotate: 10,
    scale: 1.05,
  },
  initial: {
    rotate: 0,
    scale: 1,
  },
};

const OverallAttendanceStatistic = ({ dashboardInfo }: any) => {
  const {
    total = 0,
    present = 0,
    absent = 0,
    late = 0,
    present_percentage = 0,
    absent_percentage = 0,
    late_percentage = 0,
  } = dashboardInfo || {};

  const statistics = [
    {
      id: 1,
      title: "Total Attendance",
      count: total,
      icon: <FaRegUser size={20} className="text-white" />,
      bgColor: "bg-[#6366f1]",
      accentColor: "bg-[#6366f1]/10",
      gradient: "bg-gradient-to-br from-[#6366f1] to-[#a855f7]",
      link: "/attendance",
      description: "Total attendance records",
    },
    {
      id: 2,
      title: "Total Present",
      count: present,
      percentage: present_percentage,
      icon: <FaUserCheck size={20} className="text-white" />,
      bgColor: "bg-[#10b981]",
      accentColor: "bg-[#10b981]/10",
      gradient: "bg-gradient-to-br from-[#10b981] to-[#3b82f6]",
      link: "/attendance?status=present",
      description: "Present today",
    },
    {
      id: 3,
      title: "Total Absent",
      count: absent,
      percentage: absent_percentage,
      icon: <FaUserTimes size={20} className="text-white" />,
      bgColor: "bg-[#f43f5e]",
      accentColor: "bg-[#f43f5e]/10",
      gradient: "bg-gradient-to-br from-[#f43f5e] to-[#ec4899]",
      link: "/attendance?status=absent",
      description: "Absent today",
    },
    {
      id: 4,
      title: "Total Late",
      count: late,
      percentage: late_percentage,
      icon: <PiClockCountdown size={20} className="text-white" />,
      bgColor: "bg-[#f59e0b]",
      accentColor: "bg-[#f59e0b]/10",
      gradient: "bg-gradient-to-br from-[#f59e0b] to-[#f97316]",
      link: "/attendance?status=late",
      description: "Late arrivals",
    },
  ];

  return (
    <Row gutter={[24, 24]} className="px-1">
      {statistics.map(
        (
          { title, count, icon, accentColor, gradient, link, percentage },
          index
        ) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}>
            <motion.div
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Link to={link}>
                <Card
                  className={`border-0 rounded-xl overflow-hidden h-full cursor-pointer`}
                  bodyStyle={{ padding: 0 }}
                >
                  <Flex justify="space-between" className="p-6">
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
                        <CountUp end={count} duration={2.5} separator="," />
                      </Typography.Title>
                      {percentage !== undefined && (
                        <Typography.Text className="text-sm text-gray-500">
                          {percentage.toFixed(1)}%
                        </Typography.Text>
                      )}
                    </div>
                    <motion.div
                      variants={iconContainerVariants}
                      transition={{ duration: 0.3 }}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${accentColor}`}
                    >
                      <div
                        className={`w-10 h-10 ${gradient} rounded-lg flex items-center justify-center`}
                      >
                        {icon}
                      </div>
                    </motion.div>
                  </Flex>
                </Card>
              </Link>
            </motion.div>
          </Col>
        )
      )}
    </Row>
  );
};

export default OverallAttendanceStatistic;
