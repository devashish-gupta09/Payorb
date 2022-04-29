import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    // height: "100%",
    padding: "2em",
    position: "absolute",
    bottom: "2em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
      height: "fit-content",
    },
  },
  image: {
    width: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  imageContainer: {
    padding: "4em 0 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 1em 0",
    },
  },
  titleSection: {
    color: "#333333",
    fontSize: "2.2em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  titleSectionContainer: {
    paddingLeft: "10em",
    width: "100%",
    marginLeft: "10em",
    // left: 0,
  },
  boldText: {
    fontWeight: "bold",
  },
}));
