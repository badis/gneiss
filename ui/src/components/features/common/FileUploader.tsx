import { UploadIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";
import { FC, useRef } from "react";

const allowedImageMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const allowedFileMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "audio/mpeg",
  "audio/mp4",
  "video/mp4",
  "video/webm",
  "application/pdf",
];

interface FileUploaderProps {
  image?: boolean;
  onChange: (f: File) => void;
}
const FileUploader: FC<FileUploaderProps> = ({ image, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0)
      onChange(e.target.files[0]);
  };

  const accept =
    image === true
      ? allowedImageMimeTypes.join(",")
      : allowedFileMimeTypes.join(",");

  return (
    <>
      <input
        accept={accept}
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IconButton onClick={handleClick}>
        <UploadIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export { FileUploader };
