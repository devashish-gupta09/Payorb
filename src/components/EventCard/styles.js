import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  root: {
    padding: "0",
    display: "inline-block",
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
    borderRadius: "8px 8px 0px 0px",
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
    display: "inline",
    // width: "25em",
    borderRadius: "8px 8px 0px 0px",
  },
  headline: {
    fontWeight: "bold",
    fontSize: "1em",
  },
  imgContainer: {
    width: "520px",
    borderRadius: "8px 8px 0px 0px",
  },
  image: {
    borderRadius: "8px 8px 0px 0px",
  },
  textContainer: {
    width: "520px",
    padding: "0.4em 1em 0.6em 1.2em",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
  },
  descriptionText: {
    fontSize: "0.2em",
    marginTop: "0.24em",
  },
  cost: {
    float: "right",
    fontWeight: "bold",
    fontSize: "1em",
  },
  bottomTextContainer: {
    marginTop: "0.5em",
  },
  bottomText: {
    fontSize: "0.8em",
    marginTop: "0.5em",
    fontWeight: "bold",
    alignItems: "center",
    verticalAlign: "middle",
    //textAlign: "center"
  },
  topBannerButton: {
    borderRadius: "2em",
    background: "#008EFF",
    fontSize: "0.6em",
    padding: "0.5em 1em",
    margin: "0 0.5em",
    color: "white",
    height: "2.5em",
  },
  cooking: {
    background: "#1ECE7A",
    // right: "74%"
  },
  topBanner: {
    //position: "absolute",
    justifyContent: "right",
    right: "24em",
    marginTop: "-16em",
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  dateAndTime: {
    color: "#68FDF3",
    background: "rgba(0,0,0,0.5)",
    marginTop: "-1.5em",
    // marginBottom: "0.3em",
    //left
    padding: "0 0.5em 0 0.5em",
  },
  icon: {
    background: "white",
    color: "#008EFF",
    borderRadius: "2em",
    fontSize: "1.5em",
    padding: "0.2em",
    margin: "0.2em 0.5em 0em 0.5em",
  },
  deleteIcon: {
    color: "#FC6767",
  },
  AddToPhotosIcon: {
    color: "#FFB648",
  },
  shareIcon: {
    color: "#1ECE7A",
  },
  date: {
    verticalAlign: "super",
  },
}));
