import {
  Badge,
  Button,
  Flex,
  Image,
  Layout,
  List,
  Popover,
  Space,
  Tooltip,
  Typography,
} from "antd";
import React from "react";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../../app/features/authSlice";
import { TOKEN_NAME } from "../../../utilities/baseQuery";
import { useNavigate } from "react-router-dom";
import { greeting } from "../../../utilities/helper";
import { RootState } from "../../../app/store";
import { toggleThemes } from "../../../app/features/themeSlice";
import { flight } from "../../../utilities/images";
import { useGetProfileQuery } from "../../../modules/Profile/api/profileEndpoint";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<Props> = ({ setOpen }) => {
  const { themes, darkColor } = useSelector((state: RootState) => state.themes);
  const { data } = useGetProfileQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(loggedOut());
    localStorage.removeItem(TOKEN_NAME);
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Layout.Header
        id="dashboard-header"
        style={{
          background: themes === "light" ? "white" : darkColor,
        }}
      >
        <Flex gap={8} align="center" justify="center">
          <Button
            onClick={() => setOpen(true)}
            type="primary"
            ghost
            size="large"
            icon={<Iconify name="pepicons-pop:menu" />}
            id="dashboard-header-icon"
          />
          <div>
            <Typography.Text
              strong
              style={{ display: "block", fontSize: "1.2rem" }}
            >
              Hello, {data?.data?.name || "Nuzhat"}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{ display: "block", lineHeight: 0.6, fontSize: "11px" }}
            >
              {greeting()}
            </Typography.Text>
          </div>
        </Flex>
        <Flex align="center" justify="center" gap={15}>
          <Badge count={17}>
            <Popover
              content={
                <List
                  itemLayout="vertical"
                  renderItem={() => <List.Item></List.Item>}
                />
              }
              trigger="click"
              placement="bottomRight"
            >
              <Button
                type="default"
                shape="circle"
                icon={<Iconify name="ant-design:bell-outlined" />}
              />
            </Popover>
          </Badge>

          <Tooltip
            title={themes === "light" ? "Dark Mode" : "Light Mode"}
            placement="bottomRight"
          >
            <Button
              type="default"
              shape="circle"
              onClick={() => dispatch(toggleThemes())}
              icon={
                <Iconify
                  name={
                    themes === "light"
                      ? "material-symbols:light-mode"
                      : "material-symbols-light:dark-mode-outline"
                  }
                />
              }
            />
          </Tooltip>

          <Popover
            content={
              <Space
                direction="vertical"
                style={{
                  height: 180,
                  width: 230,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Image
                  src={flight}
                  alt="Profile picture"
                  preview={false}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "100%",
                    pointerEvents: "none",
                  }}
                />
                <Typography.Text strong>Omi Hasan</Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: "11px" }}>
                  omihasan.nuzhat@gmail.com
                </Typography.Text>
                <Space>
                  {/* <Link to="/profile"> */}
                  <Button
                    block
                    type="link"
                    ghost
                    icon={<Iconify name="uil:user" />}
                  >
                    Profile
                  </Button>
                  {/* </Link> */}

                  <Button
                    block
                    type="link"
                    ghost
                    danger
                    icon={<Iconify name="hugeicons:logout-05" />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Space>
              </Space>
            }
            trigger="click"
            placement="bottomRight"
          >
            <Button
              type="default"
              shape="circle"
              icon={<Iconify name="ph:user" />}
            />
          </Popover>
        </Flex>
      </Layout.Header>
    </React.Fragment>
  );
};

export default DashboardHeader;
