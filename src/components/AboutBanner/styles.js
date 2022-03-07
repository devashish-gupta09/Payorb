import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "calc(100vh - 150px)",
    overflow: "hidden",
    margin: "0 auto",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },
  textContainer: {
    display: "inline",
    position: "relative",
    left: "2em",
    top: "8em",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: "0%",
      padding: "1em 1em",
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
        fontSize: "1.25em",
    },
  },
  aquaText: {
    fontSize: "1em",
    color: "#00D4FF",
    textAlign: "center",
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