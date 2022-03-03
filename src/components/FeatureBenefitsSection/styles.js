import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    zIndex:"-2",
    background:"linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 157.68%)",
    padding: "8em 2em 10em 6em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  image: {
    width: "50em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1em",
      width: "inherit",
    },
  },
  desktop:{
    [theme.breakpoints.down("sm")]: {
      display:"none",
    },
  },
  title:{
    color:"black",
    margin:"auto",
    [theme.breakpoints.down("sm")]: {
      alignItems:"center",
    },
  },
  description:{
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
    },
  },
}));
