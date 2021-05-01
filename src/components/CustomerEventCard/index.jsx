import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { globalStyles } from "../../../styles/globalStyles";
import { PAGE_PATHS } from "../../constants/paths";
import { formatEventType } from "../../utils/events";
import ButtonCapsule from "../ButtonCapsule";
import DashboardCard from "../DashboardCard";
import { EventCardDate } from "../EventCard";
import { styles } from "./styles";

function CustomerEventCard({ event }) {
  const classes = styles();
  const globalClasses = globalStyles();
  const router = useRouter();

  const handleEdit = () => {
    router.push({
      pathname: PAGE_PATHS.CUSTOMER_EVENTS_REGISTER,
      query: {
        event: event.link,
      },
    });
  };

  return (
    <DashboardCard rootClass={classes.root}>
      <Grid container alignItems={"stretch"}>
        <Grid item sm={3} className={classes.imageContainer}>
          <img
            className={classes.eventImage}
            src={
              event.image ||
              "https://i.pinimg.com/736x/59/59/88/5959880ca0cb6b30926091b7bc251812.jpg"
            }
          />
        </Grid>

        <Grid className={classes.eventDetailContainer} item sm={9}>
          <Grid container>
            {/* First Row - Event name and Booking Dates */}
            <Grid item sm={10}>
              <Typography className={`${globalClasses.bold} ${classes.title}`}>
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

            <Grid
              item
              sm={4}
              container
              alignItems="flex-end"
              className={classes.editButtonContainer}
            >
              <ButtonCapsule
                buttonStyle={`${globalClasses.boldSixHundred} ${classes.editButton}`}
                onClick={handleEdit}
                text="Book now"
              ></ButtonCapsule>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}

export default CustomerEventCard;
