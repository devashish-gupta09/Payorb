import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "99vw",
    height: "50vh",
    overflow: "hidden",
    margin: "0 auto",
    padding: "5em 0",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "10em 1.5em 5em 1.5em",
      width: "100% !important",
      height: "fit-content",
      background: "#F0FFFE",
      alignItems: "center",
    },
  },
  textContainer: {
    display: "inline",
    left: "2em",
    top: "8em",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: "0",
    },
  },
  titleSection: {
    display: "inline-block",
    color: "black",
    fontWeight: "bolder",
    fontSize: "2.7em",
    paddingBottom: "0.75em",
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4em",
    },
  },
  aquaText: {
    fontSize: "1em",
    color: "#00D4FF",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.25em",
      fontSize: "1.25em",
    },
  },
  descriptionText: {
    color: "black",
    width: "100%",
    fontSize: "1em",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
      fontWeight: "500",
      padding: "0.6em 0.5em",
    },
  },
}));
