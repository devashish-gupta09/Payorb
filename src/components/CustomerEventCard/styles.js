import { makeStyles } from "@material-ui/core";
import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  root: {
    padding: "0",
  },
  title: {
    fontSize: "1.6em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
    },
  },
  imageContainer: {
    padding: "1em",
    maxHeight: "30em",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  eventDetailContainer: {
    padding: "1.5em 1.5em 1em 1em",
  },
  eventImage: {
    width: "100%",
    borderRadius: "10px",
    maxHeight: "350px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0.4em",
    },
  },
  datesInnerContainer: {
    width: "fit-content",
    background: "#BDF5F2",
    padding: "0.5em 1em",
    borderRadius: "5px",
  },
  generalInfoContainer: {
    width: "100%",
    paddingTop: "0.8em",
  },
  editButtonContainer: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      padding: "1em 0",
    },
  },
  greyFont: {
    color: appColors.grey,
  },
  seats: {
    fontSize: "1.2em",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  editButton: {
    padding: "1em 3em",
  },
  dialogPaper: {
    maxWidth: "80vw",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      padding: "1em",
      margin: "1em"
    }
  }
}));
