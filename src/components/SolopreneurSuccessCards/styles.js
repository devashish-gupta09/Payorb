import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: "1em",
    [theme.breakpoints.down("sm")]: {
      margin: "0 2em 0 2em",
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
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      padding: "1em -0.2em",
    },
  },
  description: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      alignItems: "center",
      padding: "1em",
    },
  },
  divider: {
    color: "black",
    backgroundColor: "black",
    height: "0.3em",
    width: "7vw",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      width: "4em",
      height: "0.2em",
    },
  },
  context: {
    padding: "0.5em 1.5em 1em 1.5em",
  },
  headline: {
    fontSize: "1.2em",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  buttonContain: {
    marginTop: "2em",
    color: "#718096",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.5em",
    },
  },
  readMore: {
    justifyContent: "right",
    float: "right",
    right: "0",
    fontSize: "0.7em",
    textTransform: "none",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: "0.8em",
    marginTop: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  date: {
    fontSize: "0.7em",
    color: "#718096",
  },
}));
