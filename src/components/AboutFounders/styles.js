import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background: "url(/assets/aboutUs/FounderBg.svg)",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
  founderContainer: {
    marginTop: "2em",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  founderName: {
    fontSize: "1.3em",
    fontWeight: "bolder",
  },
  founderTitle: {
    fontSize: "1em",
    fontWeight: "300",
  },
  founder: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "1.3em",
    },
  },
  img: {
    borderRadius: "50%",
    border: "3px solid #00D4FF",
    width: "15em",
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
