import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    margin: "0 auto",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: "70vh",
      background: "#F0FFFE",
      alignItems: "center",
    },
  },
  textContainer: {
    display: "inline",
    position: "relative",
    left: "2em",
    top: "2em",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
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
    paddingBottom: "0.5em",
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4em",
    },
  },
  aquaText: {
    position: "relative",
    display: "inline-block",
    fontSize: "1em",
    color: "#00D4FF",
    textAlign: "center",
  },
  descriptionText: {
    color: "black",
    width: "100%",
    fontSize: "1em",
    textAlign: "center",
    marginTop: "-0.5em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
      fontWeight: "500",
      padding: "0.6em 0.5em",
    },
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3.5em",
  },
  image: {
    marginTop: "2em",
    maxWidth: "50vw",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  imageMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}));
