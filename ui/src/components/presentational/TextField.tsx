import { Colors } from "@/theme";
import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

const StyledTextField: FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
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
        ...sx,
      }}
      {...props}
    />
  );
};

export { StyledTextField as TextField };
