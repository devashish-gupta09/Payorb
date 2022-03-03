import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    position: "relative",
    overflowX: "hidden",
  },
  textContainer: {
    padding: "15em 4em 4em 4em",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: 0,
      paddingLeft: "1em",
    },
  },
  titleSection: {
    color: "white",
    fontWeight: "bolder",
    paddingBottom: "0.75em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6em",
      textAlign: "center",
    },
  },
  titleSection1: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4em",
    },
  },
  aquaText: {
    position: "relative",
    display: "inline-block",
    color: "#00D4FF",
    fontSize: "1em",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      width: "100%",
    },
  },
  descriptionText: {
    color: "black",
    width: "100%",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontWeight: "500",
      padding: "0.6em 0.5em",
      textAlign: "center",
    },
  },
  imgContainer: {
    display: "inline",
    position: "absolute",
    width: "43.875em",
    height: "29.25em",
    right: "2.5em",
    bottom: "0",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      display: "contents",
      width: "100%",
      float: "left",
      padding: "0em 1em",
    },
  },
  image: {
    width: "90%",
    bottom: "0",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "4rem",
      padding: "1em 1em",
    },
  },
  buttonContain: {
    position: "relative",
    width: "100%",
    height: "3em",
    top: "3em",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
      fontWeight: "600",
      padding: "0.6em 0",
    },
  },
  buttonSpacing: {
    padding: "0 1.5em",
  },
  capsuleButton: {
    background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%)",
    borderRadius: "2em",
    fontWeight: "bold",
    marginTop: "1.6em",
    padding: "0.5em 1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65em",
      fontWeight: "600",
    },
  },
}));
