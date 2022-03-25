import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import { isEventPastDate } from "../../utils/events";

import EventCard from "../EventCard";

function EventsViewList({ events, handleEventDelete, showOpen }) {
  const classes = styles();

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="flex-start"
      spacing={3}
    >
      {showOpen ? (
        events.filter((e) => !isEventPastDate(e)).length ? (
          events
            .filter((e) => !isEventPastDate(e))
            .map((event, index) => {
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
                  />
                </Grid>
              );
            })
        ) : (
          <Grid
            style={{ marginBottom: "1em" }}
            container
            alignItems="center"
            justify="center"
          >
            <Typography>No Open events found...</Typography>
          </Grid>
        )
      ) : events.filter((e) => isEventPastDate(e)).length ? (
        events
          .filter((e) => isEventPastDate(e))
          .map((event, index) => {
            return (
              <Grid
                key={index}
                item
                sm={12}
                md={6}
                xl={4}
                style={{
                  padding: "1em",
                  width: "100%",
                }}
              >
                <EventCard
                  event={event}
                  handleEventDelete={handleEventDelete}
                />
              </Grid>
            );
          })
      ) : (
        <Grid
          style={{ marginBottom: "1em" }}
          container
          alignItems="center"
          justify="center"
        >
          <Typography>No Completed events found...</Typography>
        </Grid>
      )}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    height: "100%",
    //paddingBottom: "2em",
    padding: "2em 1em",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      padding: "1em 0",
    },
  },
}));

export default EventsViewList;
