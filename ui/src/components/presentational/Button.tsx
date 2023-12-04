import { fontWeights } from "@/theme";
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { FC } from "react";

const StyledButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      disableElevation
      sx={{
        fontSize: "default",
        borderRadius: "3px",
        fontWeight: fontWeights.Normal,
        lineHeight: "1.5",
        padding: "8px 16px",
        textTransform: "capitalize",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export { StyledButton as Button };

const StyledIconButton: FC<IconButtonProps> = ({ children, sx, ...props }) => {
  return (
    <IconButton
      sx={{
        padding: "5px",
        ...sx,
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};

export { StyledIconButton as IconButton };
