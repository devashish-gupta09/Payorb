import { makeStyles } from "@material-ui/core";

import { ALERT_BANNER_TYPES } from "../../constants/alerts";

export const styles = makeStyles((theme) => ({
  container: {
    // width: "100vw",
    minWidth: "100%",
    maxWidth: "95vw",
    // background: "linear-gradient(115.52deg, #BDF5F2 0%, #79DFDF 100%);",
    minHeight: "90vh",
    maxHeight: "max-content",
    // [theme.breakpoints.down("sm")]: {
    //   padding: "1em 1em",
    // },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "2em 2em",
    },
    // [theme.breakpoints.up("xl")]: {
    //   minHeight: "95vh",
    //   padding: "2em 20em",
    //   width: "fit-content",
    // },
  },
  [ALERT_BANNER_TYPES.WARNING]: {
    paddingTop: "5em !important",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em !important",
    },
  },
  [ALERT_BANNER_TYPES.CONFIRMATION]: {
    paddingTop: "5em !important",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em !important",
    },
  },
}));
