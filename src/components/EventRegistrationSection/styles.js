import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    padding: "8em 2em 10em 6em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  image: {
    width: "50em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1em",
      width: "inherit",
    },
  },
}));
