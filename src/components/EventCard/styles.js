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
    display: "flex",
    alignItems: "center",
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
  eventImageWrapper: {
    borderRadius: "10px",
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
    padding: "0.5em 3em",
    marginRight: "0.3em",
  },
  dialogPaper: {
    maxWidth: "80vw",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      padding: "1em",
      margin: "1em",
    },
  },
  cardContainer: {
    width: "25em"
  },
  headline: {
    fontWeight: "bold",
    fontSize: "1em"
  },
  textContainer: {
    padding: "0.4em 1em 0.6em 1.2em"
  },
  descriptionText: {
    fontSize: "0.7em",
    marginTop: "0.24em"
  },
  cost: {
    float: "right",
    fontWeight: "bold",
    fontSize: "1em"
  },
  bottomTextContainer: {
    marginTop: "0.5em"
  },
  bottomText: {
    fontSize: "0.6em",
    marginTop: "0.5em",
    fontWeight: "bold",
    alignItems:"center",
    //textAlign: "center"
  },
  topBannerButton: {
    borderRadius: "2em",
    background: "#008EFF",
    fontSize: "0.6em",
    color: "white",
    height: "2.5em",

  },
  cooking: {
    background: "#1ECE7A",
    marginRight:"0.5em",
    // right: "74%"
  },
  topBanner: {
    //position: "absolute",
    justifyContent: "right",
    right: "24em",
    marginTop:"-12em",
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
    color: "white"
  },
  dateAndTime: {
    color: "#68FDF3",
    background: "rgba(0,0,0,0.5)",
    marginTop: "-2.2em",
    marginBottom: "0.3em",
    //left
    padding: "0 0.5em 0 0.5em"
  },
  icon: {
    background: "white",
    color: "#008EFF",
    borderRadius: "2em",
    fontSize: "medium",
    padding: "0.2em",
    marginTop: "0.2em"
  },
  deleteIcon: {
    color: "#FC6767"
  },
  AddToPhotosIcon: {
    color: "#FFB648"
  },
  shareIcon: {
    color: "#1ECE7A"
  }
}));
