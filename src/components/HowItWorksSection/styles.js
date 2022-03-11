import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  bg: {
    margin: "0",
    background: "url(/assets/howItWorksBG.svg) no-repeat center center",
    backgroundSize: "cover",
  },
  container: {
    height: "100vh",
    maxHeight: "fit-content",
    padding: "4em 2em 10em 2em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
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
    width: "50vw",
    height: "50vh",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "2em auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "fit-content",
      margin: "0 auto",
      paddingBottom: "3em",
    },
  },
  videoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    padding: "0 auto",
  },
}));
