import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "fit-content",
    padding: "2em 2em 2em 2em",
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content",
      padding: "2em 1em",
    },
  },
  heading: {
    fontSize: "2.5em",
    fontWeight: "bold",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  box: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  },
  planBox: {
    height: "fit-content",
    width: "800px",
    padding: "1.5em 2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "1em",
    },
  },
  planContainer: {
    height: "fit-content",
    width: "800px",
    padding: "1.5em 2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "1em",
    },
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    width: "40%",
    textAlign: "left",
  },
  heading1: {
    fontSize: "2.2em",
    fontWeight: "300",
  },
  heading2: {
    fontSize: "2.2em",
    fontWeight: "bold",
  },
  contact: {
    width: "30%",
    textAlign: "right",
  },
  contactText: {
    color: "#00D4FF",
    textDecoration: "underline",
  },
  plan: {
    background: "#F5FBFE",
    borderRadius: "12px",
    margin: "2em 0",
    padding: "1.5em",
    paddingBottom: "4em",
  },
  planHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  planName: {
    fontFamily: "'Playfair Display', serif",
    paddingBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8em !important",
      fontWeight: "bold",
    },
  },
  planPrice: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  planDescription: {
    margin: "1em",
    marginLeft: "0",
    fontWeight: "bold",
  },
  button: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  capsuleButton: {
    padding: "0.75em 1.25em",
    marginRight: "1em",
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    boxShadow: "none",
    fontSize: "0.8em",
    position: "absolute",
    right: "1em",
    bottom: "-4em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.3em 1em",
      fontSize: "0.7em",
    },
  },
}));
