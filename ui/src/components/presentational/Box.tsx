import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const StyledBox: FC<BoxProps> = ({ children, sx, ...props }) => {
  return (
    <Box sx={{ fontSize: "default", ...sx }} {...props}>
      {children}
    </Box>
  );
};

export { StyledBox as Box };
