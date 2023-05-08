import { Alert, AlertColor, AlertProps } from "@mui/material";
import { FC } from "react";

const StyledAlert: FC<AlertProps> = ({ children, ...props }) => {
  return <Alert {...props}>{children}</Alert>;
};

export { type AlertColor };
export { StyledAlert as Alert };
