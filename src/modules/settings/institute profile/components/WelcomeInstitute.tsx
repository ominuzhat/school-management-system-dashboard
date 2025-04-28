import { Col, Row, Typography } from "antd";
import { helloImg } from "../../../../utilities/images";

const WelcomeInstitute = ({ name }: { name: string | undefined }) => {
  const { Title, Text } = Typography;

  return (
    <div className="w-full">
      <Row
        gutter={[16, 16]}
        className="rounded-lg px-4 sm:px-6 md:px-10  lg:px-20 py-6 lg:py-0 items-center justify-between bg-gradient-to-r from-[#abd4f8] to-[#c4999925]"
      >
        <Col xs={24} lg={12} className="flex justify-center lg:justify-start">
          <img
            src={helloImg}
            alt="helloImg"
            className="w-full max-w-[18rem] md:max-w-[22rem] lg:max-w-[18rem] xl:max-w-[22rem]"
          />
        </Col>
        <Col xs={24} lg={12} className="text-center lg:text-left">
          <Title
            level={2}
            className="font-sans text-white text-2xl sm:text-3xl md:text-4xl tracking-wide"
            style={{ marginBottom: 5 }}
          >
            Hello, {name}
          </Title>
          <Text
            className="font-sans text-base sm:text-lg tracking-wide opacity-90 block"
            style={{ margin: 0 }}
          >
            Manage your operations with ease!
          </Text>
          <div className="bg-[#abd4f8] mx-auto lg:mx-0 rounded-full w-16 h-1 my-2 sm:my-3"></div>
          <Text
            className="font-sans text-sm sm:text-base tracking-wide opacity-80 block"
            style={{ margin: 0 }}
          >
            Hello, {name}! We’re glad you’re here. Let’s make your workflow
            smoother today.
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeInstitute;
