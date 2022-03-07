import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  profile: {
    position: "absolute",
    top: "-2em",
    left: "1em",
  },
  card: {
    backgroundColor: "#fff",
    border: "3px solid #00D4FF",
    borderRadius: "10px",
    height: "fit-content",
    margin: "4em",
    padding: "1em 2em 1em 5em",
    width: "500px",
    [theme.breakpoints.down("sm")]: {
      margin: "2em",
      padding: "1em 1em 1em 2em",
      width: "80%",
    },
  },
  name: {
    fontWeight: "bold",
    paddingBottom: "0.5em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "4em",
    },
  },
  description: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2em",
    },
  },
}));
