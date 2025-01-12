import { Col, Row } from "antd";
import { FaArrowsAltH } from "react-icons/fa";

const StudentsAttendance = () => {
  return (
    <div>
      <Row gutter={[16, 24]} justify="space-between">
        <Col
          span={7}
          className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-md py-3 shadow-md"
        >
          <p className="font-semibold">PRESENTS</p>
          <hr className="border-white opacity-50 my-2" />
          <p className="flex items-center justify-between gap-2 text-sm">
            This Month <FaArrowsAltH /> <span className="font-bold">02</span>
          </p>
          <p className="flex items-center justify-between gap-2 text-sm">
            This Year <FaArrowsAltH /> <span className="font-bold">12</span>
          </p>
        </Col>
        <Col
          span={8}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md px-4 py-3 shadow-md"
        >
          <p className="font-semibold">ATTENDANCE</p>
          <hr className="border-white opacity-50 my-2" />
          <p className="flex items-center justify-between gap-2 text-sm">
            This Month <FaArrowsAltH /> <span className="font-bold">15</span>
          </p>
          <p className="flex items-center justify-between gap-2 text-sm">
            This Year <FaArrowsAltH /> <span className="font-bold">98</span>
          </p>
        </Col>
        <Col
          span={8}
          className="bg-gradient-to-r from-red-500 to-red-800 text-white rounded-md px-4 py-3 shadow-md"
        >
          <p className="font-semibold">ABSENTS</p>
          <hr className="border-white opacity-50 my-2" />
          <p className="flex items-center justify-between gap-2 text-sm">
            This Month <FaArrowsAltH /> <span className="font-bold">03</span>
          </p>
          <p className="flex items-center justify-between gap-2 text-sm">
            This Year <FaArrowsAltH /> <span className="font-bold">08</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default StudentsAttendance;
