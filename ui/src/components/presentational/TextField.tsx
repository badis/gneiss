import { TextField } from "@mui/material";
import { FC } from "react";

interface StyledTextFieldProps {
  label: string;
  multiline?: boolean;
}

const StyledTextField: FC<StyledTextFieldProps> = ({ label, multiline }) => {
  return <TextField label={label} multiline maxRows={8} />;
};

export { StyledTextField as TextField };
