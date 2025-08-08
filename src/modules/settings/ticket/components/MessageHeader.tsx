import { Avatar, Button, Tooltip } from "antd";
import {
  SearchOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  EllipsisOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { MessageHeaderProps } from "../types/messageType";
import { AudioCallModal } from "./AudioCall";
import { useState } from "react";
import { VideoCallModal } from "./VideoCall";

export const MessageHeader = ({
  title,
  username,
  avatar,
  onMenuClick,
}: MessageHeaderProps & { onMenuClick?: () => void }) => {
  const [isCallModalVisible, setIsCallModalVisible] = useState(false);
  const [isVideoCallModalVisible, setIsVideoCallModalVisible] = useState(false);

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-[#008069] text-white px-4 py-3 shadow-sm md:left-60">
      <div className="flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            type="text"
            shape="circle"
            icon={<MenuOutlined className="text-white md:hidden" />}
            className="hover:bg-[#075E54] md:hidden"
            onClick={onMenuClick}
          />
          <div className="flex items-center">
            <Avatar
              src={avatar}
              size="default"
              className="border-2 border-white"
            />
            <div className="ml-3">
              <h3 className="font-semibold text-sm md:text-lg truncate max-w-[120px] md:max-w-[200px]">
                {title}
              </h3>
              <p className="text-xs text-white opacity-80 truncate max-w-[120px] md:max-w-[200px]">
                {username}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex space-x-2 md:space-x-4">
          <Tooltip title="Search">
            <Button
              type="text"
              shape="circle"
              icon={<SearchOutlined className="text-white" />}
              className="hover:bg-[#075E54] hidden sm:inline-block"
            />
          </Tooltip>
          <Tooltip title="Voice Call">
            <Button
              type="text"
              shape="circle"
              icon={<PhoneOutlined className="text-white" />}
              className="hover:bg-[#075E54] hidden md:inline-block"
              onClick={() => setIsCallModalVisible(true)}
            />

            <AudioCallModal
              contactName={username}
              avatar={avatar}
              visible={isCallModalVisible}
              onClose={() => setIsCallModalVisible(false)}
            />
          </Tooltip>
          <Tooltip title="Video Call">
            <Button
              type="text"
              shape="circle"
              icon={<VideoCameraOutlined className="text-white" />}
              className="hover:bg-[#075E54] hidden md:inline-block"
                onClick={() => setIsVideoCallModalVisible(true)}
            />
             <VideoCallModal
              contactName={username}
              avatar={avatar}
              visible={isVideoCallModalVisible}
              onClose={() => setIsVideoCallModalVisible(false)}
            />
          </Tooltip>
          <Tooltip title="Menu">
            <Button
              type="text"
              shape="circle"
              icon={<EllipsisOutlined className="text-white" />}
              className="hover:bg-[#075E54]"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
