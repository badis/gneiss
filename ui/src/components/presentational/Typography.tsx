import { Typography, TypographyProps } from "@mui/material";
import { ElementType, FC } from "react";

interface OwnProps {
  component: ElementType<any>;
}
const StyledTypography: FC<TypographyProps & OwnProps> = ({
  children,
  component,
  ...props
}) => {
  return (
    <Typography component={component} {...props}>
      {children}
    </Typography>
  );
};

export { StyledTypography as Typography };
