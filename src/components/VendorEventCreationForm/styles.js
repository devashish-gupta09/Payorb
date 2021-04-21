import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  container: {
    background: "white",
    borderRadius: "10px",
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em"
    }
  },
  containerSave: {
    height: "100%"
  },
  leftContainer: {
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "0"
    }
  },
  rightContainer: {
    padding: "2em 2em 2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 0"
    }
  },

  textInput: {
    margin: "0.75em 0",
    color: "#BDBDBD",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0.75em",
      width: "100%",
    },
  },
  titleContainer: {
    padding: "2em 2em 0 2em",
    [theme.breakpoints.down("sm")]: {
      padding: "0 0 2em 0"
    }
  },
  saveButton: {
    width: "100%",
    margin: "1em 0",
    padding: "0.75em"
  }

}));
