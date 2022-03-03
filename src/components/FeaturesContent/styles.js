import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "95vw",
    height: "100vh",
    overflowX: "hidden",
  },
  textContainer: {
    // position: "absolute",
    // top: "25%",
    // left: "5%",
    // width: "50%",
    position: "absolute",
    width: "38.75em",
    height: "13.8125em",
    left: "3.625em",
    top: "9.5em",
    alignContent:"center",

    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: "0%",
      width: "100%",
      padding: "1em 1em",
      alignItems: "center",
    },
  },
  titleSection: {
    color: "black",
    fontWeight: "bolder",
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    [theme.breakpoints.down("sm")]: {
      marginTop:"5vw",
      fontSize: "1.6em",
      textAlign: "center",
    },
  },
  titleSection1: {
    marginTop:"2vw",
    fontSize:"3vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25em",
      width: "100%",
    },
  },
  aquaText: {
    color: "#00D4FF",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      width: "100%",
    },
  },
  descriptionText: {
    color: "#2D2F30",
    width: "100%",
    textJustify: "auto",
    fontSize:"20px",
    marginTop:"1vw",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "0.9em",
      fontWeight: "500",
      padding: "0.6em 0.5em",
      textAlign: "center",
    },
  },
  imgContainer: {
    // position: "absolute",
    // display: "flex",
    // top: "40%",
    // right: "6%",
    // width: "50%",
    position: "absolute",    
    right: "2.5em",
    top: "12em",
    left: "57vw",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      display: "contents",
      width: "100%",
      padding: "0em 1em",
      justifyContent: "center",
      marginLeft:"auto",
      marginRight:"auto",
    },
  },
  image: {
    width:"37vw",
    

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "4em",
      padding: "1em 1em",
    },
  },
  buttonContain: {
    position: "absolute",
    width: "100%",
    height: "3em",
    top: "37vh",
    
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginBottom:"10vh",
    },
  },
  buttonSpacing: {
    padding: "0 1.5em",
  },
  capsuleButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    fontWeight: "bold",
    marginTop: "1.2em",
    padding: "1em 2em",
    [theme.breakpoints.down("sm")]: {
      //alignItems: "center",
      fontSize: "0.65em",
      fontWeight: "600",
      marginTop: "0",
      padding: "0.75em 1.5em",
    },
  },
  callMadeIcon: {
    paddingLeft: "0.5em",
    fontSize: "2rem",
  },
}));