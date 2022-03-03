import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: "#2C2C2C",
    padding: "3em 10em 2em 12em",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  companySectionTitle: {
    letterSpacing: "1px",
    paddingTop: "0.1em",
    width: "100%",
    fontWeight: "bold",
    fontSize: "1.2em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.5em",
    },
  },
  companyTabs: {
    "& > p": {
      padding: "0.125em",
      paddingTop: "0.1em",
      fontWeight: "450",
      fontSize: "0.9em",
      letterSpacing: "0.075em",
    },
  },
  officeAddress: { padding: "1em 0" },
  officeAddressContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  companyContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingBottom: "1em",
    },
  },
  bottomLabel: {
    justifyContent:"center",
    textAlign:"center",
    paddingTop: "3em",
    opacity: "0.5",
    fontWeight: "500",
    fontSize: "0.8em",
    letterSpacing: "1px",
  },

  logo: {
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
  },
  socialLinksContainer: {
    "& > a": {
      padding: "0.5em",
    },
  },
  policyLink: {
    color: "#71c3de",
  },
  disclaimer: {
    padding: "0.8em 0",
    fontSize: "0.65em",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em 0",
    },
  },
  readMore: {
    color: "#71c3de",
    textAlign: "justify",
  },
  logoContainer: {
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "1em",
    },
  },
  desktop:{
    [theme.breakpoints.down("sm")]: {
      display:"none",
    },
  },
}));
