import { Tabs } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import FailCriteria from "../components/FailCriteria";
import GradeCriteria from "../components/GradeCriteria";

const GradeMarkPage = () => {
  return (
    <div>
      <div className="my-6">
        <BreadCrumb />
      </div>

      <div>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Grade",
              key: "1",
              children: <GradeCriteria />,
            },

            {
              label: "Fail",
              key: "2",
              children: <FailCriteria />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default GradeMarkPage;
