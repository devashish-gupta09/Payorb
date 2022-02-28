import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "95vw",
    height: "100vh",
    overflowX: "hidden",
  },
  textContainer: {
    // position: "absolute",
    // top: "25%",
    // left: "5%",
    // width: "50%",
    position: "absolute",
    width: "38.75em",
    height: "13.8125em",
    left: "3.625em",
    top: "9.5em",

    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: "0%",
      width: "100%",
      padding: "1em 1em",
      alignItems: "center",
    },
  },
  titleSection: {
    color: "black",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6em",
      textAlign: "center",
    },
  },
  titleSection1: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25em",
      width: "100%",
    },
  },
  aquaText: {
    color: "aqua",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      width: "100%",
    },
  },
  descriptionText: {
    color: "black",
    fontWeight: "bold",
    width: "100%",
    textJustify: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "0.9em",
      fontWeight: "500",
      padding: "0.6em 0.5em",
      textAlign: "center",
    },
  },
  imgContainer: {
    // position: "absolute",
    // display: "flex",
    // top: "40%",
    // right: "6%",
    // width: "50%",
    position: "absolute",
    width: "43.875em",
    height: "29.25em",
    right: "2.5em",
    top: "15em",

    [theme.breakpoints.down("sm")]: {
      top: "50%",
      display: "contents",
      width: "100%",
      float: "left",
      padding: "0em 1em",
    },
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "4rem",
      padding: "1em 1em",
    },
  },
  buttonContain: {
    position: "absolute",
    width: "100%",
    height: "3em",
    top: "19em",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  buttonSpacing: {
    padding: "0 1.5em",
  },
  capsuleButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    fontWeight: "bold",
    marginTop: "1.6em",
    padding: "1em 2em",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      fontSize: "0.65em",
      fontWeight: "600",
      marginTop: "0",
      padding: "0.75em 1.5em",
    },
  },
  callMadeIcon: {
    paddingLeft: "0.5em",
    fontSize: "2rem",
  },
}));
