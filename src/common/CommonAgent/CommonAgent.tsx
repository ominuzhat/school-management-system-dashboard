import { Button, Select } from "antd";
import {
  HarmonyOSOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { showModal } from "../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import CreateAgentModalForm from "./CreateAgentModalForm";

const CommonAgent = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Select
        showSearch
        placeholder="Search Agent"
        dropdownRender={(menu) => (
          <>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Create Agent",
                    content: <CreateAgentModalForm />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add item
            </Button>
            {menu}
          </>
        )}
        filterOption={(input, option: any) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "1",
            label: (
              <p>
                <ManOutlined /> Male{" "}
              </p>
            ),
          },
          {
            value: "2",
            label: (
              <p>
                <WomanOutlined /> Female
              </p>
            ),
          },
          {
            value: "3",
            label: (
              <p>
                <HarmonyOSOutlined /> Others{" "}
              </p>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CommonAgent;
