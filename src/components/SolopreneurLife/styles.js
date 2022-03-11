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
  mainTitle:{
      fontWeight:"bold",
      fontSize:"2.1em",
      [theme.breakpoints.down("sm")]: {
        fontSize:"1.8em"
      },
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
    textAlign:"center",
    fontWeight:"bold",
    [theme.breakpoints.down("sm")]: {
      padding: "1em -0.2em",
    },
  },
  description: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      alignItems: "center",
      padding: "1em",
    },
  },
  divider:{
    color: "#00D4FF",
    backgroundColor: "#00D4FF",
    height: "0.3em",
    width: "5em",
    marginBottom:"1em",
    [theme.breakpoints.down("sm")]:{
      width:"4em",
      height: "0.2em",
    }
  },
  buttonContain: {
    position: "relative",
    width: "100%",
    height: "3em",
    top:"1.3em",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  capsuleButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    fontWeight: "600",
    fontSize: "0.8em",
    marginTop: "1.6em",
    padding: "0.5em 1em",

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      fontSize: "0.65em",
      fontWeight: "600",
      marginTop: "0",
      padding: "0.75em 1.5em",
    },
  },
  
}));
