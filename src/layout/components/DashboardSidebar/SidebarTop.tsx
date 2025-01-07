import { Image } from "antd";

import { logo } from "../../../utilities/images";
import React from "react";

const SidebarTop: React.FC = () => {
  // const [time, setTime] = useState(moment().format("LTS"));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(moment().format("LTS"));
  //   }, 1000);

  //   return () => clearInterval(interval); // cleanup interval on component unmount
  // }, []);

  return (
    <React.Fragment>
      <div className="sidebar-top-style flex items-center justify-center ">
        {/* <h1 style={{ fontSize: "24px", fontFamily: "Arial" }}>{time}</h1> */}

        <Image
          src={logo}
          preview={false}
          style={{
            width: "70%",
            height: "100%",
            objectFit: "contain",
          }}
          className=" mx-auto"
        />
      </div>
      <hr />
    </React.Fragment>
  );
};

export default SidebarTop;
