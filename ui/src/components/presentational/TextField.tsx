import { Colors } from "@/theme";
import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

const StyledTextField: FC<TextFieldProps> = ({ sx, SelectProps, ...props }) => {
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
            border: `1px solid ${Colors.grays[200]}`,
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
      SelectProps={{
        MenuProps: {
          sx: {
            "& .MuiPaper-root": {
              boxShadow: "0 0 3px #dadada",
            },
          },
        },
        ...SelectProps,
      }}
      {...props}
    />
  );
};

export { StyledTextField as TextField };
