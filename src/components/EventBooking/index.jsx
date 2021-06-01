import { Grid, makeStyles, Typography } from "@material-ui/core";
import {
  CalendarToday,
  ConfirmationNumber,
  LocationOn,
  Money,
  ViewModule,
} from "@material-ui/icons";
import moment from "moment";
import { useRouter } from "next/router";

import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { EVENT_TYPES } from "../../constants/events";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import DashboardCard from "../DashboardCard";
import DetailRow from "../DetailRow";
import EventBookingForm from "../EventBookingForm";
import EventBookingVendorCard from "../EventBookingVendorCard";
import SkeletonLoading from "../SkeletonLoading";

const getEventslotDuration = (startDate, endDate) => {
  if (startDate || endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    return `${getMonthDate(
      startDate,
      endDate
    )} , ${startDate.getFullYear()} | at ${moment(startDate).format(
      "LT"
    )} to ${moment(endDate).format("LT")}`;
  }

  return "";
};

const eventRows = (event, oneOnOneSlot) => [
  {
    icon: <Money />,
    key: "price",
    value: `Rs. ${event.price}`,
  },
  {
    ...(event.type === EVENT_TYPES.ONE_TIME && {
      icon: <ConfirmationNumber />,
      key: "bookedSeats",
      value: `${event.orders.length} ${
        event.type === EVENT_TYPES.ONE_TIME ? `/${event.totalTickets}` : ""
      }`,
    }),
  },
  {
    icon: <ViewModule />,
    key: "category",
    value: event.category,
  },
  {
    icon: <CalendarToday />,
    key: "type",
    value:
      event.type === EVENT_TYPES.ONE_TIME
        ? getEventslotDuration(event.startDate, event.endDate)
        : getEventslotDuration(oneOnOneSlot.startDate, oneOnOneSlot.endDate),
  },
  {
    icon: <LocationOn />,
    key: "location",
    value: event.location,
  },
];

function EventBooking({ eventLink }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();
  const { to, from } = router.query;

  const { loading, events } = useFetchEvents(false, { link: eventLink });

  if (loading) {
    return <SkeletonLoading message={"Loading Event Booking Page"} />;
  }

  if (events && events.length > 0) {
    const event = events[0];

    return (
      <Grid style={{ width: "100%" }}>
        <Grid
          container
          className={classes.root}
          spacing={3}
          alignItems={"flex-start"}
        >
          <Grid
            item
            container
            sm={8}
            spacing={3}
            style={{ width: "100%", margin: 0 }}
          >
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard rootClass={classes.cardPadding}>
                <Typography variant={"h3"}>{event.name}</Typography>
                <Typography gutterBottom="true">{event.description}</Typography>
                <Typography color="textSecondary">{event.mode}</Typography>
              </DashboardCard>
            </Grid>
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard rootClass={classes.cardPadding}>
                <Grid className={classes.eventDetails}>
                  {eventRows(event, {
                    startDate: parseInt(from),
                    endDate: parseInt(to),
                  }).map((row, index) => {
                    return (
                      <DetailRow key={index} classes={classes} icon={row.icon}>
                        <Typography>{row.value}</Typography>
                      </DetailRow>
                    );
                  })}
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard rootClass={`${classes.posterRoot}`}>
                <img
                  src={
                    event.photoUrl ||
                    "https://i.pinimg.com/736x/59/59/88/5959880ca0cb6b30926091b7bc251812.jpg"
                  }
                  className={classes.eventPoster}
                />
              </DashboardCard>
            </Grid>
          </Grid>
          <Grid item container sm={4}>
            <Grid item sm={12}>
              <DashboardCard rootClass={`${classes.formContainer}`}>
                <Typography
                  className={globalClasses.bold}
                  variant="h5"
                  gutterBottom
                >
                  Register
                </Typography>
                <EventBookingForm
                  eventLink={event.link}
                  price={event.price}
                  type={event.type}
                  oneOnOneBooking={{ startDate: from }}
                />
              </DashboardCard>
            </Grid>

            <Grid item sm={12} className={`${classes.vendorCardContainer}`}>
              <DashboardCard rootClass={`${classes.vendorCard}`}>
                <EventBookingVendorCard vendorId={event.userUID} />
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
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
    width: "60%",
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
    width: "100%",
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
    marginTop: "1em",
  },
  vendorCardContainer: {
    width: "100%",
    paddingTop: "2em",
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
  infoRow: {
    padding: "0.2em",
    "& > div > p": {
      fontWeight: "bold",
      paddingLeft: "0.2em",
    },
  },
}));

export default EventBooking;
