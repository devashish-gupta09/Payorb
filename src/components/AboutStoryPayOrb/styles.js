import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({

  outerContainer:{
    background: "linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 157.68%)",
  },  
  container: {
    backgroundImage: "url(/assets/aboutUs/StoryBg.svg)",
    backgroundSize: "contain",
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    padding: "4em 4em 5em 5em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
      background:"none",
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
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      alignItems: "center",
      padding: "1em",
    },
  },
}));
