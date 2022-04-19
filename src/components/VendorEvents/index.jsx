import {
  Button,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import CallMadeIcon from "@material-ui/icons/CallMade";
import { useRouter } from "next/router";

import React from "react";

import { globalStyles } from "../../../styles/globalStyles";

import useAlertSnackbar from "../../hooks/useAlertSnackbar";

import { buildVendorDashboardUrl } from "../../utils/url";
import ButtonCapsule from "../ButtonCapsule";
import PageTitle from "../PageTitle";

import VendorEventsCalenderView from "../VendorEventsCalenderView";
import { VendorCloseEvents } from "./VendorCloseEvents";
import { VendorOpenEvents } from "./VendorOpenEvents";

function VendorEvents() {
  const globalClasses = globalStyles();
  const classes = styles();

  const [listView, setListView] = React.useState(true);
  const [buttonColorOpen, setButtonColorOpen] = React.useState(classes.blue);
  const [buttonColorClosed, setButtonColorClosed] = React.useState(
    classes.white
  );

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

  const { vendorId } = router.query;

  const btnCompleted = () => {
    setButtonColorOpen(classes.white);
    setButtonColorClosed(classes.blue);
  };

  const btnOpen = () => {
    setButtonColorOpen(classes.blue);
    setButtonColorClosed(classes.white);
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

  // const handleEventDelete = React.useCallback(
  //   async (eventId) => {
  //     try {
  //       const res = await deleteEvent(eventId);
  //       if (res.success) {
  //         showAlert("Event deleted.");
  //         await delay(300);
  //         setEvents([...events.filter((event) => event.link !== eventId)]);
  //       }
  //     } catch (err) {
  //       showAlert(err?.error || err?.message);
  //     }
  //   },
  //   [events]
  // );

  return (
    <Grid className={classes.root}>
      <PageTitle title="Payorb | Events" />
      {Alert()}

      <Grid container>
        {desktop && (
          <div
            style={{
              display: "flex",
              flowDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
              maxHeight: "2.5em",
            }}
          >
            <Button
              style={{
                background: "#EFEFEF",
                padding: "0.5em 1em",
                borderRadius: "2em",
                marginRight: "1em",
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

        <Grid container justifyContent={"center"} style={{ padding: "1em 0" }}>
          <Grid className={classes.buttonContainer}>
            <Button
              className={buttonColorOpen}
              value={"open"}
              onClick={btnOpen}
              style={{
                padding: "0.5em 1.5em",
              }}
            >
              Open
            </Button>
            <Button
              className={buttonColorClosed}
              value={"completed"}
              onClick={btnCompleted}
              style={{
                padding: "0.5em 1.5em",
              }}
            >
              Completed
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {listView ? (
        <Grid className={classes.container}>
          <div>
            {buttonColorOpen == classes.blue ? (
              <VendorOpenEvents vendorId={vendorId} />
            ) : (
              <VendorCloseEvents vendorId={vendorId} />
            )}
          </div>
        </Grid>
      ) : (
        <VendorEventsCalenderView />
      )}

      {!desktop && (
        <Grid container justify="center" alignItems="center">
          <Grid className={classes.createEventCard}>
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
          </Grid>
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
      paddingLeft: "1em",
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
  createEventCard: {
    padding: "1em",
    width: "100%",
    marginTop: "2em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      position: "fixed",
      bottom: -8,
      borderRadius: "0",
      padding: 0,
      margin: 0,
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
