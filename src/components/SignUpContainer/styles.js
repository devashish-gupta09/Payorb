import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  leftContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  imageRight: {
    flex: 1,
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
