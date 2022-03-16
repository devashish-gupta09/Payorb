import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  profileImage: {
    height: "12.5em",
    borderRadius: "50%",
    width: "12.5em",
    border: "4px solid white",
    [theme.breakpoints.down("sm")]: {
      width: "10em",
      height: "10em",
    },
  },
  profileInfoCardContainer: {
    width: "35%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  profileName: {
    fontSize: "2em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  profileImageContainer: {
    height: "12em",
    width: "10.5em",
    position: "absolute",
    marginTop: "-7.5em",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "8em",
      marginTop: "-5.5em",
      height: "7.25em",
      marginLeft: "1.5em",
    },
  },
  profileDetailsContainer: {
    padding: "8.5em 6em",
    [theme.breakpoints.down("sm")]: {
      padding: "6.5em 1.5em 1.5em 1.5em",
    },
  },
  titleCardProfileContainer: {
    width: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  titleCardInfoContainer: {
    paddingLeft: "3em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
    },
  },
  grey: {
    paddingBottom: "0.2em",
    fontWeight: 500,
    color: appColors.grey,
  },
  textField: {
    padding: "0",
    color: "yellow",
  },
  saveButton: {
    width: "5vw",
  },
  cancelButton: {
    margin: "0 0.5em",
    background: "#BDBDBD",
  },
  customerProfileVendorDetails: {
    width: "65%",
    maxWidth: "27.5em",
    height: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    background: "#F6F6FA",
    padding: "4em 2em 2em 2em",
    position: "absolute",
    borderRadius: "5px",
    top: "4em",
    zIndex: "-1",
    left: 0,
    right: 0,
    [theme.breakpoints.down("sm")]: {
      position: "inherit",
      width: "100%",
      justifyContent: "flex-start",
      padding: "1.5em",
    },
  },
  publicProfileName: {
    fontSize: "2em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75em",
    },
  },
  publicVendorDetailsRowLogo: {
    margin: "0.35em",
  },
  publicVendorDetailsRowContainer: {
    paddingBottom: "1em",
    fontSize: "1.25em",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "0",
      fontSize: "1em",
    },
  },
}));
