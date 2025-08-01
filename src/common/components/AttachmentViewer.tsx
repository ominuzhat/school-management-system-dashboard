import { PaperClipOutlined } from "@ant-design/icons";

const AttachmentViewer = ({ attachment }: { attachment: any }) => {
  const fileType = attachment.file.split(".").pop()?.toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileType || "");
  const isPDF = fileType === "pdf";

  console.log(attachment)


  return (
    <div className="mt-2 border border-gray-200 rounded-lg p-2">
      {isImage ? (
        <img
          src={attachment.file}
          alt="Attachment"
          className="max-w-full max-h-48 rounded"
          onClick={() => window.open(attachment.file, "_blank")}
          style={{ cursor: "pointer" }}
        />
      ) : isPDF ? (
        <div className="flex items-center">
          <PaperClipOutlined className="mr-2 text-blue-500" />
          <a
            href={attachment.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View PDF
          </a>
        </div>
      ) : (
        <div className="flex items-center">
          <PaperClipOutlined className="mr-2 text-blue-500" />
          <a
            href={attachment.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Download File
          </a>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-1">
        {new Date(attachment.uploaded_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};
export default AttachmentViewer;
