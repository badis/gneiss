import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarOrigin,
  SnackbarProps,
} from "@mui/material";
import React from "react";
import { FC } from "react";

const StyledSnackbar: FC<SnackbarProps> = ({ children, ...props }) => {
  return <Snackbar {...props}>{children}</Snackbar>;
};

export { StyledSnackbar as Snackbar };

interface EnhancedSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration?: number;
  anchorOrigin?: SnackbarOrigin;
  onClose: () => void;
}
export const EnhancedSnackbar: FC<EnhancedSnackbarProps> = ({
  duration = 3000,
  open,
  message,
  severity,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  onClose,
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };
  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <div>
        {severity ? (
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        ) : null}
      </div>
    </StyledSnackbar>
  );
};
