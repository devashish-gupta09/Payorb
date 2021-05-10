import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { getMonthDate } from "../../utils/dateTime";

function DateMonth(props) {
  const { startDate, endDate } = props;
  const classes = styles();
  return (
    <Typography className={classes.date}>
      {getMonthDate(startDate, endDate)}
    </Typography>
  );
}

const styles = makeStyles((theme) => ({
  date: {
    fontSize: "1.2em",
    fontWeight: "500",
  },
}));

export default DateMonth;
