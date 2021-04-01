import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    flex: 1,
    borderRadius: "0.75em",
    padding: "2em 1em 1em 1em",
    boxShadow: "0px 1em 2em rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "50vh",
    },
  },
  logo: {
    padding: "4em 0",
  },
  sectionTitle: {
    paddingTop: "1.5em",
    color: "#828282",
    letterSpacing: "4%",
    textTransform: "uppercase",
  },
  title: {
    padding: "0.2em 1em 0 0",
    fontWeight: "bold",
    color: "#333333",
  },
  description: {
    fontSize: "1em",
    textAlign: "center",
    padding: "0.5em 3em 1em 3em",
    color: "#828282",
  },
}));
