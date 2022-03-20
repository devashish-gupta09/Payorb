import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { isEventPastDate } from "../../utils/events";
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
import CallMadeIcon from "@material-ui/icons/CallMade";

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

  const [buttonColorOpen, setOpen] = React.useState(classes.blue);
  const [buttonColorClosed, setClosed] = React.useState(classes.white);
  const btnCompleted = () => {
    setOpen(classes.white);
    setClosed(classes.blue);
  };
  const btnOpen = () => {
    setOpen(classes.blue);
    setClosed(classes.white);
  };

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

      <Grid container justify={"flex-end"} style={{ padding: "1em 0px" }}>
        {/* {<Button onClick={toggleView}>
          {!listView ? <List /> : <DateRange />}
        </Button>} */}
        <Grid
          container
          justifyContent={"center"}
          className={classes.buttonContainer}
          justify={"space-evenly"}
        >
          <Button className={buttonColorOpen} value={"open"} onClick={btnOpen}>
            Open
          </Button>
          <Button
            className={buttonColorClosed}
            value={"completed"}
            onClick={btnCompleted}
          >
            Completed
          </Button>
        </Grid>

        {desktop && (
          <div style={{ display: "flex", maxHeight: "2.5em" }}>
            <Button
              style={{
                background: "#EFEFEF",
                padding: "0.5em 1em",
                borderRadius: "2em",
                marginRight: "0.2em",
              }}
              onClick={() => handleCreateEvent(true)}
            >
              Create Trial Event <CallMadeIcon />
            </Button>
            <Button
              className={classes.createAnEvent}
              onClick={() => handleCreateEvent(false)}
            >
              Create an Event <CallMadeIcon />
            </Button>
          </div>
        )}
      </Grid>
      {listView ? (
        events ? (
          <Grid className={classes.container}>
            {events.length > 0 ? (
              <div style={!desktop ? { paddingBottom: "13vh" } : {}}>
                {buttonColorOpen == classes.blue ? (
                  <Grid className={classes.events}>
                    <Typography
                      variant="h6"
                      style={{
                        marginBottom: "0.5em",
                        fontSize: "1em",
                        marginLeft: "1em",
                      }}
                    >
                      Open Events (
                      {events.filter((e) => !isEventPastDate(e)).length})
                    </Typography>
                    <EventsViewList
                      showOpen={true}
                      events={events}
                      handleEventDelete={handleEventDelete}
                    />
                  </Grid>
                ) : (
                  <Grid className={classes.events}>
                    <Typography
                      variant="h6"
                      style={{
                        marginBottom: "0.5em",
                        marginLeft: "1em",
                        fontSize: "1em",
                      }}
                    >
                      Completed Events (
                      {events.filter((e) => isEventPastDate(e)).length})
                    </Typography>
                    <EventsViewList
                      showOpen={false}
                      events={events}
                      handleEventDelete={handleEventDelete}
                    />
                  </Grid>
                )}

                <Grid
                  style={{ marginBottom: "1em" }}
                  container
                  alignItems="center"
                  justify="center"
                >
                  {loadMore ? (
                    <Button onClick={loadMoreEvents}>Load more</Button>
                  ) : (
                    <Typography>All events loaded</Typography>
                  )}
                </Grid>
              </div>
            ) : (
              <Grid container justifyContent="center" alignItems="center">
                <img
                  src="/assets/vendorEvents/noPastEvents.svg"
                  className={classes.imgContainer}
                />
                <Typography variant="h6" className={classes.noEventMsg}>
                  No past events found. Start creating new events...
                </Typography>
              </Grid>
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
              <Grid item xs={6}>
                <ButtonCapsule
                  text="CREATE AN EVENT"
                  buttonStyle={classes.createEventButton}
                  onClick={() => handleCreateEvent(false)}
                />
              </Grid>
              <Grid item xs={6}>
                <ButtonCapsule
                  buttonStyle={`${classes.createEventButton} ${classes.greyColor}`}
                  onClick={() => handleCreateEvent(true)}
                  text="CREATE TRIAL EVENT"
                ></ButtonCapsule>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      )}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  greyColor: {
    background: "#EFEFEF",
  },
  createAnEvent: {
    padding: "0.5em 1em",
    fontSize: "0.9em",
    background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 219.05%);",
    borderRadius: "2em",
    right: "0",
  },
  buttonContainer: {
    display: "flex",
    width: "14em",
    color: "black",
    height: "2.3em",
    borderRadius: "3em",
    backgroundColor: "white",
    border: "solid",
    borderWidth: "0.08em",
    marginRight: "7.5em",
    marginTop: "3em",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginRight: "5em",
    },
  },
  blue: {
    fontSize: "0.9em",
    background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 219.05%);",
    padding: "0.10em 1.44em",
    borderRadius: "2em",
    marginBottom: "0.2em",
  },
  white: {
    padding: "0.5em 1.9em",
    borderRadius: "2em",
  },
  noEventMsg: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "1em",
    bottom: "6em",
    [theme.breakpoints.down("sm")]: {
      bottom: "12em",
    },
  },
  root: {
    padding: "1em 2em",
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
    borderRadius: "0",
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
  imgContainer: {
    position: "absolute",
    margin: "auto",
    top: "6em",
    left: 0,
    right: 0,
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      top: 0,
    },
  },
}));

export default VendorEvents;
