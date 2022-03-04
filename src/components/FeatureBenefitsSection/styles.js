import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background:"linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 157.68%)",
    padding: "4em 4em 5em 5em",
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
    textAlign:"left",
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
    fontSize:"4em",
    color: "#333333",
    //textAlign:"left",
    marginTop:"-1.7em",
    height: "max-content",
    [theme.breakpoints.down("sm")]: { 
      padding: "1em 0.5em 0 0",
      fontSize:"1.7em",
    },
  },
  coloredLine:{
    display:"none",
    [theme.breakpoints.down("sm")]:{
      display:"block",
    }
  }
}));
