import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  bg: {
    paddingBottom: "1em",
    background: "url(/assets/howItWorksBG.svg) no-repeat center center",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2em",
      background: "linear-gradient(185.16deg, #BCF4F1 4.14%, #00D4FF 288.3%)",
    },
  },
  container: {
    height: "100vh",
    maxHeight: "fit-content",
    padding: "4em 0 10em 0em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  heading: {
    fontSize: "40px",
    fontWeight: "600",
    color: "#000000",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
  },
  box: {
    width: "50vw",
    height: "50vh",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "2em auto",
    position: "relative",
    // boxShadow: "0 0 2px 4px rgba(0, 212, 255, 1)",
    "& > div": {
      display: (props) => (props === true ? "none" : "flex"),
    },
    "&:hover": {
      "& > div": {
        display: "flex",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "fit-content",
      margin: "0 auto",
      paddingBottom: "3em",
      boxShadow: "none",
    },
  },
  videoActions: {
    transform: "scale(3)",
    color: "white",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      transform: "scale(1.5)",
    },
  },
  videoActionContainer: {
    padding: "2em",
    background:
      "linear-gradient(to right, rgba(104, 253, 243, 1), rgba(0, 212, 255, 1))",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  videoImg: {
    width: "100%",
    height: "100%",
    padding: "0 auto",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2em",
    },
  },
  actionButtonContainer: {
    width: "fit-content",
    height: "fit-content",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
}));
