import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    height: "calc(100vh - 88px)",
  },
  header: {
    height: "calc(10vh)",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
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
    paddingTop: "15em",
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
}));
