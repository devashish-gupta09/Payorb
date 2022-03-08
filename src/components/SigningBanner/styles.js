import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    height: "100%",
    background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%)",
    padding: "2em",
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
    paddingLeft: "1em",
  },
  boldText: {
    fontWeight: "bold",
  },
}));
