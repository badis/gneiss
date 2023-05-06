import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const StyledBox: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box sx={{ fontSize: "default" }} {...props}>
      {children}
    </Box>
  );
};

export { StyledBox as Box };
