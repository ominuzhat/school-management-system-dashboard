import React from "react";
import { useParams } from "react-router-dom";
import SingleDataView from "../../../common/SingleDataView/SingleDataView";

const SingleViewRestaurant: React.FC = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <React.Fragment>
      <SingleDataView>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          accusamus corporis distinctio magnam assumenda aut, aperiam eaque
          sapiente quibusdam voluptatum.
        </p>
      </SingleDataView>
    </React.Fragment>
  );
};

export default SingleViewRestaurant;
