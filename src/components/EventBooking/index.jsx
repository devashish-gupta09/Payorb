import { Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import {
  Event,
  CalendarToday,
  LocationOn,
  Money,
  Schedule,
  ViewModule,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import moment from "moment";
import { useRouter } from "next/router";

import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { EVENT_MODES, EVENT_TYPES } from "../../constants/events";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import useFetchEvents from "../../hooks/useFetchEvents";
import { getMonthDate } from "../../utils/dateTime";
import { getCategoryString } from "../../utils/events";
import DashboardCard from "../DashboardCard";
import EventBookingForm from "../EventBookingForm";
import EventBookingVendorCard from "../EventBookingVendorCard";
import { EventCoverUpload } from "../EventCoverUpload";
import EventImageContainer from "../EventImageContainer/Index";
import PageTitle from "../PageTitle";
import ReadMore from "../ReadMore";
import SkeletonLoading from "../SkeletonLoading";
import { VendorEventBannerHeader } from "../VendorEventBannerHeader";
import { VendorPublicEvents } from "../VendorPublicEvents";

export const getEventslotDuration = (startDate, endDate) => {
  if (startDate || endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    return {
      date: `${getMonthDate(startDate, endDate)}, ${startDate.getFullYear()}`,
      time: `${moment(startDate).format("LT")} - ${moment(endDate).format(
        "LT"
      )}`,
    };
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

function EventBooking({ eventLink, vendorId }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { to, from } = router.query;

  const { loading, events } = useFetchEvents(false, {
    link: eventLink,
    vendorId,
  });

  if (loading) {
    return <SkeletonLoading message={"Loading Event Booking Page"} />;
  }

  if (events && events.length > 0) {
    const event = events[0];

    return (
      <Grid className={classes.foundation}>
        <PageTitle title="Payorb | Event Booking" />
        <Grid>
          {event?.coverImgUrl ? (
            <VendorEventBannerHeader
              height={isMobile ? "17.5em" : undefined}
              eventData={event}
              isVendor={false}
              from={from}
              to={to}
            />
          ) : null}
        </Grid>
        <Grid container className={classes.root} alignItems={"flex-start"}>
          <Grid
            item
            container
            sm={8}
            spacing={3}
            style={{
              width: "100%",
              margin: 0,
              padding: isMobile ? "0 0 1.5em 0em" : "0 5%",
            }}
          >
            <Grid style={{ width: "100%" }}>
              <Grid item sm={12} className={classes.fullWidth}>
                <DashboardCard rootClass={`${classes.posterRoot}`}>
                  {event?.coverBannerImages?.length ? (
                    <EventCoverUpload
                      eventData={event}
                      allowUploads={false}
                      croppedImgs={event.coverBannerImages}
                      height={isMobile ? "15em" : "25em"}
                    />
                  ) : (
                    <EventImageContainer
                      url={event.photoUrl || DEFAULT_EVENT_IMAGE}
                    />
                  )}
                </DashboardCard>
                <Grid
                  container
                  justifyContent="flex-end"
                  style={{
                    padding: "1em",
                    background: "white",
                    borderRadius: "5px",
                  }}
                >
                  <Typography>
                    Ticket Price <b>&#8377; {event.price}</b>
                  </Typography>
                </Grid>
              </Grid>

              {/* name section */}
              <Grid
                item
                sm={12}
                className={`${classes.fullWidth} ${classes.eventDetailSection}`}
                style={{ background: "white" }}
              >
                <DashboardCard rootClass={classes.cardPadding}>
                  <Typography
                    style={{
                      width: "100%",
                      paddingBottom: "0.5em",
                      fontWeight: "500",
                      fontSize: isMobile ? "2em" : "2.25em",
                    }}
                  >
                    {event.name}
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid
                      item
                      style={{
                        width: "fit-content",
                        marginRight: "1em",
                        marginBottom: isMobile ? "0.5em" : 0,
                      }}
                      container
                      alignItems="center"
                    >
                      <Event style={{ marginRight: "0.25em" }} />
                      <b>
                        {event.type === EVENT_TYPES.ONE_TIME
                          ? getEventslotDuration(event.startDate, event.endDate)
                              .date
                          : getEventslotDuration(parseInt(from), parseInt(to))
                              .date}
                      </b>
                    </Grid>
                    <Grid
                      item
                      style={{ width: "fit-content" }}
                      container
                      alignItems="center"
                    >
                      <Schedule style={{ marginRight: "0.25em" }} />
                      <b>
                        {event.type === EVENT_TYPES.ONE_TIME
                          ? getEventslotDuration(event.startDate, event.endDate)
                              .time
                          : getEventslotDuration(parseInt(from), parseInt(to))
                              .time}
                      </b>
                    </Grid>
                  </Grid>
                  <Grid
                    style={{
                      width: "100%",
                      paddingTop: "1em",
                      paddingBottom: "1em",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <ReadMore percent={100} text={event.description} />
                  </Grid>
                </DashboardCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container sm={4}>
            <Grid
              item
              sm={12}
              style={{ background: "white", borderRadius: "5px" }}
            >
              <DashboardCard rootClass={`${classes.formContainer}`}>
                <Typography
                  className={globalClasses.bold}
                  variant="h5"
                  gutterBottom
                >
                  Register Now !
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

            <Grid item sm={12} className={`${classes.vendorCardContainer}`}>
              <DashboardCard rootClass={`${classes.vendorCard}`}>
                <EventBookingVendorCard vendorId={event.userUID} />
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.eventContainer} spacing={3}>
          <Grid item sm={12}>
            Events list
          </Grid>
          <Grid item sm={12}>
            <VendorPublicEvents
              vendorId={event.userUID}
              exceptEventLink={event.link}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <h1>Something went wrong.</h1>;
}

const styles = makeStyles((theme) => ({
  eventContainer: {
    padding: "1em 10%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em",
    },
  },
  foundation: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0",
    },
  },
  root: {
    padding: "2em 10%",
    background:
      "linear-gradient(right, rgba(188, 244, 241, 1),rgba(0, 212, 255, 1) )",
    [theme.breakpoints.down("sm")]: {
      padding: "0em 0.5em 0.5em 0.5em",
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
  },
  vendorCardContainer: {
    width: "100%",
    paddingTop: "2em",
  },
  vendorCard: {
    padding: "1em",
    background: "white",
    borderRadius: "5px",
  },
  cardPadding: {
    padding: "1em",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      padding: "1em 1em 1em 1em",
    },
  },
  infoRow: {
    padding: "0.2em",
    "& > div > p": {
      fontWeight: "bold",
      paddingLeft: "0.2em",
    },
  },
  eventDetailSection: {
    marginTop: "5%",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
    },
  },
}));

export default EventBooking;
