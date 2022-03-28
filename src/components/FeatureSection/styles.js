import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  root: {
    background: "url(/assets/feature-page-section.png)",
    backgroundSize: "cover",
    height: "fit-content",
    width: "100%",
    padding: "2em 0",
  },
  container: {
    height: "fit-content",
    width: "100%",
    padding: "2em 10% 1em 12.5%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0",
      width: "100%",
      justifyContent: "center",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "2em 40em 0em 40em",
      width: "100%",
      justifyContent: "center",
    },
  },
  desktop: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  navButton: {
    display: "None",
  },
  title: {
    width: "100%",
    fontSize: "1.5em",
    [theme.breakpoints.down("sm")]: {
      border: "2px solid",
      fontSize: "1em",
    },
  },
  description: {
    color: appColors.grey,
    paddingBottom: "0.5em",
  },
  paragraphContainer: {
    paddingBottom: "4em",
    textAlign: "justify",
  },
  sectionTitle: {
    width: "100%",
    color: "black",
    fontWeight: "bolder",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    position: "absolute",
    right: 0,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  img2: {
    position: "absolute",
    left: "0",
    marginTop: "50vh",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
