import { FileUploader } from "@/components/core/common";
import { DeleteIcon, ProfilePictureIcon } from "@/components/icons";
import { Box, IconButton, Img } from "@/components/presentational";
import { useTheme } from "@mui/material";
import { FC } from "react";

interface BannerUploaderProps {
  banner?: File | string;
  onBannerChange: (f: File | undefined) => void;
}
const BannerUploader: FC<BannerUploaderProps> = ({
  banner,
  onBannerChange,
}) => {
  const theme = useTheme();

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
        overflow: "hidden",
      }}
    >
      {banner && (
        <Img
          width={1200}
          height={150}
          src={typeof banner == "string" ? banner : URL.createObjectURL(banner)}
          alt="Profile banner"
          style={{
            objectFit: "unset",
          }}
        />
      )}
      {!banner && (
        <Img
          width={1200}
          height={150}
          src="../banner.svg"
          alt="Profile banner"
          style={{
            objectFit: "unset",
          }}
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
        <FileUploader image={true} onChange={onBannerChange} />
        <IconButton
          sx={{
            color: theme.palette.danger.main,
          }}
          onClick={() => onBannerChange(undefined)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export { BannerUploader };
