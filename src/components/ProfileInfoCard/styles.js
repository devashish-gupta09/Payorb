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
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  },
  profileName: {
    fontSize: "2em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em"
    },
  },
  profileImageContainer: {
    height: "12em",
    width: "10em",
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
      marginLeft: "1.5em"
    },
  },
  profileDetailsContainer: {
    padding: "8.5em 4em",
    [theme.breakpoints.down("sm")]: {
      padding: "6.5em 1.5em"
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
}));
