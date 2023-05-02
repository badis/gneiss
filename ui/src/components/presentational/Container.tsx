import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface StyledContainerProps {
  children: ReactNode;
}

const StyledContainer: FC<StyledContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export { StyledContainer as Container };
