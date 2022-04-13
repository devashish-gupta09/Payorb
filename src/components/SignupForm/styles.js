import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  otpModal: {
    width: "20vw",
    height: "30vh",
    [theme.breakpoints.down("sm")]: {
      width: "75vw",
      height: "70vh",
    },
  },
  getOtp: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  textInput: {
    margin: "0.75em 0",
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0.75em",
      width: "100%",
    },
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
      paddingBottom: "0.5em",
    },
  },
  container: {
    padding: "4em 8em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      paddingTop: "20em",
      width: "100%",
    },
  },
  formContainer: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  signupButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    color: "#000000 !important",
    padding: "0.75em 1em",
    textTransform: "Capitalize",
    marginTop: "2em",
  },
  googleButton: {
    textTransform: "Capitalize",
    borderRadius: "2em",
    color: "#000000 !important",
    fontWeight: "bold",
    padding: "0.75em 1em",
    margin: "0.5em 0",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  },
  facebookButton: {
    color: "#fff !important",
    textTransform: "Capitalize",
    background: "#008EFF",
    borderRadius: "2em",
    fontWeight: "bold",
    padding: "0.75em 1em",
    margin: "0.5em 0",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  },
  orText: {
    padding: "2em 0",
    color: "#333333",
  },
  signupMessage: {
    padding: "1em 0",
  },
  signupText: {
    color: "#008EFF",
    textDecoration: "underline",
    cursor: "pointer",
    display: "inline",
  },
}));
