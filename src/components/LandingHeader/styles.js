import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  buttonSpacing: {
    padding: "0 0.85em",
    fontSize: "0.85em",
    textTransform: "none",
  },
  logo: {
    width: "5% !important",
    [theme.breakpoints.down("sm")]: {
      width: "25% !important",
    },
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
      letterSpacing: "0.5px",
    
    },
  },
  drawerItemContainer: {
    padding: "0 1.5em",
    width: "95vw",
  },
  drawerTitleContainer: { padding: "3em 0 2em 0" },
  drawerClose: { color: "black" },
}));