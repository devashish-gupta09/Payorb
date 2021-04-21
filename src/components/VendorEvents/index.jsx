import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { defaultEvents, EVENT_VIEWS } from "../../constants/events";
import { PAGE_PATHS } from "../../constants/paths";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import EventsViewList from "../EventsViewList";

function VendorEvents() {
  const classes = styles();
  const [view, setView] = React.useState(EVENT_VIEWS.LIST);
  const router = useRouter();
  const handleCreateEvent = () => {
    router.push(PAGE_PATHS.VENDOR_DASHBOARD_CREATE_EVENT);
  };
  // const toggleView = () => {
  //   if (view === EVENT_VIEWS.LIST) {
  //     setView(EVENT_VIEWS.CALENDER);
  //   } else {
  //     setView(EVENT_VIEWS.LIST);
  //   }
  // };

  return (
    <Grid className={classes.root}>
      <Grid className={classes.events}>
        {view === EVENT_VIEWS.LIST ? (
          <EventsViewList events={defaultEvents} />
        ) : null}
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
}));

export default VendorEvents;
