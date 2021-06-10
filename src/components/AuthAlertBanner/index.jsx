import { AppBar, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { ALERT_BANNER_TYPES } from "../../constants/alerts";

import {
  useFetchUserAuthDetails,
  useUserAuthDetails,
} from "../../context/UserAuthDetailContext";
import { getMessageForDetails } from "../../utils/vendor";

function AuthAlertBanner() {
  const classes = styles();

  const { state, dispatch } = useUserAuthDetails();

  React.useEffect(() => {
    if (!state) {
      useFetchUserAuthDetails(dispatch);
    }
  }, []);

  if (state && state.details) {
    const details = getMessageForDetails(state.details);

    if (details) {
      return (
        <AppBar
          className={`${classes.root} ${classes[details.type]}`}
          position={"fixed"}
        >
          <Typography className={classes.message}>{details.msg}</Typography>
        </AppBar>
      );
    }
  }

  return null;
}

const styles = makeStyles((theme) => ({
  root: {
    marginTop: "4.5em",
    padding: "1em 2em",
  },
  [ALERT_BANNER_TYPES.WARNING]: {
    background: "#ffd84a",
  },
  [ALERT_BANNER_TYPES.CONFIRMATION]: {
    background: "#00DDBC",
  },
  message: {
    fontWeight: "bold",
    color: "black",
  },
}));

export default AuthAlertBanner;
