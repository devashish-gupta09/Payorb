import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    background:"#2C2C2C",
    padding: "4em 6em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  title:{
    textAlign:"center",
    justifyContent:"center",
    color:"white",
  },
  capsuleButton: {
    background: "linear-gradient(178.83deg, #68FDF3 1%, #00D4FF 183.74%)",
    borderRadius: "2em",
    fontWeight: "bold",
    marginTop: "1.2em",
    padding: "1em 2em",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
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
