import { DeleteIcon, UploadIcon } from "@/components/icons";
import { Box, IconButton, Img } from "@/components/presentational";
import { useTheme } from "@mui/material";
import { FC } from "react";

interface BannerUploaderProps {}
const BannerUploader: FC<BannerUploaderProps> = (props) => {
  const theme = useTheme();

  const handleUploadBanner = () => {};
  const handleRemoveBanner = () => {};

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
      <Img
        width={1200}
        height={150}
        src="/banner.jpg"
        alt="Profile banner of Badis Merabet"
        style={{
          maxHeight: "150px",
        }}
      />

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
        <IconButton sx={{}} onClick={handleUploadBanner}>
          <UploadIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{
            color: theme.palette.danger.main,
          }}
          onClick={handleRemoveBanner}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export { BannerUploader };
