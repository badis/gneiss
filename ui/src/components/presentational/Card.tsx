import {
  Card,
  CardActions,
  CardActionsProps,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardProps,
} from "@mui/material";
import { FC } from "react";

const StyledCard: FC<CardProps> = ({ children }) => {
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

const StyledCardHeader: FC<CardHeaderProps> = (props) => {
  return <CardHeader sx={{ padding: 0 }} {...props} />;
};

const StyledCardContent: FC<CardContentProps> = ({ children }) => {
  return <CardContent sx={{ padding: 0 }}>{children}</CardContent>;
};

const StyledCardActions: FC<CardActionsProps> = ({ children }) => {
  return <CardActions sx={{ padding: 0 }}>{children}</CardActions>;
};

export {
  StyledCard as Card,
  StyledCardHeader as CardHeader,
  StyledCardContent as CardContent,
  StyledCardActions as CardActions,
};
