import { Button, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

import { globalStyles } from "../../../styles/globalStyles";
import { DEFAULT_EVENT_IMAGE } from "../../constants/images";
import { formatEventType, isEventPastDate } from "../../utils/events";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import { EventCardDate } from "../EventCard";
import EventImageContainer from "../EventImageContainer/Index";
import ReadMore from "../ReadMore";
import { styles } from "./styles";

function CustomerEventCard({ event, expand, onBook }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();

  const redirectToBook = () => {
    router.push(`/event/${event.link}/register`);
  };

  return (
    <DashboardCard rootClass={classes.root}>
      <Grid container alignItems={"stretch"}>
        <Grid item sm={3} className={classes.imageContainer}>
          <EventImageContainer url={event.photoUrl || DEFAULT_EVENT_IMAGE} />
        </Grid>

        <Grid
          className={classes.eventDetailContainer}
          item
          // sm={expand ? 9 : 10}
          sm={9}
        >
          <Grid container>
            {/* First Row - Event name and Booking Dates */}
            <Grid item sm={10} style={{ width: "100%" }}>
              <Typography className={`${globalClasses.bold} ${classes.title}`}>
                {event.name}
              </Typography>
              <Grid style={{ width: "95%" }}>
                <ReadMore percent={10} text={event.description} />
              </Grid>
            </Grid>

            {/* Date and month section */}
            <Grid
              item
              sm={2}
              container
              className={classes.desktop}
              justify="flex-end"
              style={{
                height: "100%",
              }}
            >
              <Grid className={classes.datesInnerContainer}>
                <EventCardDate
                  classes={classes}
                  startDate={event.startDate}
                  endDate={event.endDate}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Second Row : Event Type and General information */}

          <Grid container>
            <Grid item sm={8} className={classes.generalInfoContainer}>
              <Grid container justify="space-between">
                {/* {expand && ( */}
                <Grid>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.greyFont}
                  >
                    {formatEventType(event.type)}
                  </Typography>
                  <Typography className={globalClasses.bold500} gutterBottom>
                    {" "}
                    &#8377; {event.price}
                  </Typography>
                </Grid>
                {/* )} */}

                {/* Date and month section */}
                <Grid
                  className={classes.mobile}
                  style={{
                    height: "100%",
                  }}
                >
                  <Grid className={classes.datesInnerContainer}>
                    <EventCardDate
                      classes={classes}
                      startDate={event.startDate}
                      endDate={event.endDate}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* {expand && ( */}
            <Grid
              item
              sm={4}
              container
              alignItems="flex-end"
              className={classes.editButtonContainer}
            >
              {isEventPastDate(event) ? (
                <Button disabled>Bookings Closed</Button>
              ) : (
                <ButtonCapsule
                  buttonStyle={`${globalClasses.boldSixHundred} ${classes.editButton}`}
                  onClick={onBook || redirectToBook}
                  text="Book now"
                ></ButtonCapsule>
              )}
            </Grid>
            {/* )} */}
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

export default CustomerEventCard;
