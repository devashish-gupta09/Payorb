import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    height: "calc(100vh - 88px)",
  },
  drawer: {
    height: "600px",
  },
  wideScreen: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  mobile: {
    display: "None",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      position: "absolute",
    },
  },
  header: {
    height: "calc(10vh)",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  avatar: {
    display: "block",
    margin: "0 auto",
    border: "1em solid white",
    width: "12em",
    height: "12em",
    borderRadius: "50%",
  },
  name: {
    fontWeight: "500",
  },
  content: {
    height: "calc(90vh)",
    background: "#F6F6FA",
    paddingTop: "16em",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "None",
    },
  },
  activeTab: {
    textAlign: "left",
  },
  btn: {
    maxWidth: "100%",
    textAlign: "left",
    padding: "1em",
  },
  activeLink: {
    background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 183.33%)",
    maxWidth: "100%",
    padding: "1em",
    color: "#000000",
  },
  navItem: {
    width: "100%",
    textAlign: "left",
  },
}));
