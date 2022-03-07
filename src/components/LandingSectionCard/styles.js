import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  container: {
    borderRadius: "8px",
    padding: "0.7em 0.7em 0.7em 0.7em",
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0.5em 0.5em 0.5em 0.5em",
    },
  },
  flexbox: {
    padding: "1em 0.5em 1em 2em",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      padding: "1em 0.5em 1em 1em",
    },
  },
  logo: {
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {},
  },
  sectionTitle: {
    // paddingTop: "1.5em",
    color: appColors.grey,
    letterSpacing: "4%",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  logoImage: {
    height: "4em",
    width: "4em",
  },
  textContainer: {
    padding: "2em 4em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em !important",
    },
  },
  title: {
    padding: "1em 0.5em 0.25em 0",
    fontWeight: "bold",
    fontSize: "1.25em",
    color: "#333333",
    textAlign: "left",
    height: "max-content",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
      fontSize: "1em",
    },
  },
  description: {
    fontSize: "1em",
    textAlign: "left",
    paddingBottom: "2%",
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2%",
      fontSize: "0.75em",
    },
  },
  image: {
    height: "4.5em",
    [theme.breakpoints.down("sm")]: {
      height: "4em",
    },
  },
}));
