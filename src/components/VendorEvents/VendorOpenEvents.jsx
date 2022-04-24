import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useCallback } from "react";

import useAlertSnackbar from "../../hooks/useAlertSnackbar";

import useFetchOpenEvents from "../../hooks/useFetchOpenEvents";
import useFetchVendorVerifiedDetails from "../../hooks/useFetchVendorAuth";
import { deleteEvent } from "../../services/events";
import { delay } from "../../utils/dateTime";
import ButtonCapsule from "../ButtonCapsule";
import EventsViewList from "../EventsViewList";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";

export const VendorOpenEvents = ({ vendorId }) => {
  const classes = styles();

  const {
    loading,
    events,
    error,
    moreEvents,
    loadMoreEvents,
    setEvents,
    totalEvents,
  } = useFetchOpenEvents({ userUID: vendorId });
  const { loading: paymentDetailsLoading, verifiedDetails } =
    useFetchVendorVerifiedDetails();
  const { Alert, showAlert } = useAlertSnackbar();

  const handleEventDelete = useCallback(
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

  if (loading || paymentDetailsLoading)
    return (
      <Grid className={classes.root}>
        <PageTitle title="Payorb | Events" />
        <SkeletonLoading message={"Loading events"} />
      </Grid>
    );

  if (error)
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Typography>{error}</Typography>
      </Grid>
    );

  if (events?.length)
    return (
      <Grid className={classes.events}>
        <Typography variant="h6" className={classes.titleContainer} style={{}}>
          Open Events ({totalEvents})
        </Typography>
        <Grid container justifyContent="center">
          <EventsViewList
            showOpen={true}
            events={events}
            handleEventDelete={handleEventDelete}
            paymentDetails={verifiedDetails.find(
              (vd) => vd.name === "paymentDetails"
            )}
          />
        </Grid>
        {moreEvents && (
          <Grid
            item
            container
            sm={12}
            justifyContent="center"
            style={{ padding: "1em 0" }}
          >
            <ButtonCapsule
              text={"Load More"}
              buttonStyle={classes.loadMore}
              onClick={loadMoreEvents}
            />
          </Grid>
        )}
      </Grid>
    );

  return (
    <Grid style={{ padding: "5% 0" }}>
      <Grid container justifyContent="center">
        <img
          src="/assets/vendorEvents/noPastEvents.svg"
          className={classes.imgContainer}
        />
      </Grid>
      <Typography variant="h6" align="center" className={classes.noEventMsg}>
        No past events found. Start creating new events...
      </Typography>
    </Grid>
  );
};

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
  titleContainer: {
    marginBottom: "0.5em",
    fontSize: "1em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
    },
  },
  buttonContainer: {
    display: "flex",
    borderRadius: "3em",
    backgroundColor: "white",
    justifyContent: "flex-stretch",
    border: "2px solid",
    padding: "0.15em",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      margin: "1em 0",
    },
  },
  blue: {
    background: "linear-gradient(180deg, #68FDF3 0%, #00D4FF 219.05%);",
    borderRadius: "2em",
  },
  white: {
    background: "white",
    borderRadius: "2em",
  },
  noEventMsg: {
    fontSize: "1em",
    marginTop: "3em",
    [theme.breakpoints.down("sm")]: {
      bottom: "12em",
    },
  },
  imgContainer: {
    width: "20em",
    [theme.breakpoints.down("sm")]: {
      top: 0,
    },
  },
  root: {
    padding: "2em",
    minHeight: "80vh",
    maxHeight: "max-content",
    [theme.breakpoints.down("sm")]: {
      padding: "5em 0 0 0",
      margin: "0",
    },
  },
  events: {
    minHeight: "70vh",
    maxHeight: "100%",
    [theme.breakpoints.down("sm")]: {
      // paddingLeft: "1em",
    },
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
    // padding: "2em",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "3em",
    },
  },
}));
