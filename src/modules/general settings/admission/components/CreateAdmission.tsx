import { Tabs } from "antd";
import type { TabsProps } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import CreateOldStudent from "./CreateOldStudent";
import CreateNewStudent from "./CreateNewStudent";

const CreateAdmission = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Old Student",
      children: <CreateOldStudent />,
    },
    {
      key: "2",
      label: "New Student",
      children: <CreateNewStudent />,
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

export default CreateAdmission;
