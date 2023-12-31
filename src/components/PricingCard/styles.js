import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: "linear-gradient(180deg, #BCF4F1 0%, #68DBF4 71.87%)",
    width: "35%",
    borderRadius: "12px",
    padding: "1.5em 2em",
    marginTop: "1em",
    marginLeft: "2.5em",
    [theme.breakpoints.down("sm")]: {
      background: "none",
      margin: "0",
      padding: "0em 1em",
      width: "100%",
    },
  },
  head: {
    paddingTop: "1.5em",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  heading1: {
    fontWeight: "300",
  },
  heading2: {
    fontWeight: "bold",
  },
  description: {
    marginTop: "1em",
    fontSize: "0.8em",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  imgBox: {
    width: "100%",
    height: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
}));
