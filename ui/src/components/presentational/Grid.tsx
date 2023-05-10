import { Grid, GridProps } from "@mui/material";
import { FC } from "react";

const StyledGrid: FC<GridProps> = (props) => {
  return <Grid {...props} />;
};

export { StyledGrid as Grid };
