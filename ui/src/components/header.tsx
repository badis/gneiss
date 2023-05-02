import Link from "next/link";
import { Box } from "@mui/material";

export const Header = () => {
  return (
    <Box>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </Box>
  );
};
