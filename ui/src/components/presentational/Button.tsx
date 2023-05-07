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
        fontWeight: fontWeights.SemiBold,
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

const StyledIconButton: FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <IconButton
      sx={{
        padding: "5px",
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};

export { StyledIconButton as IconButton };
