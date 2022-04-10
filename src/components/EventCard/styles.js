import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  title: {
    fontSize: "1.6em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
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
    position: "relative",
  },
  headline: {
    fontWeight: "600",
    fontSize: "1.5em",
  },
  imgContainer: {
    width: "100%",
    top: 0,
    height: "15em",
    position: "relative",
  },
  image: {
    height: "12.5em",
    width: "100%",
    objectFit: "cover",
  },
  carouselImage: {
    height: "12.5em",
    width: "100%",
    objectFit: "cover",
  },
  textContainer: {
    width: "100%",
    padding: "0.4em 1em 0.6em 1.2em",
  },
  descriptionText: {
    fontSize: "0.95em",
    padding: "0.5em 0 0.75em 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
  cost: {
    float: "right",
    fontWeight: "600",
    fontSize: "1.5em",
  },
  bottomText: {
    fontSize: "0.95em",
    paddingBottom: "0.25em",
    fontWeight: "500",
    alignItems: "center",
    verticalAlign: "middle",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85em",
    },
  },
  topBannerButton: {
    borderRadius: "2em",
    background: "#008EFF",
    fontSize: "0.75em",
    padding: "0.5em 1em",
    margin: "0 0.5em",
    color: "white",
    height: "2.5em",
    textTransform: "none",
  },
  cooking: {
    background: "#1ECE7A",
  },
  topBanner: {
    position: "absolute",
    justifyContent: "flex-end",
    top: 0,
    padding: "0.75em 0.75em",
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    padding: "0 0.25em",
  },
  dateAndTime: {
    // height: "100%",
    color: "#68FDF3",
    background: "rgba(0,0,0,0.5)",
    padding: "0.25em 0.5em",
    position: "absolute",
    bottom: 0,
  },
  icon: {
    padding: "0.25em",
    background: "white",
    color: "#008EFF",
    marginBottom: "0.25em",
    "&:hover": {
      background: "white",
    },
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
  bottomTextContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  carouselContainer: {
    width: "100%",
    height: "100%",
  },
  bookButton: {
    padding: "0.5em 1.75em",
    [theme.breakpoints.down("sm")]: {
      margin: "1em 0",
    },
  },
}));
