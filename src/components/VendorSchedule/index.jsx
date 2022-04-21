import { Grid, makeStyles, Typography } from "@material-ui/core";

import VendorEventsCalenderView from "../VendorEventsCalenderView";

export const VendorSchedule = () => {
  const classes = styles();
  return (
    <Grid className={classes.root}>
      <Typography variant={"h6"} className={classes.scheduleTitle}>
        Promotions
      </Typography>
      <VendorEventsCalenderView />
    </Grid>
  );
};

const styles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
  scheduleTitle: {
    fontWeight: "bold",
    paddingBottom: "1em",
  },
}));
