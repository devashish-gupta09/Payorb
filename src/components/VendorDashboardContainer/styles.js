import { makeStyles } from "@material-ui/core";

export const styles = makeStyles((theme) => ({
  container: {
    padding: "2em 10em",
    // width: "100vw",
    minWidth: "100%",
    maxWidth: "95vw",
    background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%);",
    minHeight: "90vh",
    maxHeight: "max-content",
    [theme.breakpoints.down("sm")]: {
      padding: "2em 1em",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "2em 2em",
    },
    [theme.breakpoints.up("xl")]: {
      minHeight: "95vh",
      padding: "2em 20em",
      width: "fit-content",
    },
  },
}));
