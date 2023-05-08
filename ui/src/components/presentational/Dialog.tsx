import {
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogContentText,
  DialogContentTextProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
} from "@mui/material";
import { FC } from "react";

const StyledDialog: FC<DialogProps> = ({ children, ...props }) => {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "500px",
          boxShadow: "none",
        },
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export { StyledDialog as Dialog };

const StyledDialogTitle: FC<DialogTitleProps> = ({ children, ...props }) => {
  return (
    <DialogTitle
      component="h4"
      sx={{ fontSize: "20px", fontWeight: "normal" }}
      {...props}
    >
      {children}
    </DialogTitle>
  );
};

export { StyledDialogTitle as DialogTitle };

const StyledDialogContent: FC<DialogContentProps> = ({
  children,
  ...props
}) => {
  return <DialogContent {...props}>{children}</DialogContent>;
};

export { StyledDialogContent as DialogContent };

const StyledDialogContentText: FC<DialogContentTextProps> = ({
  children,
  ...props
}) => {
  return (
    <DialogContentText sx={{ fontSize: "default" }} {...props}>
      {children}
    </DialogContentText>
  );
};

export { StyledDialogContentText as DialogContentText };

const StyledDialogActions: FC<DialogActionsProps> = ({
  children,
  ...props
}) => {
  return (
    <DialogActions sx={{ padding: 0, marginTop: "20px" }} {...props}>
      {children}
    </DialogActions>
  );
};

export { StyledDialogActions as DialogActions };
