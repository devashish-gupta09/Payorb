import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background:
      "linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 157.68%)",
    // padding: "4em 4em 5em 5em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  image: {
    width: "50em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1em",
      width: "inherit",
    },
  },
  desktop: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    color: "#000000",
    background: "url(/assets/FeatureSection32.png)",
    backgroundPosition: "center",
    backgroundSize: "contain",
    padding: "2em 0",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      background: "none",
      padding: "1em 0",
    },
  },
  description: {
    background: "url(/assets/FeatureSection3.png)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin: "2.5em 0",
    padding: "0em 4em 0em 2em",
    [theme.breakpoints.down("sm")]: {
      margin: "1em 0",
      textAlign: "center",
      alignItems: "center",
      padding: "0 1em",
    },
  },
  mainTitle: {
    color: "#333333",
    fontWeight: "600",
    width: "50%",
    fontSize: "2.5em",
    lineHeight: "1.15",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "1.7em",
      textAlign: "center",
    },
  },
  coloredLine: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.5em",
      background: "black",
      display: "block",
      width: "4em",
      height: "0.25em",
    },
  },
}));