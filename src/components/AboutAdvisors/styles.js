import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: "#E5E5E5",
    padding: "4em 4em 5em 5em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  mainTitle:{
      fontWeight:"bold",
  },
  title: {
    color: "#000000",
    alignItems: "center",
    fontWeight:"bold",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0",
    },
  },
  advisorContainer:{
    marginTop:"2em",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",

  },
  advisorName:{
      fontSize:"1.3em",
      fontWeight:"bolder",
  },
  advisorTitle:{
      fontSize:"1em",
      fontWeight:"300",
  }
}));
