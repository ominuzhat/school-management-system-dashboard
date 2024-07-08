import { Card, Col, Row } from "antd";
import CreateBasicNonCommision from "../components/CreateNonCommision";

const NonCommision = () => {
  return (
    <div>
      <Card>
        <Row gutter={[16, 16]}>
          <Col lg={18}>
            <CreateBasicNonCommision />

            {/* <BasicAirCommission /> */}
          </Col>
          <Col lg={6}>
            <h1>CreateA</h1>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NonCommision;
