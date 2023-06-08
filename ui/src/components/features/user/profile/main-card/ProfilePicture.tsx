import { ProfilePictureIcon } from "@/components/icons";
import { Avatar } from "@/components/presentational";
import { useTheme } from "@mui/material";
import { FC } from "react";

interface ProfilePictureProps {
  fullname: string;
  picture?: string;
}

const ProfilePicture: FC<ProfilePictureProps> = ({ fullname, picture }) => {
  const theme = useTheme();

  return (
    <>
      {picture && (
        <Avatar
          alt={fullname}
          src={"/files/profile/picture/" + picture}
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
        <ProfilePictureIcon
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

export { ProfilePicture };
