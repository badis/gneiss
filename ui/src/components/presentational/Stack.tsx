import { Stack, StackProps } from "@mui/material";
import { FC } from "react";

const StyledStack: FC<StackProps> = (props) => {
  return <Stack {...props} />;
};

export { StyledStack as Stack };
