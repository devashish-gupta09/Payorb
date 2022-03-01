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
    background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%)",
    borderRadius: "2em",
    fontWeight: "bold",
    padding: "0.5em 0.75em",
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
