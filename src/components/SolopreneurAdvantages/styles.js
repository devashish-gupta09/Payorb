import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  outerContainer: {
    backgroundColor: "#F5FBFE",
  },
  container: {
    padding: "4em 7em 5em 7em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "4em 1em",
    },
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: "2.1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8em",
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
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    color: "#000000",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      padding: "1em -0.2em",
    },
  },
  description: {
    fontSize: "1.2em",
    padding: "0 1em 0 1em",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      alignItems: "center",
      padding: "1em",
    },
  },
  divider: {
    color: "#00D4FF",
    backgroundColor: "#00D4FF",
    height: "0.3em",
    width: "5em",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      width: "4em",
      height: "0.2em",
    },
  },
  checklistContainer: {
    marginTop: "0.5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em 1.4em 0 1.4em",
      marginTop: "0.2em",
    },
  },
  checkIcon: {
    display: "inline",
    position: "relative",
    marginTop: "0.8em",
    fontSize: "0.6em",
  },
  listItem: {
    display: "inline",
    position: "relative",
    marginTop: "0.8em",
    paddingLeft: "1em",
    fontSize: "0.9em",
    fotWeight: "600",
  },
  bgImg1: {
    position: "absolute",
    left: 0,
    marginTop: "20em",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  bgImg2: {
    position: "absolute",
    right: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
