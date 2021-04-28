import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import CustomerEventCard from "../CustomerEventCard";

function CustomerEventsList({ events }) {
  const classes = styles();
  return (
    <Grid>
      {events.map((event) => {
        return (
          <Grid className={classes.cardContainer}>
            <CustomerEventCard event={event} />
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
