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
    marginBottom: "-0.25em",
    fontSize: "40px",
    fontWeight: "600",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  box: {
    paddingTop: "1em",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingTop: "0em",
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
    width: "65%",
    padding: "0.5em 2.25em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "1em 0",
    },
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  // title: {
  //   width: "40%",
  //   textAlign: "left",
  // },
  heading1: {
    fontSize: "32px",
    fontWeight: "300",
  },
  heading2: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  contact: {
    width: "30%",
    textAlign: "right",
  },
  contactText: {
    color: "#00D4FF",
    fontWeight: "400",
    paddingTop: "0.25em",
    textDecoration: "underline",
  },
  plan: {
    background: "#F5FBFE",
    borderRadius: "12px",
    margin: "2em 0",
    padding: "1.5em",
    paddingBottom: "4em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
      margin: "2em 0 1em 0",
    },
  },
  planHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  planName: {
    fontFamily: "'Playfair Display', serif",
    marginBottom: "1em",
    paddingBottom: "0.25em",
    borderBottom: "2px solid #00D4FF",
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
