import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { defaultEvents, EVENT_VIEWS } from "../../constants/events";
import { PAGE_PATHS } from "../../constants/paths";
import { getEventsVendorDashboard } from "../../services/events";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EventsViewList from "../EventsViewList";

import Skeleton from "react-loading-skeleton";

function VendorEvents() {
  const classes = styles();
  const [view, setView] = React.useState(EVENT_VIEWS.LIST);
  const [events, setEvents] = React.useState([]);
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
      .then((res) => {
        if (res.data.length > 0) {
          setEvents(res.data);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <Grid className={classes.root}>
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

          <DashboardCard rootClass={classes.createEventCard}>
            <Grid container justify="center" alignItems="center">
              <ButtonCapsule
                text="Create New Event"
                buttonStyle={classes.createEventButton}
                onClick={handleCreateEvent}
              />
            </Grid>
          </DashboardCard>
        </>
      ) : (
        <DashboardCard rootClass={classes.skeleton}>
          <Skeleton count={5} />
        </DashboardCard>
      )}
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
  },
  createEventButton: {
    width: "25%",
    padding: "0.75em 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  skeleton: {
    width: "100%",
    height: "400px",
  },
}));

export default VendorEvents;
