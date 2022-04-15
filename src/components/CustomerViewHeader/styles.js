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
  buttonSpacing: {
    padding: "0 1em",
  },
  signupButton: {
    padding: "0.75em 1em",
    fontWeight: "600",
    background: "white",
    boxShadow: "inset 0px 0px 0px 2px black",
    fontSize: "0.8em",
    borderRadius: "2em",
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
    "& > li": {
      listStyleType: "None",
      padding: "1em 0",
      color: appColors.grey,
      letterSpacing: "1px",
    },
  },
  drawerItemContainer: {
    padding: "0 1.5em",
    width: "95vw",
  },
  drawerTitleContainer: { padding: "3em 0 2em 0" },
  drawerClose: { color: "black" },
}));
