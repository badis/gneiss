import { FileUploader } from "@/components/features/common";
import { DeleteIcon, ProfilePictureIcon } from "@/components/icons";
import { Box, IconButton, Img } from "@/components/presentational";
import { useTheme } from "@mui/material";
import { FC } from "react";

interface PictureUploaderProps {
  picture?: File | string;
  onPictureChange: (f: File) => void;
}
const PictureUploader: FC<PictureUploaderProps> = ({
  picture,
  onPictureChange,
}) => {
  const theme = useTheme();

  const handleRemoveProfilePicture = () => {};

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        border: "2px solid #eeeeee",
        borderRadius: "4px",
        height: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {picture && (
        <Img
          width={150}
          height={150}
          src={
            typeof picture == "string" ? picture : URL.createObjectURL(picture)
          }
          alt="Picture of Badis Merabet"
          style={{
            maxHeight: "150px",
          }}
        />
      )}
      {!picture && (
        <ProfilePictureIcon
          sx={{ color: theme.palette.grey[200], fontSize: "72px" }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          borderRadius: "4px",
          padding: "2px",
          bgcolor: theme.palette.danger.contrastText,
        }}
      >
        <FileUploader accept="*/*" onChange={onPictureChange} />
        <IconButton
          sx={{
            color: theme.palette.danger.main,
          }}
          onClick={handleRemoveProfilePicture}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export { PictureUploader };
