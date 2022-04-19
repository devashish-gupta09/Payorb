import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import EventCard from "../EventCard";

function EventsViewList({
  events,
  handleEventDelete,
  // showOpen,
  paymentDetails = {},
}) {
  const classes = styles();

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="flex-start"
      spacing={3}
    >
      {events.map((event, index) => {
        return (
          <Grid
            key={index}
            item
            sm={12}
            md={6}
            xl={4}
            style={{
              width: "100%",
            }}
          >
            <EventCard
              event={event}
              handleEventDelete={handleEventDelete}
              paymentDetails={paymentDetails}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    height: "100%",
    //paddingBottom: "2em",
    padding: "2em 0em",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "1em 0",
    },
  },
}));

export default EventsViewList;
