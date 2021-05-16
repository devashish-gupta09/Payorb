import { makeStyles, Snackbar, Typography } from "@material-ui/core";
import React from "react";

import { ALERT_TYPES } from "../../constants/alerts";

function AlertSnackbar({
  showSnackbar,
  message,
  handleClose,
  type = ALERT_TYPES.MESSAGE,
}) {
  const classes = styles({ type });
  return (
    <Snackbar
      className={classes.snackbar}
      open={showSnackbar}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Typography>{message}</Typography>
    </Snackbar>
  );
}

const styles = makeStyles(() => ({
  snackbar: {
    padding: "1em 4em",
    background: ({ type }) =>
      type === ALERT_TYPES.MESSAGE ? "#BDF5F2" : "#ffa494",
  },
}));

export default AlertSnackbar;
