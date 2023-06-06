import { UploadIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";
import { FC, useRef } from "react";

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
      ? "image/jpeg,image/jpg,image/png,image/webp"
      : "image/*,audio/*,video/*,.pdf,.doc";

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
