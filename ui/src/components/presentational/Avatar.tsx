import { Avatar, AvatarProps } from "@mui/material";
import { FC } from "react";

const StyledAvatar: FC<AvatarProps> = ({ children, ...props }) => {
  return <Avatar {...props}>{children}</Avatar>;
};

export { StyledAvatar as Avatar };
