import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import { styles } from "./styles";

function EventCard({ event }) {
  const classes = styles();
  const globalClasses = globalStyles();
  return (
    <DashboardCard rootClass={classes.root}>
      <Grid container alignItems={"stretch"}>
        <Grid item sm={4} className={classes.imageContainer}>
          <img className={classes.eventImage} src={event.image} />
        </Grid>

        <Grid className={classes.eventDetailContainer} item sm={8}>
          <Grid container>
            {/* First Row - Event name and Booking Dates */}
            <Grid item sm={10}>
              <Typography
                className={`${globalClasses.bold} ${classes.title}`}
              >
                {event.name}
              </Typography>
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
                <Typography align="center" variant="h6">
                  {event.month}
                </Typography>
                <Typography align="center">{event.dates}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Second Row : Event Type and General information */}
          <Grid container>
            <Grid item sm={4} className={classes.generalInfoContainer}>
              <Grid container justify="space-between">
                <Grid>
                  <Typography
                    variant="body2"
                    gutterBottom
                    className={classes.greyFont}
                  >
                    {event.type}
                  </Typography>
                  <Typography
                    // variant="body1"
                    className={globalClasses.bold500}
                    gutterBottom
                  >
                    {" "}
                    &#8377; {event.price}
                  </Typography>
                </Grid>

                {/* Date and month section */}
                <Grid
                  className={classes.mobile}
                  style={{
                    height: "100%",
                  }}
                >
                  <Grid className={classes.datesInnerContainer}>
                    <Typography align="center" variant="h5">
                      {event.month}
                    </Typography>
                    <Typography align="center">{event.dates}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Typography
                gutterBottom
                className={`${classes.greyFont} ${classes.seats}`}
              >
                Sold out seats: {event.seatsBooked}/{event.totalSeats}
              </Typography>
            </Grid>

            <Grid item container sm={4} alignItems="flex-end">
              <Typography
                className={`${classes.greyFont} ${classes.seats}`}
                gutterBottom
              >
                Total Revenue: &#8377;{event.totalRevenue}
              </Typography>
            </Grid>

            <Grid
              item
              sm={4}
              container
              alignItems="center"
              className={classes.editButtonContainer}
            >
              <ButtonCapsule
                buttonStyle={`${globalClasses.bold} ${classes.editButton}`}
                text="Edit Event"
              ></ButtonCapsule>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

export default EventCard;
