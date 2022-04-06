import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background:
      "linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.72) 120.68%)",
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
    padding: "4em 0",
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
    padding: "0em 6em 0em 2em",
    [theme.breakpoints.down("sm")]: {
      margin: "1em 0",
      textAlign: "center",
      alignItems: "center",
      padding: "0 1em",
    },
    "&>p": {
      fontSize: "15",
      textAlign: "left",
      marginTop: "0",
      marginBottom: "1.25em",
      lineHeight: "22px",
    },
    "&>b": {
      fontSize: "15",
      marginBottom: "0.25em",
      [theme.breakpoints.down("sm")]: {
        textAlign: "left",
      },
    },
  },
  mainTitle: {
    color: "#333333",
    fontWeight: "600",
    width: "50%",
    fontSize: "60px",
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
  titleContainer: {
    paddingLeft: "25%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
    },
  },
  descriptionSubTitle: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
      padding: "0 1em",
    },
  },
}));
