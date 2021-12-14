import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Add, DateRange, List } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";

import Skeleton from "react-loading-skeleton";
import { globalStyles } from "../../../styles/globalStyles";

import useAlertSnackbar from "../../hooks/useAlertSnackbar";

import { deleteEvent, getEventsVendorDashboard } from "../../services/events";
import { delay } from "../../utils/dateTime";
import { buildVendorDashboardUrl } from "../../utils/url";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EventsViewList from "../EventsViewList";
import PageTitle from "../PageTitle";

import VendorEventsCalenderView from "../VendorEventsCalenderView";

function VendorEvents() {
  const globalClasses = globalStyles();
  const classes = styles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [listView, setListView] = React.useState(true);
  const [events, setEvents] = React.useState();
  const [eventsParams, setEventsParams] = React.useState({
    limit: 5,
    orderBy: "createdDate",
    orderType: "desc",
    startFrom: 0,
  });
  const [loadMore, setLoadMore] = React.useState(true);
  const router = useRouter();

  const handleCreateEvent = (trialClass) => {
    if (trialClass) {
      router.push(
        buildVendorDashboardUrl(
          router.query.vendorId,
          "/events/create?trialClass=true"
        )
      );
    } else {
      router.push(
        buildVendorDashboardUrl(router.query.vendorId, "/events/create")
      );
    }
  };

  const { Alert, showAlert } = useAlertSnackbar();

  const toggleView = () => {
    setListView(!listView);
  };

  const loadMoreEvents = async () => {
    try {
      const res = await getEventsVendorDashboard({
        ...eventsParams,
        startFrom: eventsParams.startFrom,
      });
      if (res.data.events.length > 0) {
        setEventsParams({
          ...eventsParams,
          startFrom: res.data.lastEvent,
        });
        setEvents([...events, ...res.data.events]);
      } else {
        setLoadMore(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleEventDelete = React.useCallback(
    async (eventId) => {
      try {
        const res = await deleteEvent(eventId);
        if (res.success) {
          showAlert("Event deleted.");
          await delay(300);
          setEvents([...events.filter((event) => event.link !== eventId)]);
        }
      } catch (err) {
        showAlert(err?.error || err?.message);
      }
    },
    [events]
  );

  React.useEffect(() => {
    getEventsVendorDashboard(eventsParams)
      .then(async (res) => {
        if (res.success) {
          if (res.data) {
            await delay(50);
            setEvents(res.data.events);
            setEventsParams({
              ...eventsParams,
              startFrom: res.data.lastEvent,
            });
          }
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <Grid className={classes.root}>
      <PageTitle title="Payorb | Events" />
      {Alert()}
      <Grid container justify="space-between" style={{ padding: "1em 0px" }}>
        <Button onClick={toggleView}>
          {!listView ? <List /> : <DateRange />}
        </Button>
        {desktop && (
          <div style={{ display: "flex" }}>
            <Button
              style={{
                background: "white",
                padding: "0.5em 1.5em",
                borderRadius: "10px",
                marginLeft: "1em",
              }}
              onClick={() => handleCreateEvent(false)}
            >
              Create Event
            </Button>
            <Button
              style={{
                marginLeft: "1em",
                background: "white",
                padding: "0.5em 1.5em",
                borderRadius: "10px",
              }}
              onClick={() => handleCreateEvent(true)}
            >
              Create Trial Event
            </Button>
          </div>
        )}
      </Grid>
      {listView ? (
        events ? (
          <Grid className={classes.container}>
            {events.length > 0 ? (
              <>
                <Grid className={classes.events}>
                  <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
                    Open Events
                  </Typography>
                  <EventsViewList
                    showOpen={true}
                    events={events}
                    handleEventDelete={handleEventDelete}
                  />

                  <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
                    Completed Events
                  </Typography>
                  <EventsViewList
                    showOpen={false}
                    events={events}
                    handleEventDelete={handleEventDelete}
                  />
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
              <Typography variant="h5">
                No past events found. Start creating new events...
              </Typography>
            )}
          </Grid>
        ) : (
          <DashboardCard rootClass={classes.skeleton}>
            <h3>Loading Events</h3>
            <Skeleton count={5} />
          </DashboardCard>
        )
      ) : (
        <VendorEventsCalenderView />
      )}

      {!desktop && (
        <Grid container justify="center" alignItems="center">
          <DashboardCard rootClass={classes.createEventCard}>
            <Grid container justify="center" alignItems="center">
              <ButtonCapsule
                text="Create New Event"
                buttonStyle={classes.createEventButton}
                onClick={() => handleCreateEvent(false)}
              />
              <ButtonCapsule
                buttonStyle={classes.createEventButton}
                onClick={() => handleCreateEvent(true)}
                text="Create Trial Event"
              ></ButtonCapsule>
            </Grid>
          </DashboardCard>
        </Grid>
      )}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    padding: "1em 0",
    minHeight: "80vh",
    maxHeight: "max-content",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  events: {
    minHeight: "70vh",
    maxHeight: "100%",
  },
  createEvent: {
    height: "min-content",
  },
  createEventCardContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
    },
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "3em",
    },
  },
  createEventCard: {
    padding: "1em",
    width: "100%",
    marginTop: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      position: "fixed",
      bottom: "0",
      borderRadius: "0",
    },
  },
  createEventButton: {
    width: "25%",
    padding: "0.75em 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginBottom: "0.5em",
  },
  skeleton: {
    padding: "2em",
    margin: "2em 0",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      width: "90vw",
      height: "80vh",
    },
    height: "fit-content",
  },
  editButton: {
    padding: "0.5em 3em",
    marginRight: "0.3em",
    border: "1px solid grey",
  },
}));

export default VendorEvents;
