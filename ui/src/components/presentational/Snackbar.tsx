import { Alert, AlertColor, Snackbar, SnackbarProps } from "@mui/material";
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
  onClose: () => void;
}
export const EnhancedSnackbar: FC<EnhancedSnackbarProps> = ({
  open,
  message,
  severity,
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
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
