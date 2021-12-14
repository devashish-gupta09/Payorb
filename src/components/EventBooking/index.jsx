import { Grid, makeStyles, Typography } from "@material-ui/core";
import {
  CalendarToday,
  LocationOn,
  Money,
  ViewModule,
} from "@material-ui/icons";
import moment from "moment";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { EVENT_MODES, EVENT_TYPES } from "../../constants/events";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import { getCategoryString } from "../../utils/events";
import { DangerouslySetInnterHtml } from "../ButtonCapsule";
import Capsule from "../Capsule";
import DashboardCard from "../DashboardCard";
import DetailRow from "../DetailRow";
import EventBookingForm from "../EventBookingForm";
import EventBookingVendorCard from "../EventBookingVendorCard";
import EventImageContainer from "../EventImageContainer/Index";
import PageTitle from "../PageTitle";
import ReadMore from "../ReadMore";
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
    value: event.earlyBird
      ? parseInt(Date.parse(new Date(event.earlyBirdDeadline))) > Date.now()
        ? `<s>Rs. ${event.price}</s> Rs. ${event.earlyBirdPrice} <span style="color:grey;">(Early bird discount)<span>`
        : `Rs. ${event.price}`
      : event.trialClass
      ? "Trial Class"
      : `Rs. ${event.price}`,
  },
  // {
  //   ...(event.type === EVENT_TYPES.ONE_TIME && {
  //     icon: <ConfirmationNumber />,
  //     key: "bookedSeats",
  //     value: `${event.orders.length} ${
  //       event.type === EVENT_TYPES.ONE_TIME ? `/${event.totalTickets}` : ""
  //     }`,
  //   }),
  // },
  {
    icon: <ViewModule />,
    key: "category",
    value: getCategoryString(event.category),
  },
  {
    icon: <CalendarToday />,
    key: "type",
    value:
      event.type === EVENT_TYPES.ONE_TIME
        ? getEventslotDuration(event.startDate, event.endDate)
        : getEventslotDuration(oneOnOneSlot.startDate, oneOnOneSlot.endDate),
  },

  event.mode === EVENT_MODES.OFFLINE && {
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
        <PageTitle title="Payorb | Event Booking" />
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
                <Typography
                  variant={"h3"}
                  style={{ width: "95%", paddingBottom: "0.25em" }}
                >
                  {event.name}
                </Typography>
                <Grid
                  style={{
                    width: "95%",
                    paddingBottom: "1em",
                    whiteSpace: "pre-line",
                  }}
                >
                  <ReadMore percent={10} text={event.description} />
                </Grid>
                <Capsule>{`Mode : ${event.mode}`}</Capsule>
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
                        <Typography>
                          <DangerouslySetInnterHtml
                            text={row.value}
                          ></DangerouslySetInnterHtml>
                        </Typography>
                      </DetailRow>
                    );
                  })}
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item sm={12} className={classes.fullWidth}>
              <DashboardCard rootClass={`${classes.posterRoot}`}>
                <EventImageContainer
                  url={event.photoUrl || DEFAULT_EVENT_IMAGE}
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
                  trialClass={event.trialClass}
                  eventLink={event.link}
                  earlyBird={event.earlyBird}
                  earlyBirdPrice={event.earlyBirdPrice}
                  earlyBirdDeadline={event.earlyBirdDeadline}
                  price={event.price}
                  type={event.type}
                  oneOnOneBooking={{ startDate: from }}
                  endDate={event.endDate}
                  orders={event.orders}
                  totalTickets={event.totalTickets}
                />
              </DashboardCard>
            </Grid>

            {/* <Grid sm={12}>
              <ins
                className="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-9608205273509118"
                data-ad-slot="9714251680"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </Grid> */}

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
    borderRadius: "6px",
  },
  posterRoot: {
    display: "flex",
    alignItems: "center",
    padding: "0",
    borderRadius: "6px",
  },
  fullWidth: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0.5em 0 !important",
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
