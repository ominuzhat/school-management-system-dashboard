import { Tabs } from "antd";
import type { TabsProps } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";

import UpdateNewAdmissionStudent from "./UpdateNewAdmissionStudent";
import UpdateOldAdmissionStudent from "./UpdateOldAdmissionStudent";

const UpdateAdmission = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Old Student",
      children: <UpdateOldAdmissionStudent />,
    },
    {
      key: "2",
      label: "New Student",
      children: <UpdateNewAdmissionStudent />,
    },
  ];

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Tabs
        defaultActiveKey="1"
        items={items}
        type="card"
        centered
        onChange={onChange}
      />
    </div>
  );
};

export default UpdateAdmission;
