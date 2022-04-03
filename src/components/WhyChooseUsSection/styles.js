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
      "linear-gradient(180deg, rgba(188, 244, 241, 1) 0%, rgba(0, 212, 255, 0.5) 90%);",
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content",
      padding: "2em 1em",
    },
  },
  heading: {
    fontSize: "40px",
    fontWeight: "600",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  description: {
    width: "50vw",
    padding: "0.5em 0.5em 1em 0.5em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "none",
    },
  },
}));
