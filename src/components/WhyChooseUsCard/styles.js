import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    position: "relative",
    // border: "2px solid",
    // height: "200px",
    // width: "200px",
  },
  profile: {
    position: "absolute",
    top: "-2em",
    left: "0em",
    [theme.breakpoints.down("sm")]: {
      left: "0.5em",
    },
  },
  card: {
    backgroundColor: "#fff",
    border: "3px solid #00D4FF",
    borderRadius: "10px",
    margin: "1em",
    padding: "2em 2em 1em 6em",
    minHeight: "250px",
    maxHeight: "fit-content",
    [theme.breakpoints.down("sm")]: {
      // margin: "2em",
      padding: "2em 1em 1em 2em",
      width: "85%",
    },
  },
  name: {
    fontWeight: "bold",
    paddingBottom: "0.5em",
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.5em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
      paddingLeft: "3em",
    },
  },
  description: {
    fontSize: "0.9em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85em",
      paddingTop: "1em",
    },
  },
  profileImg: {
    border: "3px solid rgba(0, 212, 255, 1)",
    borderRadius: "50%",
    objectFit: "cover",
    height: "6em",
    width: "6em",
  },
}));
