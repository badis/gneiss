import { Card, CardActions, CardContent } from "@mui/material";
import { FC, ReactNode } from "react";

interface StyledCardProps {
  children: ReactNode;
}

const StyledCard: FC<StyledCardProps> = ({ children }) => {
  return (
    <Card
      elevation={1}
      sx={{
        boxShadow: "0 0 3px #dadada",
        marginBottom: "15px",
        padding: "10px",
      }}
    >
      {children}
    </Card>
  );
};

interface StyledCardContentProps {
  children: ReactNode;
}

const StyledCardContent: FC<StyledCardContentProps> = ({ children }) => {
  return <CardContent sx={{ padding: 0 }}>{children}</CardContent>;
};

interface StyledCardActionsProps {
  children: ReactNode;
}

const StyledCardActions: FC<StyledCardActionsProps> = ({ children }) => {
  return <CardActions sx={{ padding: 0 }}>{children}</CardActions>;
};

export {
  StyledCard as Card,
  StyledCardContent as CardContent,
  StyledCardActions as CardActions,
};
