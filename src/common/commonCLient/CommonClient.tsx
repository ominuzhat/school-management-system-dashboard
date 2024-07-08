import { Button, Select } from "antd";
import {
  HarmonyOSOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { showModal } from "../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import CreateClientModalForm from "./CreateClientModalForm";

const CommonClient = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Select
        showSearch
        placeholder="Search Client"
        dropdownRender={(menu) => (
          <>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Create Client",
                    content: <CreateClientModalForm />,
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

export default CommonClient;
