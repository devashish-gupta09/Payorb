import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    padding: "4em 2em 4em 6em",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      padding: "2em 1em",
    },
  },
  image: {
    width: "50em",
    border: "rgb(130, 130, 130) 2px solid",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1em",
      width: "inherit",
    },
  },
}));
