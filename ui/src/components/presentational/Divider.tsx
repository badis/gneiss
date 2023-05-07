import { Divider, DividerProps } from "@mui/material";
import { FC } from "react";

const StyledDivider: FC<DividerProps> = () => {
  return (
    <Divider
      sx={{
        border: 0,
        borderTop: "1px solid #eeeeee",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    />
  );
};

export { StyledDivider as Divider };
