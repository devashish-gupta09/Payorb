import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: "#F5FBFE",
    padding: "4em 4em 5em 5em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  mainTitle:{
      fontWeight:"bold",
  },
  image: {
    width: "50em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1em",
      width: "inherit",
    },
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    color: "#000000",
    alignItems: "center",
    fontWeight:"bold",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0",
    },
  },
  description: {
    background: "url(/assets/aboutUs/Visionbg.svg)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      alignItems: "center",
      padding: "1em",
    },
  },
}));
