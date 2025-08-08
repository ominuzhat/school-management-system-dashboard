import { PaperClipOutlined, FileImageOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";

interface Attachment {
  id: string;
  file: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
  uploaded_at: string;
}

interface AttachmentViewerProps {
  attachment: Attachment;
}

const AttachmentViewer = ({ attachment }: AttachmentViewerProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Safely get file extension
  const getFileExtension = () => {
    try {
      if (!attachment.file) return '';
      const parts = attachment.file.split('.');
      return parts.length > 1 ? parts.pop()?.toLowerCase() : '';
    } catch {
      return '';
    }
  };

  const fileExtension = getFileExtension();
  const fileName = attachment.file_name || attachment.file.split('/').pop() || 'file';
  const fileSizeMB = attachment.file_size ? (attachment.file_size / (1024 * 1024)).toFixed(2) : null;

  const isImage = !imageError && ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension || "");
  const isPDF = fileExtension === "pdf";

  const handleImageError = () => {
    setImageError(true);
  };

  const renderFileIcon = () => {
    if (isPDF) return <FilePdfOutlined className="text-red-500" />;
    if (isImage) return <FileImageOutlined className="text-green-500" />;
    return <PaperClipOutlined className="text-blue-500" />;
  };

  return (
    <div className="mt-2 border border-gray-200 rounded-lg p-2 bg-white">
      {isImage ? (
        <div className="relative">
          <img
            src={attachment.file}
            alt="Attachment"
            className="max-w-full max-h-48 rounded"
            onError={handleImageError}
            onClick={() => window.open(attachment.file, "_blank")}
            style={{ cursor: "pointer" }}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {fileExtension?.toUpperCase()}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="mr-2">{renderFileIcon()}</span>
          <div className="flex-1 min-w-0">
            <Tooltip title={fileName}>
              <a
                href={attachment.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate block"
                download
              >
                {fileName}
              </a>
            </Tooltip>
            <div className="text-xs text-gray-500">
              {fileExtension?.toUpperCase()}
              {fileSizeMB && ` • ${fileSizeMB} MB`}
            </div>
          </div>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-1">
        {new Date(attachment.uploaded_at).toLocaleString([], {
          month: 'short',
          day: 'numeric',
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default AttachmentViewer;