import { Popper, PopperProps } from "@mui/material";
import { FC } from "react";

const StyledPopper: FC<PopperProps> = ({ children, ...props }) => {
  return (
    <Popper
      {...props}
      sx={{
        zIndex: 2,
        "& .MuiPickersPopper-paper": {
          boxShadow: "0 0 3px #dadada",
        },
      }}
    >
      {children}
    </Popper>
  );
};

export { StyledPopper as Popper };
