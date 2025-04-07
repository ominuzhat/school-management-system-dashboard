import { Image } from "antd";

import { mainLogo } from "../../../utilities/images";
import React from "react";
import { useGetDashboardDataQuery } from "../../../modules/Dashboard/api/dashoboardEndPoints";

const SidebarTop: React.FC = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});

  // const [time, setTime] = useState(moment().format("LTS"));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(moment().format("LTS"));
  //   }, 1000);

  //   return () => clearInterval(interval); // cleanup interval on component unmount
  // }, []);

  return (
    <React.Fragment>
      <div className="sidebar-top-style flex items-center justify-center overflow-hidden">
        {/* <h1 style={{ fontSize: "24px", fontFamily: "Arial" }}>{time .}</h1> */}

        <Image
          src={dashboardData?.data?.institution?.logo || mainLogo}
          preview={false}
          width={40}
          height={40}
          className="mx-auto object-fit-contain"
        />
      </div>
      <hr />
    </React.Fragment>
  );
};

export default SidebarTop;
