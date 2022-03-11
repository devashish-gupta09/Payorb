import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "fit-content",
    overflow: "hidden",
    background: "url(/assets/homepage-1.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      height: "70vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundImage: "url(/assets/mobile-home-bg.png)",
    },
  },
  textContainer: {
    padding: "15em 4em 4em 4em",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "fit-content",
      padding: "5em 0 0 0",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
  },
  titleSection: {
    display: "inline-block",
    color: "black",
    fontWeight: "bolder",
    paddingBottom: "0.75em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6em",
      textAlign: "center",
      // paddingLeft: "1.2em"
    },
  },
  titleSection1: {
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
    color: "#00D4FF",
    fontSize: "1em",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      width: "100%",
      fontSize: "1.5em",
    },
  },
  descriptionText: {
    color: "black",
    width: "100%",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontWeight: "500",
      // paddingLeft: "1.2em",
      textAlign: "center",
    },
  },
  buttonContain: {
    position: "relative",
    width: "100%",
    height: "3em",
    top: "3em",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      height: "fit-content",
      top: 0,
      marginTop: "2em",
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
      marginTop: "0",
      alignItems: "center",
      fontSize: "0.65em",
      fontWeight: "600",
      padding: "1em 1.75em",
    },
  },
  callMadeIcon: {
    paddingLeft: "0.25em",
    fontSize: "2em",
  },
  scroll: {
    marginTop: "13em",
    cursor: "pointer",
    paddingLeft: "0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  scrollIcon: {
    display: "inline-block",
    position: "relative",
    top: "0.3em",
  },
  imgContainer: {
    width: "50vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "1.75em",
    },
  },
  image: {
    width: "80%",
    border: "2px solid #00D4FF",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
