import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
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
      alignItems:"center"
    },
  },
  mainTitle:{
    padding: "1.5em 0.5em 0 0",
    fontWeight: "bold",
    //fontSize:"1.3em",
    color: "#333333",
    //textAlign:"left",
    height: "max-content",
    [theme.breakpoints.down("sm")]: { 
      padding: "0.5em 0.5em 0 0",
    },
  },
  coloredLine:{
    display:"none",
    [theme.breakpoints.down("sm")]:{
      display:"block",
    }
  }
}));
