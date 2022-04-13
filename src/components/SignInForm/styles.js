import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  getOtp: {
    width: "80%",
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  otpModal: {
    padding: "5em",
    [theme.breakpoints.down("sm")]: {
      padding: "3em",
    },
  },
  textInput: {
    margin: "0.75em 0",
    borderRadius: "2em",
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
    padding: "2em 8em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      width: "100%",
    },
  },
  formContainer: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  forgotPassword: {
    padding: "0.5em 0 1.5em 0",
    color: "#333333",
  },
  signinButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    padding: "0.75em 1em",
    textTransform: "Capitalize",
    color: "#000000 !important",
  },
  googleButton: {
    textTransform: "Capitalize",
    borderRadius: "2em",
    fontWeight: "bold",
    padding: "0.75em 1em",
    margin: "0.5em 0",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  },
  facebookButton: {
    color: "#fff",
    textTransform: "Capitalize",
    background: "#008EFF",
    borderRadius: "2em",
    fontWeight: "bold",
    padding: "0.75em 1em",
    margin: "0.5em 0",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  },
  orText: {
    padding: "1em 0",
    color: "#333333",
  },
  signupMessage: {
    padding: "1em 0",
  },
  signupText: {
    color: "#008EFF",
    cursor: "pointer",
    textDecoration: "underline",
    display: "inline",
  },
}));
