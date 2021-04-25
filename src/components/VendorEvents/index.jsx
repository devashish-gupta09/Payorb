import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { EVENT_VIEWS } from "../../constants/events";
import { PAGE_PATHS } from "../../constants/paths";
import { getEventsVendorDashboard } from "../../services/events";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EventsViewList from "../EventsViewList";

import Skeleton from "react-loading-skeleton";

const delay = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

function VendorEvents() {
  const classes = styles();
  const [view, setView] = React.useState(EVENT_VIEWS.LIST);
  const [events, setEvents] = React.useState();
  const [eventsParams, setEventsParams] = React.useState({
    limit: 5,
    orderBy: "createdDate",
    orderType: "desc",
    startFrom: 0,
  });
  const [loadMore, setLoadMore] = React.useState(true);
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push(PAGE_PATHS.VENDOR_DASHBOARD_CREATE_EVENT);
  };

  const loadMoreEvents = async () => {
    try {
      const res = await getEventsVendorDashboard({
        ...eventsParams,
        startFrom: eventsParams.startFrom + eventsParams.limit,
      });
      if (res.data.length > 0) {
        setEventsParams({
          ...eventsParams,
          startFrom: eventsParams.startFrom + eventsParams.limit,
        });
        setEvents([...events, ...res.data]);
      } else {
        setLoadMore(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  React.useEffect(() => {
    getEventsVendorDashboard(eventsParams)
      .then(async (res) => {
        if (res.data) {
          await delay(50);
          setEvents(res.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <Grid className={classes.root}>
      {events ? (
        <>
          {events.length > 0 ? (
            <>
              <Grid className={classes.events}>
                {view === EVENT_VIEWS.LIST ? (
                  <EventsViewList events={events} />
                ) : null}
              </Grid>

              <Grid
                style={{ marginBottom: "1em" }}
                container
                alignItems="center"
                justify="center"
              >
                {loadMore ? (
                  <Button onClick={loadMoreEvents}>Load more</Button>
                ) : (
                  <Typography>All events loaded. </Typography>
                )}
              </Grid>
            </>
          ) : (
            <Typography>No events found</Typography>
          )}
        </>
      ) : (
        <DashboardCard rootClass={classes.skeleton}>
          <h3>Loading Events</h3>
          <Skeleton count={5} />
        </DashboardCard>
      )}

      <Grid container justify="center" alignItems="center">
        <DashboardCard rootClass={classes.createEventCard}>
          <Grid container justify="center" alignItems="center">
            <ButtonCapsule
              text="Create New Event"
              buttonStyle={classes.createEventButton}
              onClick={handleCreateEvent}
            />
          </Grid>
        </DashboardCard>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    padding: "1em 0",
    minHeight: "80vh",
    maxHeight: "max-content",
  },
  events: {
    minHeight: "70vh",
    maxHeight: "max-content",
  },
  createEvent: {
    height: "min-content",
  },
  createEventCard: {
    padding: "1em",
    width: "75vw",
    marginTop: "2em",
  },
  createEventButton: {
    width: "25%",
    padding: "0.75em 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  skeleton: {
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      width: "90vw",
      height: "80vh",
    },
    width: "80vw",
    height: "fit-content",
  },
}));

export default VendorEvents;
