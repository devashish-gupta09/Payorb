import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  textContainer: {
    position: "absolute",
    top: "40%",
    left: "10%",
    [theme.breakpoints.down("sm")]: {
      top: "15%",
      left: 0,
      paddingLeft: "1em",
    },
  },
  titleSection: {
    color: "white",
    fontWeight: "bolder",
  },
  aquaText: {
    color: "aqua",
  },
  descriptionText: {
    color: "white",
    fontWeight: "bold",
    width: "60%",
    textJustify: "auto",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  buttonSpacing: {
    padding: "0 1.5em",
  },
  capsuleButton: {
    background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%)",
    borderRadius: "2em",
    fontWeight: "bold",
    marginTop: "1.6em",
    padding: "0.5em 1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.5em",
    },
  },
}));
