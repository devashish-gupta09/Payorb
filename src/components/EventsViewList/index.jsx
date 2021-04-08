import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import EventCard from "../EventCard";

function EventsViewList({ events }) {
  const classes = styles();
  return (
    <Grid container className={classes.root} spacing={4}>
      {events.map((event, index) => {
        return (
          <Grid key={index} item sm={12}>
            <EventCard event={event} />
          </Grid>
        );
      })}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    height: "100%",
    paddingBottom: "2em",
  },
}));

export default EventsViewList;
