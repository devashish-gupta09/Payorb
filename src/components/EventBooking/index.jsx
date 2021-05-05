import { Grid, makeStyles, Typography } from "@material-ui/core";
import {
  CalendarToday,
  ConfirmationNumber,
  ContactSupportOutlined,
  LocationOn,
  Money,
  ViewModule,
} from "@material-ui/icons";

import React from "react";
import Skeleton from "react-loading-skeleton";
import { globalStyles } from "../../../styles/globalStyles";
import { getEventPublic } from "../../services/events";
import DashboardCard from "../DashboardCard";
import DetailRow from "../DetailRow";
import EventBookingForm from "../EventBookingForm";
import EventBookingVendorCard from "../EventBookingVendorCard";

const eventRows = [
  {
    icon: <Money />,
    key: "price",
  },
  {
    icon: <ConfirmationNumber />,
    key: "bookedSeats",
  },
  {
    icon: <ViewModule />,
    key: "category",
  },
  {
    icon: <CalendarToday />,
    key: "startDate",
  },
  {
    icon: <LocationOn />,
    key: "location",
  },
];

function EventBooking({ eventLink }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const [event, setEvent] = React.useState();

  React.useEffect(() => {
    // API call to get event details
    getEventPublic(eventLink)
      .then((res) => {
        if (res.data.event) {
          setEvent(res.data.event);
        } else {
          throw new Error("Error fetching event");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <Grid style={{ width: "100%" }}>
      {event ? (
        <Grid
          container
          className={classes.root}
          spacing={3}
          alignItems={"flex-start"}
        >
          <Grid item container sm={9} spacing={3}>
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard rootClass={classes.cardPadding}>
                <Typography variant={"h3"}>{event.name}</Typography>
                <Typography>{event.mode}</Typography>
              </DashboardCard>
            </Grid>
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard rootClass={classes.cardPadding}>
                <Grid className={classes.eventDetails}>
                  {eventRows.map((row) => {
                    return (
                      <DetailRow classes={classes} icon={row.icon}>
                        <Typography>{event[row.key]}</Typography>
                      </DetailRow>
                    );
                  })}
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard
                rootClass={`${classes.posterRoot}`}
              >
                <img
                  src="https://i.pinimg.com/736x/59/59/88/5959880ca0cb6b30926091b7bc251812.jpg"
                  className={classes.eventPoster}
                />
                <Grid container>
                  <Grid className={classes.eventDescription}>
                    <Typography
                      className={globalClasses.bold}
                      variant="h5"
                      gutterBottom
                    >
                      Event Description
                    </Typography>
                    <Typography paragraph>{event.description}</Typography>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          </Grid>
          <Grid item container sm={3} spacing={3}>
            <Grid item sm={12}>
              <DashboardCard
                rootClass={`${classes.formContainer}`}
              >
                <Typography
                  className={globalClasses.bold}
                  variant="h5"
                  gutterBottom
                >
                  Register
                </Typography>
                <EventBookingForm eventLink={event.link} price={event.price} />
              </DashboardCard>
            </Grid>

            <Grid item sm={12} className={`${classes.vendorCardContainer}`}>
              <DashboardCard
                rootClass={`${classes.vendorCard}`}
              >
                <EventBookingVendorCard vendorId={event.userUID} />
              </DashboardCard>
            </Grid>
            {/* <EventBookVendorSection vendor={vendor} /> */}
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root}>
          <Grid item container sm={9}>
            <Grid item sm={12}>
              <Skeleton count={4} />
            </Grid>
            <Grid item sm={12}>
              <Skeleton count={6} />
            </Grid>
            <Grid item={12}>
              <Skeleton count={5} />
            </Grid>
          </Grid>
          <Grid item container sm={3}>
            <Skeleton count={5} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: "0.5em",
    },
  },
  logo: {
    paddingRight: "0.75em",
    color: "rgba(121, 223, 223, 1)",
  },
  eventDetails: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  eventPoster: {
    width: "100%",
  },
  posterRoot: {
    padding: 0,
    borderRadius: "5px",
  },
  fullWidth: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  eventDescription: {
    padding: "2em",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em 1em 1em",
    },
  },
  formContainer: {
    height: "fit-content",
    padding: "1em",
  },
  vendorCardContainer: {
    width: "100%",
  },
  vendorCard: {
    padding: "1em",
  },
  cardPadding: {
    padding: "1em",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 0.5em 1em 0.5em",
    },
  },
}));

export default EventBooking;
