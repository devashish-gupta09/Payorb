import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  flexbox: {
    padding: "1em 0.5em 1em 2em",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0.5em 1em 1em",
    },
  },
  logo: {
    alignItems: "center",
    display: "block",
    margin: "0 auto",
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
    height: "6em",
    width: "6em",
  },
  textContainer: {
    padding: "2em 4em",
    width: "400px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "2em !important",
      paddingBottom: "0 !important",
      width: "100%",
    },
  },
  title: {
    padding: "1em 0.5em 0.25em 0",
    fontWeight: "bold",
    fontSize: "1.25em",
    color: "#333333",
    height: "max-content",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
      fontSize: "1em",
    },
  },
  description: {
    fontSize: "0.8em",
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
