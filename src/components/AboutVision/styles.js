import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: "#F5FBFE",
    padding: "4em 7em 5em 7em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: "2.3em",
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
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      padding: "1em -0.2em",
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
  divider: {
    color: "#00D4FF",
    backgroundColor: "#00D4FF",
    height: "0.3em",
    width: "5em",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      width: "4em",
      height: "0.2em",
    },
  },
  commentImg: {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
    //position:"relative",
    justifyContent: "right",
    float: "right",
    //backgroundColor:"white",
    borderRadius: "2em",
    overflow: "visible",
    width: "3em",
    height: "2.3em",
  },
}));
