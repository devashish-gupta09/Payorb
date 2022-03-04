import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "calc(100vh - 88px)",
    overflow: "hidden",
    margin: "0 auto",
    justifyContent:"center",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },
  textContainer: {
    display: "inline",
    position: "relative",
    left: "2em",
    top: "8em",
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: "0%",
      width: "100%",
      padding: "1em 1em",
      alignItems: "center",
    },
  },
  titleSection: {
    display: "inline-block",
    color: "black",
    fontWeight: "bolder",
    fontSize: "2.7em",
    paddingBottom: "0.75em",
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
    position: "relative",
    display: "inline-block",
    fontSize: "1em",
    color: "#00D4FF",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      width: "100%",
    },
  },
  descriptionText: {
    color: "black",
    width: "100%",
    fontSize: "1em",
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
    width: "50%",
    position: "absolute",    
    right: "0" ,
    top: "12em",
    left: "57vw",
    minHeight:"75em",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      display: "contents",
      width: "100%",
      padding: "0em 1em",
      justifyContent: "center",
      marginLeft:"auto",
      marginRight:"auto",
    },
  },
  image: {
    width: "90%",
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
      justifyContent: "center",
    },
  },
  buttonSpacing: {
    padding: "0 1.5em",
  },
  capsuleButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    fontWeight: "600",
    fontSize: "0.8em",
    marginTop: "1.6em",
    padding: "0.5em 1em",

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
  scroll: {
    marginTop: "13em",
    cursor: "pointer",
    paddingLeft: "0",
  },
  scrollIcon: {
    display: "inline-block",
    position: "relative",
    top: "0.3em",
  },
}));