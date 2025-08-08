// src/features/message/components/MessageInput.tsx
import { Button, Input, Popover, Upload, UploadProps } from "antd";
import { PaperClipOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";
import { MessageInputProps } from "../types/messageType";
import { useState } from "react";
import { beforeUpload } from "../utils/fileUploadUtils";

export const MessageInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  onEmojiClick,
  handleFileUpload,
}: MessageInputProps) => {
  const [uploading, setUploading] = useState(false);
  
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      beforeUpload(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      if (info.fileList.length > 0) {
        const file = info.fileList[0].originFileObj;
        if (file) {
          setUploading(true);
          handleFileUpload(file)
            .finally(() => setUploading(false));
        }
      }
    },
    showUploadList: false,
    multiple: false,
  };

  return (
    <div className="flex items-center space-x-2 max-w-screen-lg mx-auto">
      <Popover
        content={
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
          </div>
        }
        trigger="click"
        placement="topLeft"
      >
        <Button
          type="text"
          shape="circle"
          icon={<SmileOutlined className="text-gray-600" />}
          className="hover:bg-gray-300"
        />
      </Popover>
      
      <Upload {...uploadProps}>
        <Button
          type="text"
          shape="circle"
          icon={<PaperClipOutlined className="text-gray-600" />}
          className="hover:bg-gray-300"
          loading={uploading}
        />
      </Upload>
      
      <Input.TextArea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onPressEnter={handleSendMessage}
        placeholder="Type a message"
        autoSize={{ minRows: 1, maxRows: 4 }}
        className="flex-1 border-0 bg-white rounded-lg px-4 py-2 shadow-sm"
      />
      <Button
        type="text"
        shape="circle"
        icon={<SendOutlined className="text-white" />}
        onClick={handleSendMessage}
        disabled={!inputMessage.trim()}
        className={`flex items-center justify-center ${
          inputMessage.trim() ? "bg-[#008069]" : "bg-gray-400"
        }`}
        size="large"
      />
    </div>
  );
};