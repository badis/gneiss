import { Typography, TypographyProps } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { ElementType, FC } from "react";

interface OwnProps {
  component?: ElementType<any>;
}
const StyledTypography: FC<TypographyProps & OwnProps> = ({
  children,
  component,
  ...props
}) => {
  return (
    <Typography {...{ component }} {...props}>
      {children}
    </Typography>
  );
};

export { StyledTypography as Typography };
