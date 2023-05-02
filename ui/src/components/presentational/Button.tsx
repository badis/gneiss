import { ElevatorOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FC } from "react";

interface StyledButtonProps {
  label: string;
}

const StyledButton: FC<StyledButtonProps> = ({ label }) => {
  return (
    <Button disableElevation variant="contained">
      {label}
    </Button>
  );
};

export { StyledButton as Button };
