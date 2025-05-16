import { Tabs } from "antd";
import type { TabsProps } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import CreateOldStudent from "./CreateOldStudent";
import CreateNewStudent from "./new student admission/CreateNewStudent";

const CreateAdmission = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "New Student",
      children: <CreateNewStudent />,
    },
    {
      key: "2",
      label: "Old Student",
      children: <CreateOldStudent />,
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
