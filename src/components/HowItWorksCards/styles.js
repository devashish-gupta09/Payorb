import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  img: {
    position: "absolute",
    display: "inline-block",
    left: "5%",
    width: "70%",
    height: "70%",
  },
  box: {
    position: "relative",
    display: "inline-block",
  },
  title: {
    padding: "0.2em 0em",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#000000",
    height: "max-content",
  },
  description: {
    fontSize: "0.8em",
    textAlign: "left",
    padding: "1em 0em",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5%",
      fontSize: "0.9em",
    },
  },
  image: {
    height: "4.5em",
    [theme.breakpoints.down("sm")]: {
      height: "4em",
    },
  },
}));
