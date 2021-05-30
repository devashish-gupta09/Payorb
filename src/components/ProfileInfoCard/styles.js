import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  profileImage: {
    height: "6em",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 17px 2px #79DFDF",
    },
    [theme.breakpoints.down("sm")]: {
      height: "4em",
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
