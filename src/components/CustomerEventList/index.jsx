import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import CustomerEventCard from "../CustomerEventCard";

function CustomerEventsList({ events, expand }) {
  const classes = styles();
  return (
    <Grid>
      {events.map((event, index) => {
        return (
          <Grid key={index} className={classes.cardContainer}>
            <CustomerEventCard event={event} expand={expand} />
          </Grid>
        );
      })}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  cardContainer: {
    margin: "1.5em 0",
  },
}));

export default CustomerEventsList;
