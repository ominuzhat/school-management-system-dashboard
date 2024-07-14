import React from "react";
import OverallStatistic from "../components/OverallStatistic";
import RestaurantWiseSalesGraph from "../components/RestaurantWiseSalesGraph";

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <OverallStatistic />
      <br />
      <RestaurantWiseSalesGraph />
    </React.Fragment>
  );
};

export default Dashboard;
