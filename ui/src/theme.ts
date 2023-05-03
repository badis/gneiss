import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const fontWeights = {
  Light: 300,
  Normal: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
};

const grays = {
  200: "#ededed",
};

export const Colors = {
  grays,
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#00aae6",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e97040",
      contrastText: "#fff",
    },
    error: {
      main: "#fc4a64",
      contrastText: "#fff",
    },
    warning: {
      main: "#ffc107",
      contrastText: "#fff",
    },
    info: {
      main: "#21a1b3",
      contrastText: "#fff",
    },
    success: {
      main: "#97d271",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 14,
  },
});

export default theme;
