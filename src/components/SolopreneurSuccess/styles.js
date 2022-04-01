import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  outerContainer: {
    background:
      "linear-gradient(180deg, #BCF4F1 0%, rgba(0, 212, 255, 0.33) 157.68%)",
  },
  container: {
    backgroundImage: "url(/assets/aboutUs/StoryBg.svg)",
    backgroundSize: "contain",
    backgroundPosition: "left",
    backgroundRepeat: "no-repeat",
    padding: "4em 7em 5em 7em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
      background: "none",
    },
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: "2.1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8em",
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
    fontWeight: "bold",
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
  divider: {
    color: "black",
    backgroundColor: "black",
    height: "0.3em",
    width: "7vw",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      width: "4em",
      height: "0.2em",
    },
  },
  desktop: {
    display: "block",
    margin: "0 3em 0 3em",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileView: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      paddingBottom: "1em",
    },
  },
  multipleCards: {
    marginTop: "1.5em",
  },
  headline: {
    fontSize: "1.2em",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  buttonContain: {
    marginTop: "2em",
    color: "#718096",
  },
  readMore: {
    justifyContent: "right",
    float: "right",
    right: "0",
    fontSize: "0.7em",
    textTransform: "none",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: "0.8em",
    marginTop: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  date: {
    fontSize: "0.7em",
    color: "#718096",
  },
  bannerContainer: {
    //minHeight: "12em",
    //padding:'0',
  },
  bannerImage:{
    minHeight:"11em",
    backgroundImage:"url(/assets/solopreneur/SuccessStories/cover-issue1.svg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  bannerText:{
    marginLeft:"4em",
    marginTop:"1em",
  }
}));