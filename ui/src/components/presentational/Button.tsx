import { fontWeights } from "@/theme";
import { Button } from "@mui/material";
import { FC } from "react";

interface StyledButtonProps {
  label: string;
  type?: "button" | "reset" | "submit";
}

const StyledButton: FC<StyledButtonProps> = ({ label, type }) => {
  return (
    <Button
      disableElevation
      variant="contained"
      sx={{
        fontSize: "default",
        borderRadius: "3px",
        fontWeight: fontWeights.SemiBold,
        lineHeight: "1.5",
        padding: "8px 16px",
        textTransform: "capitalize",
      }}
      type={type}
    >
      {label}
    </Button>
  );
};

export { StyledButton as Button };
