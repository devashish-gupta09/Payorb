import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import CustomerEventCard from "../CustomerEventCard";

function CustomerEventsList({ events, expand, trialClass }) {
  const classes = styles();
  return (
    <Grid>
      {trialClass
        ? events
            .filter((e) => e.trialClass)
            .map((event, index) => {
              return (
                <Grid key={index} className={classes.cardContainer}>
                  <CustomerEventCard event={event} expand={expand} />
                </Grid>
              );
            })
        : events
            .filter((e) => !e.trialClass)
            .map((event, index) => {
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
