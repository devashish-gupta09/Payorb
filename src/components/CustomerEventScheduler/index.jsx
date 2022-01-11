import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";

import { useRouter } from "next/router";
import React from "react";

import { EVENT_TYPES } from "../../constants/events";
import useAlertSnackbar from "../../hooks/useAlertSnackbar";
import useFetchEvents from "../../hooks/useFetchEvents";
import CustomerEventCard from "../CustomerEventCard";
import DashboardCard from "../DashboardCard";
import PageTitle from "../PageTitle";
import SkeletonLoading from "../SkeletonLoading";

function generateOneOnOneEventSlots(event) {
  const result = {};
  const startDate = moment(new Date(event.startDate));
  const endDate = moment(new Date(event.endDate));
  const slotStartTime = moment(new Date(event.slotStartTimePerDay));
  const slotEndTime = moment(new Date(event.slotEndTimePerDay));

  startDate
    .set("hour", slotStartTime.get("hour"))
    .set("minute", slotStartTime.get("minute"))
    .set("second", slotStartTime.get("second"));

  endDate
    .set("hour", slotEndTime.get("hour"))
    .set("minute", slotEndTime.get("minute"))
    .set("second", slotEndTime.get("second"));

  for (
    var startTime = startDate;
    startTime <= endDate;
    startTime.add(event.slotDuration, "hour")
  ) {
    if (
      startTime.get("hour") >= slotStartTime.get("hour") &&
      startTime.get("hour") < slotEndTime.get("hour")
    ) {
      const endSlot = moment(startTime);
      endSlot.set("hour", event.slotDuration);

      if (!event.bookedSlots.includes(startTime.toISOString())) {
        if (result[startDate.format("YYYY-MM-DD")]) {
          result[startDate.format("YYYY-MM-DD")].push({
            title: event.name,
            startDate: startTime.toDate(),
            link: event.link,
            type: event.type,
          });
        } else {
          result[startDate.format("YYYY-MM-DD")] = [
            {
              title: event.name,
              startDate: startTime.toDate(),
              link: event.link,
              type: event.type,
            },
          ];
        }
      }
    }
  }

  return result;
}

function CustomerEventScheduler({ eventLink, vendorId }) {
  const { events, loading, error } = useFetchEvents(false, {
    link: eventLink,
    vendorId,
  });
  const [week, setWeek] = React.useState();
  const { Alert, showAlert } = useAlertSnackbar();
  const [timeChosen, setTimeChosen] = React.useState({
    selected: false,
  });
  const router = useRouter();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleTimeClick = (time) => {
    setTimeChosen({
      selected: true,
      time,
    });
  };

  if (loading) {
    return <SkeletonLoading message="Loading One On One event" />;
  }

  if (error) {
    return <h1>Error fetching event. Please contact support</h1>;
  }

  const handleChange = (data) => {
    setWeek(moment(new Date(data)));
  };

  const handleBookButton = (startTime, slotDuration) => {
    const momentStartTime = moment(startTime);
    if (!momentStartTime.toDate()) {
      showAlert("Please select a suitable time slot");
      return;
    }

    const endTime = moment(momentStartTime);
    endTime.add(slotDuration, "hours");
    router.push(
      `/event/${vendorId}/${eventLink}?from=${momentStartTime
        .toDate()
        .getTime()}&to=${endTime.toDate().getTime()}`
    );
  };

  if (events && Object.keys(events).length > 0) {
    const event = events[0];
    const startDate = week || moment(new Date(event.startDate));
    const calenderViewEvents = generateOneOnOneEventSlots(event);

    if (event.type === EVENT_TYPES.ONE_ON_ONE) {
      return (
        <Grid>
          <PageTitle title="Payorb | Event Booking" />
          {Alert()}
          <Grid style={{ padding: "1em 0" }}>
            <CustomerEventCard
              event={event}
              expand={true}
              onBook={() => {
                handleBookButton(timeChosen.time, event.slotDuration);
              }}
            ></CustomerEventCard>
          </Grid>
          <DashboardCard>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Typography
                  style={{
                    paddingLeft: "1em",
                    paddingTop: "1em",
                    fontSize: "1.2em",
                    fontWeight: "500",
                  }}
                >
                  Select Date and Time
                </Typography>
              </Grid>
              <Divider />
              <Grid item sm={5} style={{ width: "100%" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Calendar
                    date={startDate.toDate()}
                    onChange={handleChange}
                    minDate={new Date(event.startDate)}
                    maxDate={new Date(event.endDate)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid
                container
                item
                sm={7}
                spacing={2}
                style={{ height: "fit-content", padding: "0 2em" }}
              >
                <Grid item xs={12}>
                  <Typography
                    style={{
                      paddingTop: "1em",
                      fontSize: "1.2em",
                      fontWeight: "500",
                    }}
                    fullWidth
                  >
                    {`${moment(new Date(week || startDate)).format("LL")}`}
                  </Typography>
                </Grid>
                {calenderViewEvents[startDate.format("YYYY-MM-DD")] &&
                  calenderViewEvents[startDate.format("YYYY-MM-DD")].map(
                    (slot, index) => {
                      return (
                        <Grid item key={index} xs={matches ? 4 : 3}>
                          <Button
                            fullWidth
                            className={`${classes.timeButton} ${
                              timeChosen.time &&
                              timeChosen.time.toISOString() ===
                                slot.startDate.toISOString()
                                ? classes.activeTimeButton
                                : classes.inActiveTimeButton
                            }`}
                            variant={"outlined"}
                            onClick={() => handleTimeClick(slot.startDate)}
                          >
                            {moment(slot.startDate).format("LT")}
                          </Button>
                        </Grid>
                      );
                    }
                  )}
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      );
    }

    return <h1>Not one on one event</h1>;
  }

  return <h1>Something went wrong. Please contact support</h1>;
}

const useStyles = makeStyles((theme) => ({
  button: {
    height: "fit-content",
  },
  timeButton: {
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
  },
  inActiveTimeButton: {
    color: "grey",
    border: "1.5px grey solid",
  },
  activeTimeButton: {
    fontWeight: "600",
    color: "#71c3de",
    border: "1.5px solid",
    borderColor: "#71c3de",
  },
}));

export default CustomerEventScheduler;
