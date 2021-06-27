import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    maxHeight: "fit-content",
    padding: "4em 2em 10em 6em",
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content",
      padding: "2em 1em",
    },
  },
  carousel: {
    overflow: "visible",
    width: "90vw",
    height: "30vh",
    background: "#ffffff",
    borderRadius: "10px",
  },

  mobile: {
    display: "None !important",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "10px",
      display: "flex !important",
      paddingTop: "1em",
    },
  },
  desktop: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "None !important",
    },
  },
  navButton: {
    display: "None",
  },
  carouselIndicatorIcon: {
    borderRadius: "0.2em",
    height: "0.3em",
    width: "2em",
    backgroundColor: "#333333",
    margin: "0 0.3em",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0.2em",
      height: "0.2em",
      width: "1em",
    },
  },
  activeIndicator: {
    backgroundColor: "rgba(0, 221, 188, 1)",
  },
  indicatorButtonContainer: {
    marginTop: "-4em",
    padding: "1em 1em 1em 0",
    width: "105%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-3em",
    },
  },

  description: {
    color: appColors.grey,
    paddingBottom: "1em",
  },
  paragraphContainer: {
    paddingBottom: "4em",
    textAlign: "justify",
  },
}));
