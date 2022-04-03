import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  bg: {
    margin: "0",
    background: "url(/assets/faqs-bg.svg) no-repeat center center",
    backgroundSize: "cover",
  },
  container: {
    height: "fit-content",
    padding: "2em 2em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
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
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  },
  img: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  faq: {
    margin: "1em",
  },
}));
