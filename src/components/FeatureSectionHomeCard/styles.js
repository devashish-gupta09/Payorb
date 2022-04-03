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
    color: appColors.grey,
    letterSpacing: "4%",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  logoImage: {
    height: "4em",
    width: "fit-content",
    objectFit: "cover",
  },
  textContainer: {
    padding: "1em 4em",
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
    fontWeight: "600",
    fontSize: "18px",
    color: "#2F2F2F",
    height: "max-content",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
      fontSize: "1em",
    },
  },
  description: {
    fontSize: "15",
    // fontWeight: "500",
    paddingBottom: "2%",
    color: "#7B7B7B",
    lineHeight: "22px",
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
