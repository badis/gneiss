import {
  Card,
  CardActions,
  CardActionsProps,
  CardContent,
  CardContentProps,
  CardHeader,
  CardHeaderProps,
  CardMedia,
  CardMediaProps,
  CardProps,
} from "@mui/material";
import { FC } from "react";

const StyledCard: FC<CardProps> = ({ children }) => {
  return (
    <Card
      elevation={1}
      sx={{
        border: "1px solid #eeeeee",
        boxShadow: "none",
        marginBottom: "15px",
        padding: "15px",
      }}
    >
      {children}
    </Card>
  );
};

const StyledCardHeader: FC<CardHeaderProps> = (props) => {
  return <CardHeader sx={{ padding: 0 }} {...props} />;
};

const StyledCardContent: FC<CardContentProps> = ({
  children,
  sx,
  ...props
}) => {
  return (
    <CardContent sx={{ padding: 0, ...sx }} {...props}>
      {children}
    </CardContent>
  );
};

const StyledCardMedia: FC<CardMediaProps> = ({ children, ...props }) => {
  return <CardMedia {...props}>{children}</CardMedia>;
};

const StyledCardActions: FC<CardActionsProps> = ({ children }) => {
  return (
    <CardActions sx={{ padding: 0, paddingTop: "10px" }}>
      {children}
    </CardActions>
  );
};

export {
  StyledCard as Card,
  StyledCardHeader as CardHeader,
  StyledCardContent as CardContent,
  StyledCardMedia as CardMedia,
  StyledCardActions as CardActions,
};
