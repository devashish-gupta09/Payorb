import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    paddingRight: "3em",
  },
  sectionTitle: {
    padding: "0.6em 0",
    color: "#828282",
    letterSpacing: "4%",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
    },
  },
  title: {
    padding: "0.2em 1em 0.5em 0",
    fontWeight: "bold",
    color: "#333333",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  description: {
    color: "#828282",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "1em",
    },
  },
}));
