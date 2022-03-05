import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingBottom: "3em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
  capsuleButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    fontWeight: "bold",
    marginTop: "2em",
    padding: "0.5em 1.25em",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      fontSize: "0.65em",
      fontWeight: "600",
      marginTop: "0",
      padding: "0.5em 0.75em",
    },
  },
  callMadeIcon: {
    paddingLeft: "0.25em",
    fontSize: "1.75rem",
  },
  logoContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      alignItems: "center",
    },
  },
}));
