import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
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
  ExtraBold: 800,
};

const grays = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
};

export const Colors = {
  grays,
};

declare module "@mui/material/styles" {
  interface Palette {
    default: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    default?: PaletteOptions["primary"];
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    default: true;
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    default: {
      main: "#7a7a7a",
      contrastText: "#f3f3f3",
    },
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

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h2",
          h4: "h4",
          h5: "h4",
          h6: "h4",
          subtitle1: "h1",
          subtitle2: "h2",
          body1: "p",
          body2: "span",
        },
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    fontSize: 14,
    h1: {
      fontSize: "22px",
      fontWeight: fontWeights.ExtraBold,
    },
    h2: {
      fontSize: "20px",
      fontWeight: fontWeights.Bold,
    },
    h4: {
      fontSize: "18px",
      fontWeight: fontWeights.SemiBold,
    },
    subtitle1: {
      fontSize: "22px",
      fontWeight: fontWeights.SemiBold,
    },
    subtitle2: {
      fontSize: "20px",
      fontWeight: fontWeights.Medium,
    },
    body1: {
      fontSize: "14px",
      fontWeight: fontWeights.Normal,
    },
    body2: {
      fontSize: "12px",
      fontWeight: fontWeights.Light,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
