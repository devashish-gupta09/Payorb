import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  container: {
    borderRadius: "0.75em",
    padding: "0.7em 0.7em 0.7em 0.7em",
    boxShadow: "0px 1em 2em rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      width: "100%",
      // width: "80vw",
      // height: "max-content",
    },
  },
  logo: {
    padding: "1em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0",
    },
  },
  sectionTitle: {
    paddingTop: "1.5em",
    color: appColors.grey,
    letterSpacing: "4%",
    textTransform: "uppercase",
  },
  title: {
    padding: "0.2em 0.5em 0 0.5em",
    fontWeight: "bold",
    color: "#333333",
    height: "max-content",
  },
  description: {
    fontSize: "1em",
    textAlign: "left",
    paddingTop: "7.5%",
    paddingBottom: "5%",
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5%",
      fontSize: "0.9em",
    },
  },
  image: {
    height: "4.5em",
    [theme.breakpoints.down("sm")]: {
      height: "4em",
    },
  },
}));
