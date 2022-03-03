import { makeStyles } from "@material-ui/core";

import { appColors } from "../../../styles/colors";

export const styles = makeStyles((theme) => ({
  container: {
    //borderRadius: "0.5em",
    padding: "0.7em 0.7em 0.7em 0.7em",
    borderStyle:"solid",
    borderWidth:"0.05em",
    borderColor:"rgba(0, 0, 0, 0.25)",
    //boxShadow: "0px 0em 2em rgba(0, 0, 0, 0.25)",
    //boxShadow: "0px 1em 2em rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      // width: "80vw",
      // height: "max-content",
      padding: "0.5em 0.5em 0.5em 0.5em",
    },
  },
  flexbox:{
    [theme.breakpoints.down("sm")]: {
    display:"flex",
    flexDirection:"column",
    },
  },
  logo: {
    padding: "1em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "0em 0",
    },
  },
  sectionTitle: {
    paddingTop: "1.5em",
    color: appColors.grey,
    letterSpacing: "4%",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  title: {
    padding: "1.5em 0.5em 0 0",
    fontWeight: "bold",
    fontSize:"1.3em",
    color: "#333333",
    textAlign:"left",
    height: "max-content",
    [theme.breakpoints.down("sm")]: { 
      padding: "0.7em 0.5em 0 0",
    },
  },
  description: {
    fontSize:"1vw",
    textAlign: "left",
    paddingTop: "5%",
    paddingBottom: "2%",
    color: appColors.grey,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2%",
      fontSize: "0.9em",
    },
  },
  image: {
    height: "4.5em",
    [theme.breakpoints.down("sm")]: {
      height: "4em",
    },
  },
}));
