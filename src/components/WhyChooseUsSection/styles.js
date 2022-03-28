import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4em 2em 5em 2em",
    background:
      "linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 157.68%);",
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
  description: {
    width: "50vw",
    padding: "0.5em",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
