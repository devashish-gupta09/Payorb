import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  buttonSpacing: {
<<<<<<< HEAD
    padding: "0 0.85em",
    fontSize: "0.85em",
=======
    borderRadius: "0",
    fontSize: "0.8em",
    padding: "0 1.5em",
    textTransform: "none",
  },
  buttonActive: {
    borderBottom: "2px solid #00D4FF",
    borderRadius: "0",
    color: "#00D4FF",
    fontSize: "0.8em",
    padding: "0 1.5em",
>>>>>>> 19836e2f7b22c2a03f16a91efd6b70d6d891fc28
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
<<<<<<< HEAD
    padding: "0.5em 0.75em",
=======
>>>>>>> 19836e2f7b22c2a03f16a91efd6b70d6d891fc28
    marginLeft: "1em",
    padding: "0.75em 1em",
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
    width: "100vw",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },
  drawerTitleContainer: { padding: "3em 0 2em 0" },
  drawerClose: { color: "black" },
}));