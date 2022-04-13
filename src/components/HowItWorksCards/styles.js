import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 1em",
  },
  imgBox: {
    // position: "relative",
    // display: "inline-block",
    // left: "5%",
    // width: "80%",
    // height: "80%",
    [theme.breakpoints.down("sm")]: {
      display: "inline",
    },
  },
  img: {
    width: "4em",
    height: "4em",
    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  },
  textBox: {
    [theme.breakpoints.down("sm")]: {
      display: "inline",
      width: "80%",
    },
  },
  box: {
    position: "relative",
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
    },
  },
  title: {
    padding: "0.2em 0em",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#000000",
    height: "max-content",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  description: {
    fontSize: "0.8em",
    textAlign: "left",
    padding: "1em 0em",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5%",
      fontSize: "0.7em",
    },
  },
  image: {
    height: "4.5em",
    [theme.breakpoints.down("sm")]: {
      height: "4em",
    },
  },
}));
