import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "75vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundImage: "url(/assets/mobile-home-bg.png)",
    },
  },
  textContainer: {
    padding: "10% 4em 4em 4em",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
      padding: "5em 1.5em 0 1.5em",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
  },
  titleSection: {
    display: "inline-block",
    color: "black",
    fontWeight: "bolder",
    paddingBottom: "0.25em",
    fontFamily: "'Kadwa', serif",
    lineHeight: "1",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6em",
      textAlign: "center",
      paddingLeft: "1.2em",
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
    fontFamily: "'Kadwa', serif",
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
    fontSize: "1.25em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontWeight: "500",
      fontSize: "1em",
      textAlign: "center",
    },
  },
  imgContainer: {
    display: "inline",
    position: "absolute",
    width: "40%",
    height: "29.25em",
    right: "5%",
    bottom: "0",
    [theme.breakpoints.down("sm")]: {
      height: "20em",
      width: "100%",
      right: "0",
    },
  },
  image: {
    width: "100%",
    position: "absolute",
    bottom: "0",
  },
  buttonContain: {
    position: "relative",
    width: "100%",
    height: "fit-content",
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
    marginRight: "1em",
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    boxShadow: "none",
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
}));
