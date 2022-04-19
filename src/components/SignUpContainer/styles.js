import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "4em",
      height: "fit-content",
    },
  },
  leftContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  imageRight: {
    position: "absolute",
    top: "135%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  imageTop: {
    display: "None",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      height: "min-content",
    },
  },
  formLeft: {
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  formBottom: {
    display: "None",
    [theme.breakpoints.down("sm")]: {
      display: "contents",
    },
  },
}));
