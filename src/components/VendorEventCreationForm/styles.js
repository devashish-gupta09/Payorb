import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "10px solid yellow",
  },
  container: {
    border: "3px solid purple",
    background: "white",
    borderRadius: "10px",
    padding: "2em 2em 1em 2em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  containerSave: {
    height: "100%",
  },
  leftContainer: {
    padding: "0.5em 2em 0 2em",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  rightContainer: {
    padding: "0em 2em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 0",
    },
  },
  typeContainer: {
    border: "4px solid",
  },
  modal: {
    padding: "5em",
    [theme.breakpoints.down("sm")]: {
      padding: "3em",
    },
  },
  textInput: {
    borderRadius: "4px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0.75em",
      width: "100%",
    },
  },
  titleContainer: {
    paddingBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0",
    },
  },
  saveButton: {
    width: "100%",
    margin: "1em 0",
    padding: "0.75em",
  },
  editTitle: {
    paddingLeft: "0.5em",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
    },
  },
  eventImage: {
    width: "100%",
    "&:hover": {
      boxShadow: "0px 0px 7px 0px grey",
    },
  },

  helperText: {
    color: "#000000",
  },
}));
