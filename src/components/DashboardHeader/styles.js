import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: "0.5em 4em",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em 1em",
    },
  },
  header: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  },
  buttonSpacing: {
    padding: "0 1.5em",
  },
  signupButton: {
    background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%)",
    borderRadius: "2em",
    fontWeight: "bold",
    padding: "0.75em 1em",
    marginLeft: "1em",
  },
  buttonContainer: {
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  menuButtonContainer: {
    display: "None",
    [theme.breakpoints.down("sm")]: {
      display: "contents",
    },
  },
  drawerList: {
    padding: "2em 0",
    "& > li": {
      listStyleType: "None",
      padding: "1em 0",
      color: appColors.grey,
      letterSpacing: "1px",
    },
  },
  drawerItemContainer: {
    padding: "2.5em 0",
    width: "95vw",
  },
  drawerTitleContainer: { padding: "3em 0 2em 0" },
  drawerClose: { color: "black" },
  mobile: {
    display: "None",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  wideScreen: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  activeTab: {
    background: "#79DFDF",
    height: "0.2em",
    justifyContent: "flex-end",
  },

  btn: {
    maxWidth: "100%",
    textAlign: "left",
    padding: "1em",
  },
  activeLink: {
    fontWeight: "bold",
    color: "#000000 !important",
    [theme.breakpoints.down("sm")]: {
      background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 183.33%)",
      maxWidth: "100%",
      padding: "1em",
      color: "#000000",
    },
  },
  navItem: {
    width: "100%",
    textAlign: "left",
  },
}));
