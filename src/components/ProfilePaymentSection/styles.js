import { makeStyles } from "@material-ui/core";
import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  capsule: {
    marginLeft: "0.3em",
  },
  root: {
    borderRadius: "0.8em",
    padding: "2em 8em",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5em 1em",
    },
  },
  description: {
    width: "fit-content",
    background: "rgba(255, 206, 49, 0.17)",
    border: "1px solid rgb(255, 206, 49)",
    padding: "0.5em",
    borderRadius: "5px",
  },
  infoRowRoot: { paddingLeft: "1em", width: "fit-content" },
  infoRow: {
    padding: "1em 0",
    width: "100%",
    borderBottom: "2px",
    borderColor: "#F2F2F2",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  reviewerLabel: {
    color: appColors.grey,
  },
  reviewTime: {
    color: appColors.grey,
  },
  textInput: {
    color: "#BDBDBD",
    marginBottom: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "1em",
    },
  },
  saveButtonContainer: {
    padding: "1em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em 1em 2.5em",
    },
  },
  saveButton: {
    // width: "20%",
    fontWeight: "bold",
    padding: "0.75em 2.5em",
    marginRight: "1 em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sectionTitle: {
    width: "fit-content",
  },
  cancelButton: {
    [theme.breakpoints.down("sm")]: {
      margin: "1.5em 0 0.5em 0",
    },
  },
  bankAddrContainer: {
    paddingLeft: "4em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingTop: 0,
    },
  },
  detailRowContainer: {
    paddingBottom: "0.5em",
  },
  detailRowTitle: {
    color: "#8B8B8B",
    paddingBottom: "0",
    fontWeight: "300",
  },
}));
