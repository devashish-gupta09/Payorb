import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  foundation: {
    position: "relative",
    background: "url(/assets/create-event-bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      // paddingTop: "4.5em",
    },
  },
  baseBackground: {
    width: "100vw",
  },
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  container: {
    background: "white",
    borderRadius: "5px",
    padding: "1em 1em 1em 1em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  containerSave: {
    width: "100%",
    height: "100%",
  },
  leftContainer: {
    padding: "0.5em 1em 0 1em",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  formContainer: {
    width: "100%",
    padding: "0 8%",
    [theme.breakpoints.down("sm")]: {
      padding: "0 2em",
    },
  },
  rightContainer: {
    padding: "0em 1em",
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
  internalInputStyle: {
    padding: "1em",
    background: "pink ",
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
  draftButton: {
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
