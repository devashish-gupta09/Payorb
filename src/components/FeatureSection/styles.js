import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  container: {
    minHeight: "33em",
    width:"100%",
    justifyContent:"center",
    maxHeight: "fit-content",
    padding: "4em 2em 6em 3em",
    [theme.breakpoints.down("sm")]: {
      //minHeight: "fit-content",
      padding: "2em 1em",
      width:"100%"
    },
  },
  carousel: {
    overflow: "visible",
    width: "90vw",
    height: "30vh",
    background: "#ffffff",
    borderRadius: "10px",
  },

  /*mobile: {
    display: "none !important",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "10px",
      display: "flex !important",
      paddingTop: "1em",
    },
  },*/
  desktop: {
    width:"100em",
    /*[theme.breakpoints.down("sm")]: {
      display: "None !important",
    },*/
  },
  navButton: {
    display: "None",
  },
  carouselIndicatorIcon: {
    borderRadius: "0.2em",
    height: "0.3em",
    width: "2em",
    backgroundColor: "#333333",
    margin: "0 0.3em",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0.2em",
      height: "0.2em",
      width: "1em",
    },
  },
  activeIndicator: {
    backgroundColor: "rgba(0, 221, 188, 1)",
  },
  indicatorButtonContainer: {
    marginTop: "-4em",
    padding: "1em 1em 1em 0",
    width: "105%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-3em",
    },
  },
  title:{
    width:"100%",
    fontSize:"1.5vw",
  },
  description: {
    color: appColors.grey,
    paddingBottom: "0.5em",
  },

  paragraphContainer: {
    paddingBottom: "4em",
    textAlign: "justify",
  },

  sectionTitle:{
    width:"100%",
    color: "black",
    fontWeight: "bolder",
    textAlign:"center",
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  img:{
    position:"absolute", 
    right:0,
    [theme.breakpoints.down("sm")]: {
      display:"none",
    },
  },
  img2:{
    position:"absolute",
    left:"0",
    marginTop:"50vh",
    [theme.breakpoints.down("sm")]: {
      display:"none",
    },
  },
}));
