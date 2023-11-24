import { SpacePictureIcon } from "@/components/icons";
import { Avatar } from "@/components/presentational";
import { useTheme } from "@mui/material";
import { FC } from "react";

interface SpacePictureProps {
  name: string;
  picture?: string;
}

const SpacePicture: FC<SpacePictureProps> = ({ name, picture }) => {
  const theme = useTheme();

  return (
    <>
      {picture && (
        <Avatar
          alt={name}
          src={"/files/space/picture/" + picture}
          sx={{
            width: 150,
            height: 150,
            top: "-75px",
            left: "15px",
            position: "absolute",
            border: "1px solid #eeeeee",
            borderRadius: "8px",
          }}
          variant="rounded"
        />
      )}
      {!picture && (
        <SpacePictureIcon
          sx={{
            width: 150,
            height: 150,
            top: "-75px",
            left: "15px",
            position: "absolute",
            border: "1px solid #eeeeee",
            borderRadius: "8px",
            color: theme.palette.grey[200],
            bgcolor: "white",
            fontSize: "72px",
          }}
        />
      )}
    </>
  );
};

export { SpacePicture };
