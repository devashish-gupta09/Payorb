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
    width: "90%",
    border: "rgb(130,130,130) 2px solid",
    [theme.breakpoints.down("sm")]: {
      width: "inherit",
    },
  },
}));
