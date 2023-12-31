import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    padding: "4em 6em",
    background: "white",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  pointsContainer: {
    padding: "1em 0",
  },
  pointContainer: { padding: "0.5em 0" },
  pointText: {
    color: "#333333",
    letterSpacing: "1px",
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  pointCheck: {
    paddingRight: "1em",
    height: "100%",
  },
  pointLine: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  point: {
    padding: "0.3em 0",
  },
  bottomButton: {
    paddingTop: "2em",
  },
}));
