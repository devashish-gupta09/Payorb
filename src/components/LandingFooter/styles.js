import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: 'url(/assets/footer-bg.png)',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "3em 10em",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      //height: "fit-content",
      padding: "2em 1em",
      flexDirection: "column",
    },
  },
  companySectionTitle: {
    letterSpacing: "1px",
    paddingTop: "0.1em",
    fontWeight: "bold",
    fontSize: "1.2em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.5em",
      paddingBottom: "0.75em",
      fontSize: "0.75em"
    },
  },
  hover: {
    '&:hover': {
      color: "#00D4FF",
    },
  },
  companyTabs: {
    "& > p": {
      padding: "0.125em",
      paddingTop: "0.1em",
      fontWeight: "450",
      fontSize: "0.9em",
      letterSpacing: "0.075em",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.75em",
        fontWeight: "100"
      }
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
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "3em",
    fontWeight: "500",
    fontSize: "0.8em",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
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
  getInTouchMobile: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "10em",
    },
  },
  scroll: {
    float: "right",
  },
  mobile: {
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    },
  },
  bottomLabelMobile: {
    display: 'none',
    textAlign: "center",
    marginTop: "2em",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    },
  },
  readMore: {
    color: "#71c3de",
    textAlign: "justify",
  },
  logoContainer: {
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "1em",
      display: "none",
    },
  },
  scrollIcon: {
    width: "2.5em",
    height: "2.5em",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > svg": {
      fontSize: "2em"
    },
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      right: 10
    }
  },
}));
