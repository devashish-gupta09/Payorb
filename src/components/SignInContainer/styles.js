import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      alignContent: "flex-end",
    },
  },
  leftContainer: {
    height: "fit-content",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  imageRight: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "None",
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
