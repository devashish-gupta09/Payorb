import { makeStyles } from "@material-ui/core";

import { ALERT_BANNER_TYPES } from "../../constants/alerts";

export const styles = makeStyles((theme) => ({
  container: {
    // minWidth: "100%",
    width: "100%",
    minHeight: "fit-content",
    maxHeight: "max-content",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      // padding: "2em 2em",
    },
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
