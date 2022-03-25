import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    padding: "4em 4em 5em 5em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: "2.3em",
  },
  title: {
    color: "#000000",
    alignItems: "center",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      padding: "1em -0.2em",
    },
  },
  advisorContainer: {
    marginTop: "2em",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  advisor: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "1em",
    marginTop: "-8em",
    padding: "9em 1.5em 1.5em 1.5em",
  },
  advisorDescription: {
    fontSize: "1em",
  },
  advisorName: {
    fontSize: "1.3em",
    fontWeight: "bolder",
  },
  advisorTitle: {
    fontWeight: "300",
    marginBottom: "1.5em",
    fontSize: "0.8em",
  },
  advisorCarouselMobile: {
    zIndex: "-1",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  img: {
    opacity: "1",
  },
  divider: {
    color: "#00D4FF",
    backgroundColor: "#00D4FF",
    height: "0.3em",
    width: "7vw",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      color: "black",
      backgroundColor: "black",
      width: "4em",
      height: "0.2em",
    },
  },
}));
