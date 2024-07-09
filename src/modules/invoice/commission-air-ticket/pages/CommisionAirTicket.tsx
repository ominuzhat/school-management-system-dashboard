import { Card, Col, Row } from "antd";

import CreateCommisionAirTicket from "../components/CreateCommisionAitTicket";
import NonCommissionRightSide from "../../non-commission/components/NonCommissionRightSide";

const CommisionAirTicket = () => {
  return (
    <div>
      <Card>
        <Row gutter={[16, 16]}>
          <Col lg={17}>
            <CreateCommisionAirTicket />

            {/* <BasicAirCommission /> */}
          </Col>
          <Col lg={7}>
            <NonCommissionRightSide />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CommisionAirTicket;
