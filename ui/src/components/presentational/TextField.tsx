import { Colors } from "@/theme";
import { TextField } from "@mui/material";
import { FC } from "react";

interface StyledTextFieldProps {
  label: string;
  multiline?: boolean;
  size?: "small" | "medium";
}

const StyledTextField: FC<StyledTextFieldProps> = ({
  label,
  multiline,
  size,
}) => {
  return (
    <TextField
      label={label}
      multiline={multiline}
      maxRows={8}
      fullWidth={true}
      size={size}
      sx={{
        "& label": {
          fontSize: "default",
        },
        "& .MuiOutlinedInput-root": {
          fontSize: "default",
          "& fieldset": {
            padding: "8px",
            border: `2px solid ${Colors.grays[200]}`,
            borderRadius: "4px",
            boxShadow: "none",
          },
          "&:hover:not(&.Mui-focused) fieldset": {
            borderColor: Colors.grays[200],
          },
          // "&.Mui-focused fieldset": {
          //   borderColor: "#ededed",
          // },
        },
      }}
    />
  );
};

export { StyledTextField as TextField };
