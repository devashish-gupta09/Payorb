import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    style: "normal",
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

theme.typography.h6 = {
  fontWeight: 400,
  fontSize: "1.4em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1em",
  },
};

theme.typography.h5 = {
  fontSize: "1.8em",
  fontWeight: 400,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2em",
  },
};

theme.typography.h4 = {
  fontSize: "2.4em",
  fontWeight: 400,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3em",
  },
};

theme.typography.h3 = {
  fontSize: "3em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4em",
  },
};

theme.typography.h2 = {
  fontSize: "3.4em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4em",
  },
};

export default theme;
