import { Card, CardActions, CardContent } from "@mui/material";
import { FC, ReactNode } from "react";

interface StyledCardProps {
  children: ReactNode;
}

const StyledCard: FC<StyledCardProps> = ({ children }) => {
  return (
    <Card elevation={1} sx={{ boxShadow: "0 0 3px #dadada" }}>
      {children}
    </Card>
  );
};

export { StyledCard as Card, CardContent, CardActions };
