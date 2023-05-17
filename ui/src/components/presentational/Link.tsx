import { Link, LinkProps } from "@mui/material";
import { FC } from "react";

const StyledLink: FC<LinkProps> = ({ children, ...props }) => {
  return <Link {...props}>{children}</Link>;
};

export { StyledLink as Link };
